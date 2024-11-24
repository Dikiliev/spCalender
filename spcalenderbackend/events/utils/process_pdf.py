import json
from PyPDF2 import PdfReader
from concurrent.futures import ProcessPoolExecutor, as_completed
from typing import Dict, List, Optional
import camelot
import re
from .lib import SportEvent, convert_event_to_dict
from .logger import logging
import os

camelot.logger.setLevel(logging.ERROR)

GENDER_KEYWORDS = [
    "женщины",
    "юниорки",
    "девушки",
    "девочки",
    "мужчины",
    "юниоры",
    "юноши",
    "мальчики",
]


def parse_gender_and_age(description: str) -> List[Dict[str, Optional[List[Optional[int]]]]]:
    gender_map = {
        "женщины": False,
        "юниорки": False,
        "девушки": False,
        "девочки": False,
        "мужчины": True,
        "юниоры": True,
        "юноши": True,
        "мальчики": True,
    }

    normalized_desc = description.lower()
    genders = {
        gender
        for term, gender in gender_map.items()
        if re.search(rf"\b{term}\b", normalized_desc)
    }

    if not genders:
        return []

    age_patterns = [
        r"от\s+(?P<start>\d+)\s+лет(?:\s+и\s+старше)?",
        r"до\s+(?P<end>\d+)\s+лет",
        r"(?P<range_start>\d+)\s*-\s*(?P<range_end>\d+)\s+лет",
        r"(?P<exact>\d+)\s+лет(?:\s+и\s+старше)?",
    ]

    combined_regex = "|".join(age_patterns)
    age_regex = re.compile(combined_regex, re.IGNORECASE)

    extracted_ages = []
    for match in age_regex.finditer(description):
        if match.group("range_start") and match.group("range_end"):
            extracted_ages.append([int(match.group("range_start")), int(match.group("range_end"))])
        elif match.group("start"):
            extracted_ages.append([int(match.group("start")), None])
        elif match.group("end"):
            extracted_ages.append([None, int(match.group("end"))])
        elif match.group("exact"):
            age = int(match.group("exact"))
            extracted_ages.append([age, age])

    unique_ages = {tuple(age) for age in extracted_ages}

    if not unique_ages:
        unique_ages = {(None, None)}

    return [{"gender": gender, "age": list(age)} for gender in genders for age in unique_ages]


def refine_event_data(event: SportEvent):
    event.name = event.name.strip()
    event.details = event.details.strip()
    event.location = event.location.strip()

    start_idx = -1
    for idx, char in enumerate(event.details):
        if char.islower():
            start_idx = idx
            break

    if start_idx != -1:
        event.name += event.details[:start_idx].strip()
        event.name = event.name.strip()
        event.details = event.details[start_idx:].strip()
        logging.debug(f"Извлечено название события: {event.name}")
    else:
        logging.debug("Название события не найдено, описание остается без изменений.")

    event.gender_age_info = parse_gender_and_age(event.details)


def process_pages(file_path, page_range: str) -> List[SportEvent]:
    logging.debug(f"Начата обработка диапазона страниц: {page_range}")
    tables = camelot.read_pdf(
        file_path,
        flavor="stream",
        pages=page_range,
        row_tol=5,
        edge_tol=100,
        columns=["107,340,467,725"],
    )
    logging.debug(f"Извлечено таблиц: {len(tables)} из диапазона {page_range}")

    extracted_events = []
    category, subcategory = "", ""
    page_counter = {}

    for table in tables:
        current_page = table.page
        if current_page not in page_counter:
            page_counter[current_page] = 0

        logging.debug(f"Обработка таблицы на странице {current_page}")

        new_event = None  # Инициализация переменной перед циклом

        for row in table.data:
            logging.debug(f"Данные строки: {row}")
            if len(row) < 5:
                row.extend([""] * (5 - len(row)))
            col1, col2, col3, col4, col5 = row[:5]

            if col1.isdigit():
                page_counter[current_page] += 1
                new_event = SportEvent(
                    id=col1,
                    sport_type=category,
                    sport_subtype=subcategory,
                    page=current_page,
                    order=page_counter[current_page],
                    details="",
                    location="",
                )
                extracted_events.append(new_event)
                logging.debug(f"Создано новое событие: {new_event.id} на странице {new_event.page}")
            elif col1.isupper():
                category = col1
                logging.debug(f"Определен новый тип спорта: {category}")
            elif col1:
                subcategory = col1
                logging.debug(f"Определен новый подтип спорта: {subcategory}")

            # Обработка оставшихся колонок только если new_event создан
            if new_event:
                if col2:
                    if col2.isupper() and not new_event.name:
                        new_event.name += col2 + " "
                    else:
                        new_event.details += col2 + " "

                if col3:
                    if not new_event.dates.start:
                        new_event.dates.start = col3
                    elif not new_event.dates.end:
                        new_event.dates.end = col3

                if col4:
                    new_event.location += col4 + " "

                if col5 and not new_event.participants:
                    try:
                        new_event.participants = int(col5)
                    except ValueError:
                        new_event.participants = 0
                        logging.warning(f"Ошибка данных участников '{col5}' на стр. {current_page}")

    for event in extracted_events:
        refine_event_data(event)

    logging.debug(f"Обработка диапазона {page_range} завершена. Найдено событий: {len(extracted_events)}")
    return extracted_events


def distribute_pages(total_pages: int, num_workers: int) -> List[str]:
    pages_per_worker = total_pages // num_workers
    ranges = []
    for i in range(num_workers):
        start = i * pages_per_worker + 1
        end = total_pages if i == num_workers - 1 else (i + 1) * pages_per_worker
        ranges.append(f"{start}-{end}")
    return ranges


def extract_data_from_pdf(file_path: str, max_pages=-1) -> dict:
    print(f'[extract_data_from_pdf] {file_path}')
    try:
        reader = PdfReader(file_path)
        total_pages = len(reader.pages) if max_pages == -1 else max_pages
        logging.info("Чтение PDF завершено.")

        workers = os.cpu_count()
        page_ranges = distribute_pages(total_pages, workers)
        logging.info(f"Начало обработки PDF. Задействовано потоков: {workers}")

        all_events = []
        with ProcessPoolExecutor(max_workers=workers) as executor:
            tasks = [executor.submit(process_pages, file_path, pr) for pr in page_ranges]
            for task in as_completed(tasks):
                try:
                    all_events.extend(task.result())
                except Exception as e:
                    logging.error(f"Ошибка при обработке диапазона страниц: {e}")

        all_events.sort(key=lambda e: (e.page, e.order))

        prev_category, prev_subcategory = "", ""
        for event in all_events:
            if not event.sport_type:
                event.sport_type = prev_category
            else:
                prev_category = event.sport_type

            if not event.sport_subtype:
                event.sport_subtype = prev_subcategory
            else:
                prev_subcategory = event.sport_subtype

        events_dict = [convert_event_to_dict(event) for event in all_events]
        return events_dict

        with open("processed_results.json", "w", encoding="utf-8") as json_file:
            json.dump(events_dict, json_file, ensure_ascii=False, indent=4)

        logging.info(f"Обработка завершена. Найдено событий: {len(all_events)}")
    except Exception as e:
        logging.error(f"Общая ошибка в процессе обработки PDF: {e}")
