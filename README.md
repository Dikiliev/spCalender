
# **SportTime Event Platform**

## **Описание**
**SportTime** — это платформа для управления и поиска спортивных мероприятий. Она предоставляет пользователям возможность находить события, фильтровать их по параметрам, подписываться на уведомления и получать информацию о событиях в удобной форме.

---

## **Функционал**

### **Основные возможности**
- **Мероприятия**: 
  - Просмотр календаря спортивных событий.
  - Поиск мероприятий с использованием фильтров: дата, местоположение, вид спорта и другие.
  - Управление мероприятиями для организаторов.

- **Уведомления**:
  - Автоматические напоминания о событиях (за день, за неделю и в день мероприятия).
  - Поддержка кастомных уведомлений.
  - Управление уведомлениями: просмотр, редактирование, удаление.

- **Профиль пользователя**:
  - Авторизация и регистрация.
  - Управление личной информацией.
  - Просмотр истории посещённых мероприятий и уведомлений.

- **Поддержка**: Возможность связи с технической поддержкой.

---

## **Технологический стек**

### **Frontend**
- **Технологии**: 
  - [Vite](https://vitejs.dev/)
  - [React](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Material-UI (MUI)](https://mui.com/)

- **Ключевые особенности**:
  - Адаптивный дизайн с использованием MUI.
  - Состояние приложения управляется с помощью MobX.
  - Взаимодействие с бэкендом через REST API.

---

### **Backend**
- **Технологии**: 
  - [Django](https://www.djangoproject.com/)
  - [Django REST Framework (DRF)](https://www.django-rest-framework.org/)
  - [PostgreSQL](https://www.postgresql.org/)

- **Функционал**:
  - REST API для обработки запросов от фронтенда.
  - Модели данных: пользователи, мероприятия, подписки, уведомления.
  - Планировщик уведомлений с использованием циклических проверок (`while`-loop).

---

## **Установка**

### **Требования**
- **Python** >= 3.10
- **Node.js** >= 16.x
- **PostgreSQL** >= 13.x

### **Запуск Backend**
1. Установите зависимости:
   ```bash
   pip install -r requirements.txt
   ```
2. Настройте базу данных в `config/settings.py`:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': '<DB_NAME>',
           'USER': '<DB_USER>',
           'PASSWORD': '<DB_PASSWORD>',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   ```
3. Примените миграции:
   ```bash
   python manage.py migrate
   ```
4. Запустите сервер:
   ```bash
   python manage.py runserver
   ```

---

### **Запуск Frontend**
1. Установите зависимости:
   ```bash
   npm install
   ```
2. Настройте API URL в `src/utils/constans.ts`:
   ```ts
   export const API_URL = 'http://localhost:8000/api';
   ```
3. Запустите сервер разработки:
   ```bash
   npm run dev
   ```

---

## **API**

### **События (Events)**
- `GET /api/events/` — Список мероприятий с поддержкой фильтров.
- `POST /api/events/` — Создание мероприятия.
- `GET /api/events/:id/` — Детали мероприятия.

### **Уведомления (Notifications)**
- `GET /api/notifications/` — Получение всех уведомлений.
- `POST /api/notifications/` — Создание уведомления.
- `DELETE /api/notifications/:id/` — Удаление уведомления.

---

## **Планировщик уведомлений**
- Уведомления отправляются с помощью кастомного скрипта:
  ```bash
  python manage.py run_notification_scheduler
  ```
- Отправка email реализована через SMTP. Настройка:
  ```python
  EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
  EMAIL_HOST = 'smtp.example.com'
  EMAIL_PORT = 587
  EMAIL_USE_TLS = True
  EMAIL_HOST_USER = 'your-email@example.com'
  EMAIL_HOST_PASSWORD = 'your-password'
  ```

---

## **Контрибьютинг**
1. Сделайте форк репозитория.
2. Создайте ветку для изменений:
   ```bash
   git checkout -b feature-name
   ```
3. Запушьте изменения:
   ```bash
   git push origin feature-name
   ```
4. Создайте Pull Request.

---

## **Авторы**
- **Ваше имя**: Разработка архитектуры и логики приложения.
- **Ваша команда**: Участники проекта.

--- 

## **Лицензия**
Проект распространяется под лицензией [MIT](LICENSE).
