# Translater subtitles

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

Приложение для автоматического перевода субтитров формата `.srt` и `.vtt` с английского на русский язык с использованием нейросетей.

_Поддерживаемые модели:_

| Название AI | Название модели      |
| ----------- | -------------------- |
| Mistral     | Mistral Small Latest |


## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Configuration](#Configuration)
- [Usage](#Usage)
- [API](#api)
- [License](#license)

## Install
### Backend
```sh  
cd backend/
npm install
```  
### Frontend
  ```sh
cd frontend/
npm install
  ```
## Configuration
В папке `backend/` создайте файл `.env` и добавьте следующие данные :

```env
NODE_ENV=development  
# Ваш порт сервера
PORT=3000  
#URI для подключения к вашей базе данных MongoDB
MONGODB_URI=mongodb+srv://USER_NAME:PASSWORDf@cluster0.fehgica.mongodb.net/NAME_FOLDER?retryWrites=true&w=majority&appName=Cluster0  
#Ваш API ключ от нейросети MISTRAL
MISTRAL_API_KEY=_API_KEY_ 
#Количество одновременных переводов(регулируйте значение взависимости от мощностей модели)
PER_LIMIT=1
```
## Usage
Для запуска проекта в режиме разработки выполните команды в разных терминалах:
### **Запуск интерфейса (Frontend):**
```sh
cd frontend/
npm run dev  
```  
### **Запуск сервера (Backend):**
```sh
cd backend/
npm run dev  
```  
## API
| **Методы** | **URL**         | Описание                                                       |
|------------| --------------- |----------------------------------------------------------------|
| *GET*      | `/v1/ai/models-ai` | Предоставляет список доступных моделей                         |
| *GET*      | `/v1/ai/info-model` | Отображает последнюю выбранную модель, как модель по умолчанию |
| *POST*     | `/v1/ai/select-model` | Выбор модели для перевода                                      |
| *GET*      | `/v1/files/original` | Получение загруженного списка файлов                           |
| *POST*     | `/v1/files/upload` | Загрузка файлов                                                |
| *DELETE*   | `/v1/files/original/delete` | Удаление всех загруженных  файлов                              |
| *DELETE*   | `/v1/files/translated/delete` | Удаление всех переведенных файлов                              |
| *GET*      | `/v1/files/translated` | Получение переведенных файлов                                  |
| *POST*     | `/v1/files/translate` | Перевод всех файлов                                            |
| *POST*     | `/v1/files/:id/translate` | Перевод конкретного файла                                      |
| *DELETE*   | `/v1/files/:id/delete` | Удаление конкретного файла                                     |
| *GET*      | `/v1/files/:id/settings-ai` | Получение общий настроек поведения при переводе файлов         |
| *POST*     | `/v1/files/:id/apply-settings` | Применение настроек                                            |


## License

MIT © 2026 Doktorlich