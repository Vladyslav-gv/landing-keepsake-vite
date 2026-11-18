# Keepsake: landing (Vite + Pug + SCSS)

Адаптивний лендінг дизайн-агенції Keepsake. Це той самий макет, що й у `landing-keepsake` (лабораторна №7), зібраний професійним робочим процесом: Pug, модульний SCSS, PostCSS, адаптивні зображення, контроль якості коду.

https://vladyslav-gv.github.io/landing-keepsake-vite/

## Вимоги до середовища

- Node.js 20.19+ або 22.12+ (потрібно для Vite 8)
- npm

## Команди

| Команда           | Що робить                                     |
| ----------------- | --------------------------------------------- |
| `npm install`     | встановлює залежності                         |
| `npm run dev`     | dev-сервер з HMR                              |
| `npm run build`   | збірка в `dist/`                              |
| `npm run preview` | локальний перегляд збірки                     |
| `npm run format`  | форматує код Prettier                         |
| `npm run lint`    | Stylelint для SCSS і перевірка Prettier       |
| `npm run images`  | генерує AVIF/WebP/JPEG у двох ширинах (sharp) |

## Структура проєкту

```
src/
├── assets/
│   ├── fonts/       # WOFF2
│   ├── images/      # згенеровані AVIF, WebP, JPEG
│   └── source/      # вихідні зображення для npm run images
├── components/      # header.pug, footer.pug, sections/*.pug
├── data/            # дані секцій (масиви об'єктів)
├── includes/        # meta, preload шрифтів, SVG-спрайт
├── layouts/main.pug # базовий макет
├── mixins/          # btn, icon, logo, picture, work-card, post-card, socials
├── pages/index.pug
└── styles/
    ├── abstracts/   # функції, брейкпоінти, токени, міксини
    ├── base/        # :root, шрифти, reset, типографіка
    ├── layout/      # container, section, header, hero, footer
    ├── components/  # один БЕМ-блок: один файл
    └── main.scss    # єдина точка входу
```

## Архітектура

### Pug

- `layouts/main.pug` задає каркас із блоками `meta`, `title`, `styles`, `content`, `scripts`. Сторінка `pages/index.pug` успадковує його через `extends` і перевизначає блоки; `append`/`prepend` додають вміст без заміни.
- Шапка, футер і кожна секція підключаються через `include`.
- Повторювані блоки (навігація, категорії, роботи, послуги, статистика, журнал, соцмережі) описані в `src/data/` масивами об'єктів і виводяться через `each` один раз на тип картки.
- Міксини: `+btn`, `+icon`, `+picture`, `+work-card`, `+post-card`, `+logo`, `+socials`. Міксини мають `block` (іконка в кнопці) та `&attributes` (довільні атрибути).

### SCSS

- Лише `@use` і `@forward`, без `@import`. Кожна папка має `index.scss`.
- Дизайн-токени з lab-07 оголошені як SCSS-map-и в `abstracts/` і через `@each` генеруються в CSS custom properties в `:root`; компоненти використовують лише `var(--…)`.
- Міксин `mq()` бере значення з map-а брейкпоінтів і використовує лише `min-width` (mobile first). Функція `rem()` рахує через `math.div`.
- БЕМ через `&__` і `&--`, вкладеність до 3 рівнів, без `id` та `!important`.

### Без JavaScript

Фільтр портфоліо (`:checked ~`), мобільне меню (нативний `popover`), форма підписки (`:user-invalid`, `:has()`, `:target`) і всі стани працюють на CSS та HTML.

## Інструменти

| Інструмент             | Навіщо                                                 |
| ---------------------- | ------------------------------------------------------ |
| Vite                   | dev-сервер і збірка, хешування файлів, мініфікація CSS |
| Vituum + Pug plugin    | генерація HTML з Pug                                   |
| Sass (Dart Sass)       | препроцесор SCSS                                       |
| PostCSS + Autoprefixer | вендорні префікси за списком Browserslist              |
| sharp                  | генерація AVIF, WebP, JPEG у кількох ширинах           |
| Prettier + plugin-pug  | єдине форматування SCSS, Pug, JSON, Markdown           |
| Stylelint              | перевірка SCSS: БЕМ, вкладеність, `!important`         |
| husky + lint-staged    | pre-commit перевірка змінених файлів                   |
| commitlint             | перевірка повідомлень комітів за Conventional Commits  |
| GitHub Actions         | lint, збірка та публікація на GitHub Pages             |

## Цільові браузери (Browserslist)

```
last 2 Chrome versions
last 2 Firefox versions
last 2 Edge versions
last 2 Safari versions
last 2 ios_saf versions
```

## Оптимізація

### CSS

| Етап                                                | Розмір      |
| --------------------------------------------------- | ----------- |
| Після Sass (без префіксів і мініфікації)            | 25 830 байт |
| У `dist` (Autoprefixer + мініфікація Lightning CSS) | 21 201 байт |
| У `dist` із gzip                                    | 4,29 кБ     |

### Зображення

| Формат                  | Файл для приклада `work-1` | Розмір  |
| ----------------------- | -------------------------- | ------- |
| JPEG (запасний, 720 px) | `work-1-720.jpg`           | 8,51 кБ |
| WebP (360 px)           | `work-1-360.webp`          | 2,35 кБ |
| AVIF (360 px)           | `work-1-360.avif`          | 1,94 кБ |
