import { workPortfolioProjects } from "./work-portfolio";

export type PortfolioLocale = "en" | "ru";

type LocalizedText = Record<PortfolioLocale, string>;

export type PortfolioImage = {
  src: string;
  alt: LocalizedText;
};

type ProjectLink = {
  label: LocalizedText;
  href: string;
};

type ProjectBase = {
  slug: string;
  year: string;
  sample?: boolean;
  title: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  role: LocalizedText;
  techStack: string[];
  images: PortfolioImage[];
  links?: {
    github?: ProjectLink;
    live?: ProjectLink;
  };
};

export type PersonalProject = ProjectBase & {
  kind: "personal";
  notes: LocalizedText[];
  nextSteps: LocalizedText[];
};

export type WebsiteProject = ProjectBase & {
  kind: "website";
  features: LocalizedText[];
  wins: LocalizedText[];
  improvements: LocalizedText[];
};

export type PortfolioProject = PersonalProject | WebsiteProject;

const portfolioDrafts: PortfolioProject[] = [
  {
    slug: "packet-garden",
    kind: "personal",
    year: "2026",
    sample: true,
    title: { en: "Packet Garden", ru: "Packet Garden" },
    summary: {
      en: "A quiet visual map of the devices and services living on a home network.",
      ru: "Спокойная визуальная карта устройств и сервисов, живущих в домашней сети.",
    },
    description: {
      en: "A weekend experiment that turns network discovery into a small, readable landscape. It groups devices by trust zone, keeps a history of what appeared and disappeared, and stays useful without becoming another monitoring dashboard.",
      ru: "Эксперимент выходного дня, превращающий обнаружение устройств в небольшую понятную карту. Он группирует устройства по зонам доверия, хранит историю появлений и исчезновений и остаётся полезным, не превращаясь в очередной дашборд мониторинга.",
    },
    role: { en: "Concept, interface, and implementation", ru: "Концепция, интерфейс и разработка" },
    techStack: ["Go", "SQLite", "mDNS", "SNMP", "WebSockets", "CSS"],
    images: [
      {
        src: "/portfolio/packet-garden.svg",
        alt: { en: "Packet Garden network map interface", ru: "Интерфейс карты сети Packet Garden" },
      },
    ],
    notes: [
      {
        en: "Passive discovery first, with active probes used only when they add useful context.",
        ru: "Сначала пассивное обнаружение, активные проверки — только когда они добавляют полезный контекст.",
      },
      {
        en: "A deliberately small event model makes device history easy to inspect and export.",
        ru: "Намеренно небольшая модель событий упрощает просмотр и экспорт истории устройств.",
      },
      {
        en: "The map is keyboard-navigable and remains legible on a phone beside a network rack.",
        ru: "Карта доступна с клавиатуры и остаётся читаемой на телефоне рядом с сетевой стойкой.",
      },
    ],
    nextSteps: [
      {
        en: "Add better vendor fingerprinting without sending local network data to a third party.",
        ru: "Улучшить определение производителей, не отправляя данные локальной сети третьим сторонам.",
      },
      {
        en: "Build a calmer alert model for meaningful topology changes.",
        ru: "Создать более спокойную модель уведомлений о значимых изменениях топологии.",
      },
    ],
  },
  {
    slug: "midnight-archive",
    kind: "personal",
    year: "2025",
    sample: true,
    title: { en: "Midnight Archive", ru: "Midnight Archive" },
    summary: {
      en: "A self-hosted reading archive for pages that may not be online tomorrow.",
      ru: "Self-hosted архив для материалов, которых завтра может уже не быть в сети.",
    },
    description: {
      en: "A local-first bookmark and capture service for long-form reading. It stores a faithful snapshot, extracts a clean text version, and makes the collection searchable without turning it into a public social product.",
      ru: "Локальный сервис закладок и сохранения длинных материалов. Он хранит точный снимок страницы, извлекает чистую текстовую версию и делает коллекцию доступной для поиска, не превращая её в публичный социальный продукт.",
    },
    role: { en: "Product design and full-stack development", ru: "Продуктовый дизайн и full-stack разработка" },
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Playwright", "Meilisearch", "Docker"],
    images: [
      {
        src: "/portfolio/midnight-archive.svg",
        alt: { en: "Midnight Archive reading library", ru: "Библиотека чтения Midnight Archive" },
      },
    ],
    notes: [
      {
        en: "Original snapshots and extracted text are stored separately so either can be replaced safely.",
        ru: "Оригинальные снимки и извлечённый текст хранятся отдельно, поэтому каждый слой можно безопасно заменить.",
      },
      {
        en: "Search favors titles, authors, and personal notes over noisy page chrome.",
        ru: "Поиск отдаёт приоритет заголовкам, авторам и личным заметкам, а не шуму интерфейса страницы.",
      },
    ],
    nextSteps: [
      {
        en: "Improve capture reliability for highly interactive and authenticated pages.",
        ru: "Повысить надёжность сохранения интерактивных страниц и материалов за авторизацией.",
      },
      {
        en: "Add portable annotations that survive reprocessing.",
        ru: "Добавить переносимые аннотации, сохраняющиеся после повторной обработки материала.",
      },
    ],
  },
  {
    slug: "desk-weather",
    kind: "personal",
    year: "2024",
    sample: true,
    title: { en: "Desk Weather", ru: "Desk Weather" },
    summary: {
      en: "An e-ink forecast that only shows the weather decisions worth making.",
      ru: "E-ink прогноз, показывающий только те погодные решения, которые действительно нужно принять.",
    },
    description: {
      en: "A low-power desk display that turns several forecast sources into a simple morning brief: layers, umbrella, wind, daylight, and whether opening the window is a good idea.",
      ru: "Энергоэффективный настольный экран, превращающий несколько источников прогноза в короткую утреннюю сводку: одежда, зонт, ветер, световой день и стоит ли открывать окно.",
    },
    role: { en: "Hardware, data pipeline, and visual system", ru: "Железо, пайплайн данных и визуальная система" },
    techStack: ["ESP32", "MicroPython", "E-ink", "Open-Meteo", "MQTT"],
    images: [
      {
        src: "/portfolio/desk-weather.svg",
        alt: { en: "Desk Weather e-ink forecast layout", ru: "Макет e-ink прогноза Desk Weather" },
      },
    ],
    notes: [
      {
        en: "The display renders from a tiny semantic weather model rather than raw forecast fields.",
        ru: "Экран строится из небольшой семантической модели погоды, а не из сырых полей прогноза.",
      },
      {
        en: "It degrades gracefully when one provider or the home network is unavailable.",
        ru: "Устройство продолжает быть полезным, когда один из провайдеров или домашняя сеть недоступны.",
      },
    ],
    nextSteps: [
      {
        en: "Tune the recommendation rules across more seasons and travel locations.",
        ru: "Настроить правила рекомендаций для разных сезонов и поездок.",
      },
    ],
  },
  {
    slug: "northline-studio",
    kind: "website",
    year: "2026",
    title: { en: "Northline Studio", ru: "Northline Studio" },
    summary: {
      en: "A portfolio that lets an architecture practice explain the thinking behind the photographs.",
      ru: "Портфолио архитектурного бюро, объясняющее идеи, стоящие за фотографиями.",
    },
    description: {
      en: "A bilingual editorial site for a fictional architecture practice. The main challenge was balancing cinematic project photography with dense technical context, then giving a small team a CMS they could use without a publishing manual.",
      ru: "Двуязычный редакционный сайт вымышленного архитектурного бюро. Главной задачей было сбалансировать кинематографичные фотографии проектов с плотным техническим контекстом и дать небольшой команде CMS, не требующую инструкции по публикации.",
    },
    role: { en: "Technical direction, frontend, CMS architecture", ru: "Техническое руководство, frontend и архитектура CMS" },
    techStack: ["Next.js", "TypeScript", "Sanity", "GROQ", "Cloudflare", "PostgreSQL", "Mapbox", "Storybook", "Playwright"],
    images: [
      {
        src: "/portfolio/northline-home.svg",
        alt: { en: "Northline Studio project-led homepage", ru: "Главная страница Northline Studio с акцентом на проекты" },
      },
      {
        src: "/portfolio/northline-case.svg",
        alt: { en: "Northline Studio architecture case study", ru: "Страница архитектурного проекта Northline Studio" },
      },
    ],
    features: [
      {
        en: "Project stories that mix photography, plans, materials, and short editorial annotations.",
        ru: "Истории проектов, объединяющие фотографии, планы, материалы и короткие редакционные комментарии.",
      },
      {
        en: "A shared bilingual content model with explicit translation status and graceful fallbacks.",
        ru: "Единая двуязычная контентная модель с явным статусом перевода и аккуратными fallback-состояниями.",
      },
      {
        en: "Automatic image focal points, responsive art direction, and low-quality placeholders.",
        ru: "Автоматические точки фокуса изображений, адаптивное кадрирование и облегчённые плейсхолдеры.",
      },
      {
        en: "Location, typology, material, and completion-year indexes generated from the same project data.",
        ru: "Индексы по локации, типологии, материалу и году завершения, собранные из одних данных проекта.",
      },
    ],
    wins: [
      {
        en: "The media pipeline protects visual quality without asking editors to understand responsive images.",
        ru: "Медиапайплайн сохраняет качество изображения, не заставляя редакторов разбираться в responsive images.",
      },
      {
        en: "The content model mirrors how the studio discusses work internally, so publishing feels natural.",
        ru: "Контентная модель повторяет внутренний язык бюро, поэтому публикация ощущается естественно.",
      },
      {
        en: "Project pages remain readable with JavaScript disabled and on slower site connections.",
        ru: "Страницы проектов остаются читаемыми без JavaScript и при медленном соединении.",
      },
    ],
    improvements: [
      {
        en: "I would prototype the archive filters with real editors earlier; the first taxonomy was too clever.",
        ru: "Я бы раньше протестировал фильтры архива с реальными редакторами: первая таксономия получилась слишком умной.",
      },
      {
        en: "The map view deserves a more useful small-screen alternative than a reduced desktop map.",
        ru: "Для карты нужна более полезная мобильная альтернатива, а не просто уменьшенная desktop-версия.",
      },
    ],
  },
  {
    slug: "field-notes-archive",
    kind: "website",
    year: "2025",
    title: { en: "Field Notes Archive", ru: "Field Notes Archive" },
    summary: {
      en: "A research library built to make fifteen years of scattered knowledge usable again.",
      ru: "Исследовательская библиотека, возвращающая к жизни пятнадцать лет разрозненных знаний.",
    },
    description: {
      en: "A content-heavy archive for a fictional environmental research collective. The work combined a legacy migration, a new publishing workflow, faceted search, and a reading experience that respects long technical documents.",
      ru: "Контентный архив для вымышленной группы экологических исследователей. Работа объединила миграцию старой системы, новый процесс публикации, фасетный поиск и интерфейс чтения длинных технических документов.",
    },
    role: { en: "Information architecture, migration, and full-stack delivery", ru: "Информационная архитектура, миграция и full-stack разработка" },
    techStack: ["Next.js", "React", "Directus", "PostgreSQL", "OpenSearch", "S3", "Docker", "GitHub Actions", "Cloudflare Workers"],
    images: [
      {
        src: "/portfolio/field-notes-index.svg",
        alt: { en: "Field Notes Archive searchable index", ru: "Поисковый индекс Field Notes Archive" },
      },
      {
        src: "/portfolio/field-notes-article.svg",
        alt: { en: "Field Notes Archive long-form article", ru: "Длинный материал в Field Notes Archive" },
      },
    ],
    features: [
      {
        en: "Faceted search across region, habitat, method, author, and publication type.",
        ru: "Фасетный поиск по региону, среде, методу, автору и типу публикации.",
      },
      {
        en: "Document relationships that connect field reports, datasets, species, and later corrections.",
        ru: "Связи между полевыми отчётами, датасетами, видами и последующими исправлениями.",
      },
      {
        en: "A resumable migration pipeline with validation reports for non-technical reviewers.",
        ru: "Возобновляемый пайплайн миграции с понятными отчётами проверки для нетехнических специалистов.",
      },
      {
        en: "Print-friendly reading views and durable citation URLs for every document section.",
        ru: "Версии для печати и устойчивые ссылки для цитирования каждого раздела документа.",
      },
    ],
    wins: [
      {
        en: "The migration was treated as a product with previews and review queues, not as a one-off script.",
        ru: "Миграция была сделана как продукт с предпросмотром и очередями проверки, а не как одноразовый скрипт.",
      },
      {
        en: "Search communicates why each result matched, making a complex archive easier to trust.",
        ru: "Поиск объясняет причину совпадения каждого результата, поэтому сложному архиву легче доверять.",
      },
      {
        en: "The article template handles tables, figures, citations, and marginal notes without becoming fragile.",
        ru: "Шаблон материала выдерживает таблицы, иллюстрации, цитаты и заметки на полях, не становясь хрупким.",
      },
    ],
    improvements: [
      {
        en: "The initial indexing strategy duplicated too much CMS data; a smaller search document would be easier to evolve.",
        ru: "Первая стратегия индексации дублировала слишком много данных CMS; компактный поисковый документ было бы легче развивать.",
      },
      {
        en: "I would budget accessibility testing with domain experts for the densest charts and scientific notation.",
        ru: "Я бы заранее заложил тестирование доступности сложных графиков и научной нотации с профильными экспертами.",
      },
    ],
  },
];

export const portfolioProjects: PortfolioProject[] = [
  ...portfolioDrafts.filter((project) => project.kind === "personal"),
  ...workPortfolioProjects,
];

export function getPortfolioProject(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}

export function localizePortfolioProject(project: PortfolioProject, locale: PortfolioLocale) {
  const localize = (value: LocalizedText) => value[locale];
  const base = {
    ...project,
    title: localize(project.title),
    summary: localize(project.summary),
    description: localize(project.description),
    role: localize(project.role),
    images: project.images.map((image) => ({ ...image, alt: localize(image.alt) })),
    links: project.links
      ? Object.fromEntries(
          Object.entries(project.links).map(([key, link]) => [
            key,
            link ? { ...link, label: localize(link.label) } : undefined,
          ]),
        )
      : undefined,
  };

  if (project.kind === "website") {
    return {
      ...base,
      kind: project.kind,
      features: project.features.map(localize),
      wins: project.wins.map(localize),
      improvements: project.improvements.map(localize),
    };
  }

  return {
    ...base,
    kind: project.kind,
    notes: project.notes.map(localize),
    nextSteps: project.nextSteps.map(localize),
  };
}
