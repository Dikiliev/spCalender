from events.models import Event, SportType
import random
from datetime import datetime, timedelta

def run():
    # Создаем или получаем типы спорта
    sport_types = {
        "Дзюдо": SportType.objects.get_or_create(name="Дзюдо")[0],
        "Пауэрлифтинг": SportType.objects.get_or_create(name="Пауэрлифтинг")[0],
        "Самбо": SportType.objects.get_or_create(name="Самбо")[0],
        "Бокс": SportType.objects.get_or_create(name="Бокс")[0],
        "Тяжелая атлетика": SportType.objects.get_or_create(name="Тяжелая атлетика")[0],
    }

    # Пример данных для городов, регионов и стран
    locations = [
        {"country": "Россия", "region": "Московская область", "city": "Москва"},
        {"country": "Россия", "region": "Санкт-Петербург", "city": "Санкт-Петербург"},
        {"country": "Россия", "region": "Республика Башкортостан", "city": "Уфа"},
        {"country": "Россия", "region": "Краснодарский край", "city": "Краснодар"},
        {"country": "Россия", "region": "Республика Татарстан", "city": "Казань"},
    ]

    # Типы мероприятий
    event_types = ["Чемпионат", "Кубок", "Межрегиональные", "Окружные"]

    # Пол участников
    gender_choices = ["male", "female", "mixed"]

    # Возрастные группы
    age_groups = ["до 18 лет", "от 18 до 25 лет", "от 25 до 35 лет", "старше 35 лет"]

    # Программа мероприятий
    programs = [
        "КЛАСС F-1D, дисциплина F-1D",
        "ВЕСОВАЯ КАТЕГОРИЯ 98+ КГ, 88 КГ, 79 КГ",
        "КАТЕГОРИЯ ДО 60 КГ, 73 КГ, 100 КГ",
        "СОРЕВНОВАНИЯ ПО ЖИМУ, ТОЛЧКУ, РЫВКУ",
        "ТЕХНИЧЕСКАЯ ПРОГРАММА, ПОЕДИНКИ",
    ]

    # Дата начала мероприятий (случайный диапазон)
    start_date_base = datetime(2024, 2, 1)

    events = []
    for i in range(20):
        location = random.choice(locations)
        sport_type = random.choice(list(sport_types.values()))
        event_type = random.choice(event_types)
        gender = random.choice(gender_choices)
        age_group = random.choice(age_groups)
        program = random.choice(programs)
        start_date = start_date_base + timedelta(days=random.randint(0, 60))
        end_date = start_date + timedelta(days=random.randint(1, 5))
        participants = random.randint(20, 150)

        events.append(
            Event(
                title=f"Мероприятие {i + 1}: {event_type} по {sport_type.name}",
                sport_type=sport_type,
                country=location["country"],
                region=location["region"],
                city=location["city"],
                location=f"{location['city']}, спортивный центр {i + 1}",
                start_date=start_date,
                end_date=end_date,
                participants=participants,
                gender=gender,
                age_group=age_group,
                event_type=event_type,
                description=f"{event_type} по {sport_type.name} для участников {age_group}.",
                program=program,
                is_cancelled=random.choice([False, False, False, True]),  # 25% шанс отмены
            )
        )

    # Сохранение мероприятий в базе данных
    Event.objects.bulk_create(events)
    print("20 тестовых мероприятий успешно добавлены.")
