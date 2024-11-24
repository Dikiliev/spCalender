from events.models import Event, SportType, CompetitionType
from datetime import datetime

def save_event_to_db(event_data):
    """
    Сохраняет мероприятие в базу данных на основе полученных данных.
    """
    try:
        # Парсим дату начала и окончания
        start_date = datetime.strptime(event_data["dates"]["from"], "%d.%m.%Y")
        end_date = datetime.strptime(event_data["dates"]["to"], "%d.%m.%Y")

        # Получаем или создаем SportType
        competition, _ = CompetitionType.objects.get_or_create(name=event_data["sport_type"])
        sport_type, _ = SportType.objects.get_or_create(name=event_data["name"].split()[0])

        # Извлечение данных о локации
        location_parts = event_data["location"].split(",")
        country = location_parts[0].strip() if len(location_parts) > 0 else ""
        region = location_parts[1].strip() if len(location_parts) > 1 else ""
        city = location_parts[2].strip() if len(location_parts) > 2 else ""

        # Определяем гендер мероприятия
        gender = "mixed"  # По умолчанию смешанный
        if event_data.get("gender_age_info"):
            genders = {info["gender"] for info in event_data["gender_age_info"]}
            if len(genders) == 1:
                gender = "male" if True in genders else "female"

        age_group = ''
        age = event_data["gender_age_info"][0]['age']

        if age[0]:
            age_group += f'от {age[0]} '
        if age[1]:
            age_group += f'до {age[1]}'

        if not age_group:
            age_group = 'Не указано'

        # Формируем данные для сохранения
        event, created = Event.objects.update_or_create(
            id=event_data["id"],
            title=event_data["name"],
            sport_type=sport_type,
            competition=competition,
            start_date=start_date,
            end_date=end_date,
            defaults={
                "country": country,
                "region": region,
                "city": city,
                "location": event_data["location"],
                "participants": event_data["participants"],
                "gender": gender,
                "age_group": age_group,
                "event_type": event_data["sport_subtype"],
                "description": event_data["details"],
                "program": event_data.get("details"),
                "is_cancelled": False,
            },
        )

        if created:
            print(f"Добавлено новое мероприятие: {event.title}")
        else:
            print(f"Обновлено мероприятие: {event.title}")

    except Exception as e:
        print(f"Ошибка при сохранении мероприятия: {e}")
