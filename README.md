# Дворжики в интернете

Семейный архив Дворжиков — современный статический сайт на чистом HTML, CSS и JavaScript.
Перенесён с Google Sites и подготовлен для публикации на GitHub Pages.

## О сайте

- **Адрес:** https://dvorzhik.github.io/family/
- **Репозиторий:** `family`
- **Технологии:** чистый HTML5 + CSS3 + vanilla JS (без сборки и зависимостей)
- **Палитра:** тёплая «архивная» (светлая тема)

## Структура проекта

```
family/
├── index.html                      # Главная страница
├── istorii.html                    # Каталог историй
├── zhurnaly.html                   # Каталог журналов
├── video.html                      # Видео (ссылки на YouTube)
├── foto.html                       # Фото (ссылка на Google Photos)
├── kontakty.html                   # Контакты
├── robots.txt                      # Правила для поисковых роботов
├── sitemap.xml                     # Карта сайта
├── stories/                        # 11 страниц историй
│   ├── foto-raznyh-let.html
│   ├── eto-bylo-davno.html
│   ├── o-moem-brate.html
│   ├── drug-moy-kolka.html
│   ├── tetya-vera.html
│   ├── artur-bass.html
│   ├── dina-bass.html
│   ├── starshie-v-rodu-bass.html
│   ├── o-babushke-nade.html
│   ├── o-mame.html
│   └── vospominaniya-o-shkole.html
├── journals/                       # Страницы журналов
│   ├── novyj-dvorzhik.html
│   └── klassicheskij-dvorzhik.html
└── assets/
    ├── css/style.css               # Все стили
    ├── js/main.js                  # Вся логика (меню, лайтбокс, анимации)
    ├── img/                        # Изображения и фотографии
    └── pdf/                        # PDF-выпуски журналов
        ├── new/                    # Новый «ДВОРЖИК» (6 номеров)
        └── old/                    # Классический «ДВОРЖИК»
```

## Локальный просмотр

Сайт статический, поэтому достаточно открыть `index.html` в браузере.
Для корректной работы относительных путей удобнее запустить локальный сервер:

```bash
# Python 3
python -m http.server 8000

# затем открыть http://localhost:8000/
```

## Публикация на GitHub Pages

1. Создайте новый репозиторий `family` на GitHub (аккаунт `dvorzhik`).
2. Инициализируйте git в папке проекта и свяжите с репозиторием:

```bash
git init
git add .
git commit -m "Перенос семейного архива с Google Sites"
git branch -M main
git remote add origin https://github.com/dvorzhik/family.git
git push -u origin main
```

3. В настройках репозитория: **Settings → Pages**.
4. В разделе **Build and deployment** выберите:
   - **Source:** Deploy from a branch
   - **Branch:** `main`, папка `/ (root)`
5. Сохраните. Через 1–2 минуты сайт будет доступен по адресу
   https://dvorzhik.github.io/family/

## Добавление новой истории

1. Скопируйте любую страницу из `stories/` как шаблон.
2. Измените `<title>`, `<meta name="description">`, заголовок `<h1>` и текст.
3. Добавьте карточку истории в `istorii.html`.
4. Добавьте адрес страницы в `sitemap.xml`.

## Ссылка с dvorzhik.ru

На сайте `dvorzhik.ru` (репозиторий `dvorzhik.github.io`) добавьте в меню пункт
**«Семейный архив»**, ведущий на https://dvorzhik.github.io/family/.

## Внешние сервисы

- **Фото:** альбом Google Photos — https://goo.gl/photos/MsrPVvvEw9smEofb6
- **Видео:** канал YouTube — https://www.youtube.com/@dvorzhik
- **Telegram:** https://t.me/dvorzhiki
- **E-mail:** alex@dvorzhik.ru
