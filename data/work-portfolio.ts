import type { WebsiteProject } from "./portfolio";

const liveLink = (href: string) => ({
  live: {
    label: { en: "Visit website", ru: "Открыть сайт" },
    href,
  },
});

export const workPortfolioProjects: WebsiteProject[] = [
  {
    slug: "modernization-meks",
    kind: "website",
    year: "2026",
    title: { en: "Modernization / MEKS", ru: "Модернизация / МЭКС" },
    summary: {
      en: "A multilingual public platform for exploring Kazakhstan's utility-modernization projects, progress, funding, documents, and news.",
      ru: "Многоязычная публичная платформа о проектах модернизации коммунальной инфраструктуры Казахстана, их ходе, финансировании, документах и новостях.",
    },
    description: {
      en: "I built the frontend and CMS implementation for a data-heavy public information platform. The work covered a filterable project catalogue, detailed project records, an interactive map, three language contexts, editorial sections, and the SEO and indexing fixes needed to make the system production-ready.",
      ru: "Я разработал frontend и CMS-часть насыщенной данными публичной платформы. Работа включала каталог проектов с фильтрами, подробные карточки, интерактивную карту, три языковых контекста, редакционные разделы и SEO-исправления, необходимые для запуска в production.",
    },
    role: {
      en: "Frontend / CMS Developer at Media Boost Group",
      ru: "Frontend / CMS-разработчик в Media Boost Group",
    },
    techStack: [
      "MODX Revolution 3",
      "PHP",
      "Fenom",
      "pdoTools",
      "MIGX",
      "MODX TVs",
      "Babel",
      "HTML",
      "SCSS",
      "JavaScript",
      "MapLibre GL JS",
      "Vite",
    ],
    images: [
      {
        src: "/portfolio/work/modernization/home-1920x1080.jpg",
        alt: { en: "Modernization platform homepage", ru: "Главная страница платформы «Модернизация»" },
      },
      {
        src: "/portfolio/work/modernization/projects-1920x1080.jpg",
        alt: { en: "Modernization projects catalogue", ru: "Каталог проектов платформы «Модернизация»" },
      },
      {
        src: "/portfolio/work/modernization/article-1920x1080.jpg",
        alt: { en: "Modernization news article", ru: "Новостная статья платформы «Модернизация»" },
      },
    ],
    links: liveLink("https://modernization.kz/"),
    features: [
      {
        en: "A searchable project catalogue with region and category filters, pagination, status, risk, progress, budget, dates, stages, results, and supporting documents.",
        ru: "Каталог проектов с поиском, фильтрами по регионам и категориям, пагинацией, статусами, рисками, прогрессом, бюджетами, сроками, этапами, результатами и документами.",
      },
      {
        en: "An interactive MapLibre map with custom markers and considered mobile navigation between the map and project details.",
        ru: "Интерактивная карта MapLibre с собственными маркерами и продуманной мобильной навигацией между картой и проектами.",
      },
      {
        en: "Russian, Kazakh, and English contexts across project data, navigation, news, documents, search, dates, countdowns, and service pages.",
        ru: "Русский, казахский и английский контексты для данных проектов, навигации, новостей, документов, поиска, дат, обратных отсчётов и служебных страниц.",
      },
      {
        en: "Homepage statistics, news categories and tabs, document feeds, media/contact pages, metadata, canonical URLs, sitemap, redirects, and indexing controls.",
        ru: "Статистика на главной, категории и вкладки новостей, ленты документов, страницы для СМИ и контактов, метаданные, canonical URL, sitemap, редиректы и управление индексацией.",
      },
    ],
    wins: [
      {
        en: "Translated a complex public dataset into an editor-manageable MODX model using TVs and MIGX.",
        ru: "Перевёл сложный публичный набор данных в управляемую редакторами модель MODX на TVs и MIGX.",
      },
      {
        en: "Kept filtering, mapping, editorial content, and three language versions coherent inside one CMS-driven product.",
        ru: "Связал фильтрацию, карту, редакционный контент и три языковые версии в одном CMS-продукте.",
      },
      {
        en: "Resolved practical production SEO and indexing issues instead of treating them as an afterthought.",
        ru: "Решил практические production-проблемы SEO и индексации, не оставляя их на потом.",
      },
    ],
    improvements: [
      {
        en: "Introduce a clearer typed data layer between MODX fields, PHP helpers, and frontend components.",
        ru: "Добавить более чёткий типизированный слой данных между полями MODX, PHP-хелперами и frontend-компонентами.",
      },
      {
        en: "Consolidate repeated helpers and translation handling, then add automated tests around search and filter combinations.",
        ru: "Объединить повторяющиеся хелперы и обработку переводов, затем добавить автоматические тесты для поиска и комбинаций фильтров.",
      },
      {
        en: "Formalize the CMS-to-frontend contract so future API or developer integrations can evolve with less coupling.",
        ru: "Формализовать контракт между CMS и frontend, чтобы будущие API- и developer-интеграции развивались с меньшей связанностью.",
      },
    ],
  },
  {
    slug: "nofake",
    kind: "website",
    year: "2025–2026",
    title: { en: "NoFake", ru: "NoFake" },
    summary: {
      en: "A bilingual fact-checking and media-literacy publication covering misinformation, investigations, digital safety, and verification.",
      ru: "Двуязычное издание о фактчекинге и медиаграмотности: дезинформация, расследования, цифровая безопасность и проверка фактов.",
    },
    description: {
      en: "I created the custom WordPress theme and have continued supporting the live publication through maintenance, bug fixes, and production troubleshooting. The project is less a one-off build than a long-running editorial system shaped by real browser, content, WordPress, and third-party integration issues.",
      ru: "Я создал кастомную тему WordPress и продолжаю поддерживать работающую редакционную платформу: обслуживание, исправление ошибок и решение production-проблем. Это не разовая сборка, а долгоживущая система, сформированная реальными особенностями браузеров, контента, WordPress и сторонних интеграций.",
    },
    role: { en: "Frontend / WordPress Developer", ru: "Frontend / WordPress-разработчик" },
    techStack: ["WordPress", "PHP", "Custom WordPress theme", "HTML", "SCSS", "CSS", "JavaScript", "WordPress APIs"],
    images: [
      {
        src: "/portfolio/work/nofake/home-1920x1080.jpg",
        alt: { en: "NoFake homepage", ru: "Главная страница NoFake" },
      },
      {
        src: "/portfolio/work/nofake/category-analytics-1920x1080.jpg",
        alt: { en: "NoFake analytics category", ru: "Раздел аналитики NoFake" },
      },
      {
        src: "/portfolio/work/nofake/article-1920x1080.jpg",
        alt: { en: "NoFake fact-check article", ru: "Фактчекинговая статья NoFake" },
      },
    ],
    links: liveLink("https://nofake.kz/"),
    features: [
      {
        en: "A custom editorial theme for fact checks, investigations, analysis, media literacy, and digital-safety material.",
        ru: "Кастомная редакционная тема для фактчеков, расследований, аналитики, медиаграмотности и материалов о цифровой безопасности.",
      },
      {
        en: "Russian and Kazakh publishing with article classifications and verification-oriented presentation.",
        ru: "Публикация на русском и казахском языках с классификацией материалов и подачей, ориентированной на проверку фактов.",
      },
      {
        en: "Third-party media and social integrations maintained within a production WordPress environment.",
        ru: "Сторонние медиа- и социальные интеграции, поддерживаемые в production-среде WordPress.",
      },
    ],
    wins: [
      {
        en: "Built a custom theme that has remained useful through ongoing editorial and production change.",
        ru: "Создал кастомную тему, которая остаётся полезной при постоянных редакционных и production-изменениях.",
      },
      {
        en: "Supported the system beyond launch, resolving the unglamorous browser, plugin, content, and integration failures real sites accumulate.",
        ru: "Поддерживал систему после запуска, решая неизбежные проблемы браузеров, плагинов, контента и интеграций.",
      },
    ],
    improvements: [
      {
        en: "Refactor accumulated theme complexity and establish clearer boundaries for custom functionality.",
        ru: "Рефакторить накопившуюся сложность темы и чётче разделить кастомную функциональность.",
      },
      {
        en: "Add stronger fallbacks for unreliable external embeds and integrations.",
        ru: "Добавить более надёжные fallback-сценарии для нестабильных внешних embeds и интеграций.",
      },
      {
        en: "Improve maintainability incrementally without forcing an unnecessary full rebuild.",
        ru: "Постепенно улучшать поддерживаемость без неоправданной полной пересборки сайта.",
      },
    ],
  },
  {
    slug: "zhas-alash",
    kind: "website",
    year: "2025–2026",
    title: { en: "Zhas Alash", ru: "Жас Алаш" },
    summary: {
      en: "A Kazakh-language socio-political digital newspaper with breaking news, analysis, opinion, archives, and subscriptions.",
      ru: "Казахоязычная общественно-политическая интернет-газета с оперативными новостями, аналитикой, мнениями, архивом и подпиской.",
    },
    description: {
      en: "I migrated the publication's custom Python backend from Flask to FastAPI so it could support a redesigned frontend, then integrated that frontend with the existing publishing system while keeping the old production environment operational.",
      ru: "Я перенёс кастомный Python-backend из Flask на FastAPI, чтобы он поддержал новый frontend, а затем интегрировал обновлённый интерфейс с существующей системой публикации, сохранив работоспособность старого production-окружения.",
    },
    role: { en: "Frontend / Full-stack Developer", ru: "Frontend / Full-stack разработчик" },
    techStack: ["Python", "Flask", "FastAPI", "Custom CMS", "HTML", "SCSS", "JavaScript", "Custom editorial infrastructure"],
    images: [
      {
        src: "/portfolio/work/zhasalash/home-1920x1080.jpg",
        alt: { en: "Zhas Alash homepage", ru: "Главная страница «Жас Алаш»" },
      },
      {
        src: "/portfolio/work/zhasalash/category-analysis-1920x1080.jpg",
        alt: { en: "Zhas Alash analysis category", ru: "Раздел аналитики «Жас Алаш»" },
      },
      {
        src: "/portfolio/work/zhasalash/article-1920x1080.jpg",
        alt: { en: "Zhas Alash article page", ru: "Страница статьи «Жас Алаш»" },
      },
    ],
    links: liveLink("https://zhasalash.kz/"),
    features: [
      {
        en: "A redesigned editorial frontend connected to an established custom publishing backend.",
        ru: "Обновлённый редакционный frontend, подключённый к существующему кастомному publishing-backend.",
      },
      {
        en: "News, analysis, opinion, category, article, archive, and subscription experiences for a high-volume publication.",
        ru: "Новости, аналитика, мнения, категории, статьи, архив и подписка для издания с большим потоком материалов.",
      },
      {
        en: "A backend migration from Flask to FastAPI performed around a live legacy system.",
        ru: "Миграция backend с Flask на FastAPI вокруг работающей legacy-системы.",
      },
    ],
    wins: [
      {
        en: "Modernized the backend pragmatically to unlock the new frontend without replacing the entire publishing system.",
        ru: "Практично модернизировал backend, чтобы запустить новый frontend без полной замены publishing-системы.",
      },
      {
        en: "Kept an old production environment operational while changing the application boundary underneath it.",
        ru: "Сохранил работоспособность старого production-окружения во время изменения архитектурной границы приложения.",
      },
    ],
    improvements: [
      {
        en: "Clean obsolete server files and repair or replace outdated dependencies left by the legacy environment.",
        ru: "Очистить сервер от устаревших файлов и исправить либо заменить старые зависимости legacy-окружения.",
      },
      {
        en: "Document deployment and standardize the surrounding FastAPI application architecture.",
        ru: "Документировать деплой и стандартизировать архитектуру приложения вокруг FastAPI.",
      },
      {
        en: "Continue isolating the modern implementation from fragile legacy code.",
        ru: "Продолжить изолировать современную реализацию от хрупкого legacy-кода.",
      },
    ],
  },
  {
    slug: "manual-economy",
    kind: "website",
    year: "2025–2026",
    title: { en: "Manual Economy", ru: "Manual Economy" },
    summary: {
      en: "An independent Kazakhstan business publication covering markets, banking, companies, economic policy, analysis, and opinion.",
      ru: "Независимое казахстанское деловое издание о рынках, банках, компаниях, экономической политике, аналитике и мнениях.",
    },
    description: {
      en: "I handled frontend development and CMS-driven page implementation, translating design and editorial requirements into responsive production pages. The work included dynamic MODX content, reusable frontend patterns, multilingual handling where needed, SEO, maintenance, and post-launch fixes.",
      ru: "Я занимался frontend-разработкой и реализацией страниц на CMS, переводя дизайн и редакционные требования в адаптивные production-страницы. Работа включала динамический контент MODX, переиспользуемые frontend-паттерны, многоязычность там, где она требовалась, SEO, поддержку и исправления после запуска.",
    },
    role: {
      en: "Frontend / CMS Developer at Media Boost Group",
      ru: "Frontend / CMS-разработчик в Media Boost Group",
    },
    techStack: ["MODX Revolution 3", "PHP", "Fenom", "pdoTools", "MIGX", "HTML", "SCSS", "JavaScript", "TypeScript", "Vite", "Handlebars"],
    images: [
      {
        src: "/portfolio/work/manualeconomy/home-1920x1080.jpg",
        alt: { en: "Manual Economy homepage", ru: "Главная страница Manual Economy" },
      },
      {
        src: "/portfolio/work/manualeconomy/category-markets-1920x1080.jpg",
        alt: { en: "Manual Economy markets category", ru: "Раздел рынков Manual Economy" },
      },
      {
        src: "/portfolio/work/manualeconomy/article-1920x1080.jpg",
        alt: { en: "Manual Economy article page", ru: "Страница статьи Manual Economy" },
      },
    ],
    links: liveLink("https://manualeconomy.kz/"),
    features: [
      {
        en: "CMS-driven home, category, listing, and article templates for a continuously updated financial publication.",
        ru: "Управляемые CMS шаблоны главной, категорий, списков и статей для постоянно обновляемого финансового издания.",
      },
      {
        en: "Responsive editorial layouts, reusable frontend patterns, dynamic content, and multilingual handling where required.",
        ru: "Адаптивные редакционные макеты, переиспользуемые frontend-паттерны, динамический контент и многоязычность там, где она нужна.",
      },
      {
        en: "SEO implementation, maintenance, and post-launch fixes around an active editorial workflow.",
        ru: "SEO-реализация, поддержка и исправления после запуска в рамках активного редакционного процесса.",
      },
    ],
    wins: [
      {
        en: "Delivered maintainable CMS structures for a real editorial product whose content changes every day.",
        ru: "Реализовал поддерживаемые CMS-структуры для реального редакционного продукта с ежедневно меняющимся контентом.",
      },
      {
        en: "Converted design and editorial requirements into reusable production patterns without disrupting existing functionality.",
        ru: "Перевёл дизайн и редакционные требования в переиспользуемые production-паттерны без нарушения существующей функциональности.",
      },
    ],
    improvements: [
      {
        en: "Standardize components further and reduce duplication across editorial templates.",
        ru: "Дальше стандартизировать компоненты и сократить дублирование в редакционных шаблонах.",
      },
      {
        en: "Add stronger type safety and a more explicit contract between CMS data and frontend rendering.",
        ru: "Усилить типизацию и формализовать контракт между данными CMS и frontend-рендерингом.",
      },
      {
        en: "Continue improving Core Web Vitals, image handling, and structured data.",
        ru: "Продолжить улучшать Core Web Vitals, работу с изображениями и структурированные данные.",
      },
    ],
  },
  {
    slug: "national-business",
    kind: "website",
    year: "2025–2026",
    title: { en: "National Business", ru: "National Business" },
    summary: {
      en: "A broad business publication covering the economy, markets, companies, technology, government, geopolitics, research, and culture.",
      ru: "Деловое издание об экономике, рынках, компаниях, технологиях, государстве, геополитике, исследованиях и культуре.",
    },
    description: {
      en: "I implemented the new site and integrated it with a custom Python publishing backend under significant time pressure. The result was an operational production publication built around an unconventional existing editorial system.",
      ru: "Я реализовал новый сайт и интегрировал его с кастомным Python-backend для публикаций в условиях жёстких сроков. Результатом стало работающее production-издание, построенное вокруг нестандартной существующей редакционной системы.",
    },
    role: { en: "Frontend / Full-stack Developer", ru: "Frontend / Full-stack разработчик" },
    techStack: ["Python", "Custom CMS", "Custom editorial backend", "HTML", "SCSS", "JavaScript"],
    images: [
      {
        src: "/portfolio/work/nationalbusiness/home-1920x1080.jpg",
        alt: { en: "National Business homepage", ru: "Главная страница National Business" },
      },
      {
        src: "/portfolio/work/nationalbusiness/category-economy-1920x1080.jpg",
        alt: { en: "National Business economy category", ru: "Раздел экономики National Business" },
      },
      {
        src: "/portfolio/work/nationalbusiness/article-1920x1080.jpg",
        alt: { en: "National Business article page", ru: "Страница статьи National Business" },
      },
    ],
    links: liveLink("https://nationalbusiness.kz/"),
    features: [
      {
        en: "A new editorial frontend integrated with a custom Python publishing backend.",
        ru: "Новый редакционный frontend, интегрированный с кастомным Python publishing-backend.",
      },
      {
        en: "Homepage, category, article, ticker, and navigation experiences for a broad business-news taxonomy.",
        ru: "Главная, категории, статьи, рыночный тикер и навигация для широкой рубрикации делового издания.",
      },
      {
        en: "Production delivery around the constraints of an established, unconventional editorial infrastructure.",
        ru: "Production-запуск с учётом ограничений существующей нестандартной редакционной инфраструктуры.",
      },
    ],
    wins: [
      {
        en: "Delivered an operational publication under a demanding deadline.",
        ru: "Запустил работающее издание в условиях жёсткого дедлайна.",
      },
      {
        en: "Integrated a new public-facing site with a non-standard backend instead of assuming a clean greenfield architecture.",
        ru: "Интегрировал новый публичный сайт с нестандартным backend, не рассчитывая на чистую greenfield-архитектуру.",
      },
    ],
    improvements: [
      {
        en: "Refactor the frontend-to-backend integration and separate responsibilities more clearly.",
        ru: "Рефакторить интеграцию frontend и backend и чётче разделить ответственности.",
      },
      {
        en: "Remove duplicated logic and establish a cleaner component and application architecture.",
        ru: "Убрать дублирующуюся логику и выстроить более чистую архитектуру компонентов и приложения.",
      },
      {
        en: "Revisit deadline-driven tradeoffs now that the production path is proven.",
        ru: "Пересмотреть компромиссы, принятые из-за сроков, теперь, когда production-сценарий уже проверен.",
      },
    ],
  },
];
