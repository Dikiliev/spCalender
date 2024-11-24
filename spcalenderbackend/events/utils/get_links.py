import json
import requests
from faker import Faker
from urllib3.exceptions import InsecureRequestWarning
import os
import re


def downloadFiles():
    # Инициализация Faker
    fake = Faker()

    # Заголовки
    user_agent = fake.user_agent()
    headers = {
        "User-Agent": user_agent,
        "Connection": "keep-alive"
    }

    # Подавляем предупреждения SSL (если verify=False используется)
    requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

    # URL API
    url = "https://minsport.gov.ru/_next/data/fmYiJ0xJeUloqKVwRrvJm/ru/activity/government-regulation/edinyj-kalendarnyj-plan.json?slug=activity&slug=government-regulation&slug=edinyj-kalendarnyj-plan"

    # Выполнение GET-запроса
    response = requests.get(url, headers=headers, verify=False)

    # Проверяем успешность запроса
    if response.status_code == 200:
        documents = response.text
        js = json.loads(documents)

        # Извлекаем нужные документы
        plans = js["pageProps"]["sections"][2]["documents"]

        # Создаем папку для сохранения файлов
        output_dir = "plans"
        os.makedirs(output_dir, exist_ok=True)

        result = []
        for plan in plans:
            if ("Единый календарный план межрегиональных, всероссийских и международных физкультурных мероприятий и "
                "спортивных мероприятий") in plan['attributes']['title']:
                try:
                    file_url = plan['attributes']['file']['data']['attributes']['url']
                    pattern = r"\((.*?)\)"
                    matches = re.findall(pattern, plan['attributes']['title'])[0]

                    output_path = os.path.join(output_dir, matches + '.pdf')

                    if (os.path.isfile(output_path)):
                        print(f"Файл {output_path} уже скачан")
                        continue

                    result.append(output_path)

                    file_response = requests.get(file_url, headers=headers, stream=True, verify=False)
                    if file_response.status_code == 200:
                        with open(output_path, "wb") as file:
                            for chunk in file_response.iter_content(chunk_size=8192):
                                file.write(chunk)
                        print(f"Файл успешно скачан: {output_path}")
                    else:
                        print(f"Не удалось скачать файл: {file_url}. Статус код: {file_response.status_code}")

                except Exception as e:
                    print(f"Произошла ошибка: {e}")

        print(result)
        return result
    else:
        print(f"Не удалось получить документы. Статус код: {response.status_code}")
