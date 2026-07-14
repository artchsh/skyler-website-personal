# Work portfolio drafts

Research and screenshots captured on 14 July 2026. Role and implementation details were consolidated from `chatgpt.answer.txt`; where a project appeared more than once, the latest entry is authoritative. The corrected entries are Zhas Alash, NoFake, and National Business.

## Attribution note

Use this note on the portfolio index and every work case study:

> UI/UX design was created by a designer colleague. This case study documents my engineering and implementation work and should not be read as an example of my visual design authorship.

Russian version:

> UI/UX-дизайн был создан моим коллегой-дизайнером. Этот кейс рассказывает о моей инженерной работе и реализации, а не представляет визуальный дизайн как мою авторскую работу.

## Manual Economy

Source: [manualeconomy.kz](https://manualeconomy.kz/)

### Summary

**EN:** An independent financial and business publication focused on Kazakhstan's economy, banks, markets, major companies, and the people shaping them.

**RU:** Независимое деловое медиа об экономике Казахстана, банках, рынках, крупных компаниях и людях, которые на них влияют.

### Description

**EN:** Manual Economy is a high-frequency editorial platform for financial news, analysis, and opinion. Its homepage balances a lead story with compact news streams, while category archives and long-form article pages make a large publishing catalogue easy to navigate.

**RU:** «Ручная экономика» — редакционная платформа для финансовых новостей, аналитики и мнений. Главная страница сочетает ведущий материал с компактными новостными потоками, а архивы рубрик и страницы статей помогают ориентироваться в большом объёме публикаций.

### Publicly visible product features

- Editorial homepage with a lead story and section-based news streams
- Markets, analytics, opinion, and culture/lifestyle categories
- Category archives, article pages, search, author/date metadata, and social channels
- Responsive image-led layouts for a continuously updated newsroom

### Captures

- `public/portfolio/work/manualeconomy/home-1920x1080.jpg`
- `public/portfolio/work/manualeconomy/category-markets-1920x1080.jpg`
- `public/portfolio/work/manualeconomy/article-1920x1080.jpg`

Role: **Frontend / CMS Developer at Media Boost Group**
Tech stack: **MODX Revolution 3, PHP, Fenom, pdoTools, MIGX, HTML, SCSS, JavaScript/TypeScript, Vite, Handlebars**
Personally implemented: **CMS-driven responsive pages, dynamic editorial content, reusable frontend patterns, multilingual handling where required, SEO, maintenance, and post-launch fixes.**

## Modernization / МЭКС

Source: [modernization.kz](https://modernization.kz/ru/)

### Summary

**EN:** A multilingual public information and monitoring platform for Kazakhstan's national energy and utilities modernization programme.

**RU:** Многоязычная информационная и мониторинговая платформа национального проекта по модернизации энергетики и ЖКХ Казахстана.

### Description

**EN:** The platform turns a large public infrastructure programme into an explorable digital product. It combines national progress metrics, a filterable project directory, an interactive implementation map, results, news, documents, procurement links, FAQs, and contact routes across Russian, Kazakh, and English versions.

**RU:** Платформа превращает масштабный инфраструктурный проект в понятный цифровой продукт. Она объединяет национальные показатели прогресса, фильтруемый каталог проектов, интерактивную карту реализации, результаты, новости, документы, закупки, FAQ и контакты на русском, казахском и английском языках.

### Publicly visible product features

- Russian, Kazakh, and English content
- Live programme metrics and progress indicators
- Project catalogue with sector and region filters
- Interactive implementation map and project statuses
- News, results, documents, procurement, FAQ, and contact sections

### Captures

- `public/portfolio/work/modernization/home-1920x1080.jpg`
- `public/portfolio/work/modernization/projects-1920x1080.jpg`
- `public/portfolio/work/modernization/article-1920x1080.jpg`

Role: **Frontend / CMS Developer at Media Boost Group**
Tech stack: **MODX Revolution 3, PHP, Fenom, pdoTools, MIGX, MODX TVs, Babel, HTML, SCSS, JavaScript, MapLibre GL JS, Vite**
Personally implemented: **project catalogue, search and filters, project records, status/progress/financial data, stages/results/documents, RU/KZ/EN contexts, interactive map, statistics, news and document sections, translated UI, and production SEO/indexing fixes.**

## Zhas Alash

Source: [zhasalash.kz](https://zhasalash.kz/)

### Summary

**EN:** The Kazakh-language digital edition of a national socio-political newspaper, combining breaking news, analysis, regional coverage, culture, and an issue archive.

**RU:** Казахоязычная цифровая версия республиканской общественно-политической газеты с новостями, аналитикой, региональными материалами, культурой и архивом выпусков.

### Description

**EN:** Zhas Alash is a high-volume newsroom designed around fast access to current reporting and a broad editorial archive. The homepage pairs a visual lead story with a continuously updated news rail, while category and article pages support analysis, regional reporting, culture, sport, law, sharing, and newspaper subscriptions.

**RU:** «Жас Алаш» — новостная платформа с быстрым доступом к актуальным материалам и большим редакционным архивом. Главная страница объединяет визуальный ведущий материал с постоянно обновляемой лентой, а рубрики и страницы статей поддерживают аналитику, региональные новости, культуру, спорт, право, публикацию в соцсетях и подписку на газету.

### Publicly visible product features

- Lead-story homepage with a latest-news rail
- News, sport, live, culture, regions, archive, law, and analysis sections
- Category pagination and article pages with sharing and image credits
- Email subscription for the PDF newspaper and newsroom contact flows

### Captures

- `public/portfolio/work/zhasalash/home-1920x1080.jpg`
- `public/portfolio/work/zhasalash/category-analysis-1920x1080.jpg`
- `public/portfolio/work/zhasalash/article-1920x1080.jpg`

Role: **Frontend / Full-stack Developer**
Tech stack: **custom Python CMS/backend, Flask before migration, FastAPI after migration, HTML, SCSS, JavaScript, custom editorial infrastructure**
Personally implemented: **migrated the custom backend from Flask to FastAPI, integrated the redesigned frontend with the existing publishing system, and kept the legacy production environment operational.**

## NoFake

Source: [nofake.kz](https://nofake.kz/)

### Summary

**EN:** A Kazakhstan-focused multimedia fact-checking publication built around verified information, media literacy, critical thinking, and digital safety.

**RU:** Казахстанский мультимедийный фактчекинговый проект о проверенной информации, медиаграмотности, критическом мышлении и цифровой безопасности.

### Description

**EN:** NoFake organizes current reporting around explicit verification states such as fake, official, true, manipulation, and in progress. Alongside fact checks, it publishes analysis, investigations, video and graphics, international coverage, and practical digital-safety guidance, with a direct route for readers to submit suspicious claims.

**RU:** NoFake организует материалы вокруг понятных статусов проверки: «фейк», «официально», «правда», «манипуляция» и «в процессе». Помимо фактчеков проект публикует аналитику, расследования, видео и графику, международные материалы и практические советы по цифровой безопасности, а читатели могут напрямую сообщить о подозрительной информации.

### Publicly visible product features

- Verification-status taxonomy and filters
- Current fact checks, analytics, investigations, video, graphics, and practical guides
- Russian and Kazakh editions
- Reader submission route for reporting a possible fake
- Article, category, and editorial homepage templates

### Captures

- `public/portfolio/work/nofake/home-1920x1080.jpg`
- `public/portfolio/work/nofake/category-analytics-1920x1080.jpg`
- `public/portfolio/work/nofake/article-1920x1080.jpg`

Role: **Frontend / WordPress Developer**
Tech stack: **WordPress, PHP, custom WordPress theme, HTML, SCSS/CSS, JavaScript, WordPress APIs and integrations**
Personally implemented: **built the custom WordPress theme and continue to handle support, maintenance, bug fixes, and live-site troubleshooting.**

## National Business

Source: [nationalbusiness.kz](https://nationalbusiness.kz/)

### Summary

**EN:** A broad Kazakhstan business publication covering the economy, companies, markets, technology, government, geopolitics, research, people, and culture.

**RU:** Деловое медиа Казахстана об экономике, компаниях, рынках, технологиях, власти, геополитике, исследованиях, людях и культуре.

### Description

**EN:** National Business presents a large editorial taxonomy through a newspaper-inspired digital interface. A live market ticker, lead stories, editor selections, opinion, interviews, topical sections, category archives, and article pages support both rapid news consumption and deeper business analysis.

**RU:** National Business представляет широкую редакционную структуру через цифровой интерфейс, вдохновлённый газетной подачей. Рыночный тикер, главные материалы, выбор редактора, мнения, интервью, тематические разделы, архивы рубрик и страницы статей поддерживают как быстрое чтение новостей, так и глубокую деловую аналитику.

### Publicly visible product features

- Market ticker and a deep category/subcategory system
- Lead stories, editor's choice, opinion, interviews, and topical collections
- Economy, business, markets, technology, government, geopolitics, research, people, and culture coverage
- Category archives, article templates, search, and cookie preferences

### Captures

- `public/portfolio/work/nationalbusiness/home-1920x1080.jpg`
- `public/portfolio/work/nationalbusiness/category-economy-1920x1080.jpg`
- `public/portfolio/work/nationalbusiness/article-1920x1080.jpg`

Role: **Frontend / Full-stack Developer**
Tech stack: **Python, custom CMS/backend, HTML, SCSS, JavaScript, custom editorial infrastructure**
Personally implemented: **delivered the new site and integrated it with the custom Python publishing backend under significant time pressure. The exact Python framework is intentionally not claimed because the latest source entry does not confirm it.**

## Source resolution notes

- Manual Economy and Modernization appear once in the source file.
- The later corrected entries override the earlier entries for Zhas Alash, NoFake, and National Business.
- Approximate years were retained from the earlier entries where the corrections omitted them.
- Unconfirmed infrastructure and National Business's exact Python framework are not presented as facts in the public portfolio.
