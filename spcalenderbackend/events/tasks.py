import logging
import time

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger
from django_apscheduler.jobstores import DjangoJobStore, register_events
from django_apscheduler.models import DjangoJobExecution
from .utils.get_links import downloadFiles
from .utils.process_pdf import extract_data_from_pdf
from .utils.save_event_to_db import save_event_to_db

logger = logging.getLogger(__name__)

def fetch_and_process_data():
    """
    Основная логика для получения ссылок и обработки PDF.
    """
    try:
        print("Запуск задачи fetch_and_process_data...")
        paths = downloadFiles()
        print(f'paths: {paths}')
        if paths:
            last_path = paths[0]
            print('last_link:', last_path)
            data = extract_data_from_pdf(last_path, -1)

            if data:
                for event_data in data:
                    save_event_to_db(event_data)
            else:
                print("Нет данных для обработки.")
        else:
            print("Ссылки не найдены.")
    except Exception as e:
        print(f"Ошибка при выполнении fetch_and_process_data: {e}")
    time.sleep(6 * 60 * 60)

def delete_old_jobs(max_age=604_800):
    """
    Удаляет старые записи выполнения задач из базы данных (по умолчанию старше 7 дней).
    """
    DjangoJobExecution.objects.delete_old_job_executions(max_age)

def start_scheduler():
    """
    Запуск планировщика с задачами.
    """
    scheduler = BackgroundScheduler()
    scheduler.add_jobstore(DjangoJobStore(), "default")

    # Задача запускается каждые 6 часов
    scheduler.add_job(
        fetch_and_process_data,
        trigger=IntervalTrigger(hours=6),
        id="fetch_and_process_data",
        max_instances=1,
        replace_existing=True,
    )
    print("Задача fetch_and_process_data добавлена в планировщик.")

    # Задача очистки старых записей
    scheduler.add_job(
        delete_old_jobs,
        trigger=IntervalTrigger(days=1),
        id="delete_old_jobs",
        max_instances=1,
        replace_existing=True,
    )
    print("Задача очистки старых записей добавлена в планировщик.")

    # Регистрация событий планировщика
    register_events(scheduler)

    scheduler.start()
    print("Планировщик запущен.")
