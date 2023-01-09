# ProjectsAdminPanel
Тестовое задание для `TBN-SOFT`.

### How to start
- Установите зависимости:
```shell
npm install
```
- Запустите сервер и приложение:
```shell
npm run dev
```
Данные, для которых сервер сгенерит "ручки" хранятся в файле `./db.json`.
- Перейти по ссылке http://localhost:4200/

### Typescript config
Добавлен флаг `strictPropertyInitialization: false`

## Packages
- [`npm-run-all`](https://github.com/mysticatea/npm-run-all/blob/HEAD/docs/npm-run-all.md) - пакет для запуска скриптов в параллель
- [`prettier`](https://prettier.io) - для форматирования исходного кода
- [`json-server`](https://www.npmjs.com/package/json-server) - сервер для `CRUD` данных в `json` формате