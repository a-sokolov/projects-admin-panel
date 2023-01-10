# Projects Admin Panel
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
- Перейти по ссылке http://localhost:4200/

Данные, для которых сервер сгенерит "ручки", хранятся в файле `./db.json`.
> Внимание! Файл находится в индексе `git` исключительно для демонстрации, все изменения из интерфейса приложения будут его модифицировать. 

### Design system
В качестве библиотеки компонентов используется [`Taiga-UI`](https://taiga-ui.dev/).

## Packages
- [`npm-run-all`](https://github.com/mysticatea/npm-run-all/blob/HEAD/docs/npm-run-all.md) - запуск скриптов в параллель;
- [`prettier`](https://prettier.io) - для форматирования исходного кода;
- [`json-server`](https://www.npmjs.com/package/json-server) - сервер для `CRUD` данных в `json` формате.