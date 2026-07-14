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
  highlighted?: boolean;
  sample?: boolean;
  title: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  role: LocalizedText;
  techStack: string[];
  images: PortfolioImage[];
  links?: {
    github?: ProjectLink;
    secondaryGithub?: ProjectLink;
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

const personalPortfolioProjects: PersonalProject[] = [
  {
    slug: "homelab-infrastructure",
    kind: "personal",
    year: "2024–2026",
    highlighted: true,
    title: { en: "Homelab Infrastructure", ru: "Домашняя инфраструктура" },
    summary: {
      en: "A two-site infrastructure connecting work hardware, home services, private devices, and public traffic without opening inbound ports.",
      ru: "Инфраструктура из двух площадок, объединяющая рабочее железо, домашние сервисы, личные устройства и публичный трафик без открытых входящих портов.",
    },
    description: {
      en: "An evolving homelab and work infrastructure built around clear trust boundaries. A Tailscale mesh connects personal devices, a Proxmox host, and a Raspberry Pi. Public requests enter through Cloudflare and travel over outbound tunnels to the appropriate service, while internal tools remain private. Proxmox runs isolated containers and VM guests; the Pi carries the smaller always-on personal services.",
      ru: "Развивающаяся домашняя и рабочая инфраструктура с чёткими границами доверия. Tailscale mesh объединяет личные устройства, Proxmox-хост и Raspberry Pi. Публичные запросы входят через Cloudflare и идут по исходящим туннелям к нужному сервису, а внутренние инструменты остаются приватными. Proxmox запускает изолированные контейнеры и виртуальные машины, а Pi держит небольшие постоянно работающие личные сервисы.",
    },
    role: {
      en: "Infrastructure architecture, deployment, and operations",
      ru: "Архитектура инфраструктуры, деплой и эксплуатация",
    },
    techStack: [
      "Proxmox VE",
      "LXC",
      "Virtual machines",
      "Tailscale",
      "Cloudflare Tunnel",
      "Raspberry Pi 5",
      "n8n",
      "Vaultwarden",
      "Home Assistant",
    ],
    images: [
      {
        src: "/portfolio/personal/homelab/architecture.svg",
        alt: {
          en: "Logical map of the homelab and work infrastructure",
          ru: "Логическая схема домашней и рабочей инфраструктуры",
        },
      },
    ],
    notes: [
      {
        en: "Public services use outbound Cloudflare tunnels, so the network does not need publicly exposed inbound ports.",
        ru: "Публичные сервисы используют исходящие Cloudflare-туннели, поэтому сети не нужны открытые входящие порты.",
      },
      {
        en: "Tailscale provides one private access plane across work hardware, personal computers, laptops, and the Pi.",
        ru: "Tailscale создаёт единый приватный контур доступа для рабочего железа, личных компьютеров, ноутбуков и Pi.",
      },
      {
        en: "Work-hosted and personal traffic use distinct service paths while still sharing a legible operating model.",
        ru: "Рабочий и личный трафик используют разные пути к сервисам, сохраняя при этом единую понятную эксплуатационную модель.",
      },
    ],
    nextSteps: [
      {
        en: "Add one observability layer for service health, tunnel state, storage, and backup freshness.",
        ru: "Добавить единый слой наблюдаемости за сервисами, туннелями, хранилищем и актуальностью бэкапов.",
      },
      {
        en: "Move more of the repeatable setup into versioned infrastructure-as-code and documented recovery drills.",
        ru: "Перенести повторяемую настройку в версионируемый infrastructure-as-code и документированные сценарии восстановления.",
      },
    ],
  },
  {
    slug: "virtual-gamepad",
    kind: "personal",
    year: "2025",
    title: { en: "Virtual Gamepad", ru: "Virtual Gamepad" },
    summary: {
      en: "An iPhone becomes a low-latency Xbox controller for a Windows PC over the local network.",
      ru: "iPhone превращается в Xbox-контроллер для Windows с низкой задержкой через локальную сеть.",
    },
    description: {
      en: "A two-part experiment: a landscape SwiftUI controller with touch controls and haptic feedback, plus a small Windows server that translates WebSocket messages into XInput events. The server is also distributed as an executable so the setup does not require a Python environment.",
      ru: "Эксперимент из двух частей: landscape-контроллер на SwiftUI с сенсорным управлением и тактильной отдачей, а также небольшой Windows-сервер, переводящий WebSocket-сообщения в события XInput. Сервер распространяется и как готовый executable, поэтому для запуска не нужен Python.",
    },
    role: { en: "iOS client and Windows server development", ru: "Разработка iOS-клиента и Windows-сервера" },
    techStack: ["Swift", "SwiftUI", "Starscream", "WebSockets", "Python", "FastAPI", "vgamepad", "ViGEm"],
    images: [
      {
        src: "/portfolio/personal/virtual-gamepad/controller.svg",
        alt: { en: "Virtual Gamepad landscape controller interface", ru: "Landscape-интерфейс контроллера Virtual Gamepad" },
      },
      {
        src: "/portfolio/personal/virtual-gamepad/settings.svg",
        alt: { en: "Virtual Gamepad connection settings", ru: "Настройки подключения Virtual Gamepad" },
      },
    ],
    notes: [
      {
        en: "The client covers standard Xbox 360 inputs, twin analogue sticks, triggers, shoulder buttons, and a D-pad.",
        ru: "Клиент поддерживает стандартные элементы Xbox 360: два аналоговых стика, триггеры, бамперы и D-pad.",
      },
      {
        en: "Touch gestures are translated to compact real-time commands and sent to a configurable local server.",
        ru: "Сенсорные жесты превращаются в компактные команды реального времени и отправляются на настраиваемый локальный сервер.",
      },
      {
        en: "Haptics, connection state, and press animations make a glass touchscreen easier to use without looking down.",
        ru: "Тактильная отдача, статус подключения и анимации нажатий помогают пользоваться стеклянным экраном, не глядя на него постоянно.",
      },
    ],
    nextSteps: [
      {
        en: "Add automatic server discovery and more resilient reconnection when the phone changes networks.",
        ru: "Добавить автоматический поиск сервера и более устойчивое переподключение при смене сети на телефоне.",
      },
      {
        en: "Make control placement configurable for different hand sizes and iPhone dimensions.",
        ru: "Сделать расположение элементов настраиваемым под разные размеры рук и моделей iPhone.",
      },
    ],
    links: {
      github: {
        label: { en: "iOS client on GitHub", ru: "iOS-клиент на GitHub" },
        href: "https://github.com/artchsh/remote-ios-controller-app",
      },
      secondaryGithub: {
        label: { en: "Windows server on GitHub", ru: "Windows-сервер на GitHub" },
        href: "https://github.com/artchsh/remote-ios-controller-server",
      },
    },
  },
  {
    slug: "financial-tracker",
    kind: "personal",
    year: "2025–2026",
    title: { en: "Financial Tracker", ru: "Financial Tracker" },
    summary: {
      en: "A mobile-only, local-first budget tracker built first as a PWA and then explored as a native app.",
      ru: "Мобильный local-first трекер бюджета: сначала PWA, затем отдельная нативная версия.",
    },
    description: {
      en: "A personal budgeting tool designed for a phone rather than a compressed desktop dashboard. The PWA stores everything in IndexedDB, works offline, tracks monthly limits and categories, and supports portable JSON backups. I later carried the same product into an Expo and React Native codebase to explore native navigation, haptics, and local storage.",
      ru: "Персональный инструмент для бюджета, спроектированный именно для телефона, а не как сжатый desktop-дашборд. PWA хранит всё в IndexedDB, работает офлайн, ведёт месячные лимиты и категории и поддерживает переносимые JSON-бэкапы. Позже я перенёс продукт в Expo и React Native, чтобы исследовать нативную навигацию, haptics и локальное хранение.",
    },
    role: { en: "Product design and web/native implementation", ru: "Продуктовый дизайн и web/native разработка" },
    techStack: ["React 19", "TypeScript", "Bun", "IndexedDB", "Service Worker", "PWA", "Expo", "React Native", "Zustand"],
    images: [
      {
        src: "/portfolio/personal/financial-tracker/pwa-budget.png",
        alt: { en: "Financial Tracker mobile budget overview with sample data", ru: "Мобильный обзор бюджета Financial Tracker с демонстрационными данными" },
      },
      {
        src: "/portfolio/personal/financial-tracker/pwa-history.png",
        alt: { en: "Financial Tracker monthly budget history", ru: "История месячных бюджетов в Financial Tracker" },
      },
      {
        src: "/portfolio/personal/financial-tracker/pwa-settings.png",
        alt: { en: "Financial Tracker settings and local data controls", ru: "Настройки и управление локальными данными Financial Tracker" },
      },
    ],
    notes: [
      {
        en: "All financial data stays on the device; the app has no account system or remote database.",
        ru: "Все финансовые данные остаются на устройстве: в приложении нет аккаунтов и удалённой базы данных.",
      },
      {
        en: "Monthly limits, allocations, spending, remaining money, and overspending warnings update together.",
        ru: "Месячные лимиты, распределение, траты, остаток и предупреждения о перерасходе обновляются согласованно.",
      },
      {
        en: "The same product model now exists in a separate Expo/React Native implementation, not just a responsive web wrapper.",
        ru: "Та же продуктовая модель существует в отдельной реализации на Expo/React Native, а не только в адаптивной web-обёртке.",
      },
    ],
    nextSteps: [
      {
        en: "Bring the web and native versions to feature parity with a shared, versioned data format.",
        ru: "Довести web- и native-версии до функционального паритета с общим версионируемым форматом данных.",
      },
      {
        en: "Offer optional encrypted sync without making an account mandatory for local use.",
        ru: "Добавить опциональную зашифрованную синхронизацию, не делая аккаунт обязательным для локального использования.",
      },
    ],
    links: {
      github: {
        label: { en: "PWA source on GitHub", ru: "Исходный код PWA на GitHub" },
        href: "https://github.com/artchsh/financial-tracker",
      },
      secondaryGithub: {
        label: { en: "Native app on GitHub", ru: "Нативное приложение на GitHub" },
        href: "https://github.com/artchsh/financial-tracker-native",
      },
      live: {
        label: { en: "Open the mobile PWA", ru: "Открыть мобильную PWA" },
        href: "https://financial-tracker-october-skyler.vercel.app/",
      },
    },
  },
  {
    slug: "wedding-wishlist",
    kind: "personal",
    year: "2026",
    title: { en: "Wedding Wishlist", ru: "Wedding Wishlist" },
    summary: {
      en: "A private-by-convention gift registry where guests can reserve presents without creating accounts.",
      ru: "Список свадебных подарков, где гости могут бронировать вещи без регистрации аккаунта.",
    },
    description: {
      en: "A deliberately informal wedding registry built for real guests and a real deadline. Visitors enter a memorable name, reserve or release gifts, or choose a cash contribution. A protected admin workflow handles products, categories, ordering, images, imports, and backups without exposing those controls to guests.",
      ru: "Намеренно неформальный свадебный wishlist, сделанный для реальных гостей и реального дедлайна. Посетители вводят запоминаемое имя, бронируют или освобождают подарки либо выбирают денежный вариант. Защищённая admin-часть управляет товарами, категориями, порядком, изображениями, импортом и бэкапами, не показывая эти инструменты гостям.",
    },
    role: { en: "Product design and full-stack implementation", ru: "Продуктовый дизайн и full-stack разработка" },
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Cloudflare Workers", "OpenNext", "R2", "Edge caching"],
    images: [
      {
        src: "/portfolio/personal/wedding-wishlist/home.png",
        alt: { en: "Wedding Wishlist guest landing page and gift cards", ru: "Гостевая страница Wedding Wishlist с карточками подарков" },
      },
      {
        src: "/portfolio/personal/wedding-wishlist/gifts.png",
        alt: { en: "Wedding Wishlist category and reservation states", ru: "Категория и статусы бронирования в Wedding Wishlist" },
      },
    ],
    notes: [
      {
        en: "The guest flow needs only a name: no email, password, or account setup stands between a person and a reservation.",
        ru: "Гостю достаточно имени: между человеком и бронированием нет email, пароля или настройки аккаунта.",
      },
      {
        en: "Reservation states are visible immediately, while the admin side keeps editing and recovery tools separate.",
        ru: "Статусы бронирования видны сразу, а admin-часть отдельно хранит инструменты редактирования и восстановления.",
      },
      {
        en: "Product importing, object storage, edge caching, and automated JSON backups reduce maintenance around a one-off event.",
        ru: "Импорт товаров, object storage, edge-кэширование и автоматические JSON-бэкапы уменьшают объём ручной поддержки одноразового события.",
      },
    ],
    nextSteps: [
      {
        en: "Improve image fallbacks and make keyboard focus more obvious across every card action.",
        ru: "Улучшить fallback-состояния изображений и сделать keyboard focus заметнее во всех действиях карточек.",
      },
      {
        en: "Add a lightweight reservation token so guests can recover their own choices without relying on a remembered name.",
        ru: "Добавить лёгкий токен бронирования, чтобы гости могли восстановить свой выбор, не полагаясь только на запомненное имя.",
      },
    ],
  },
  {
    slug: "smoke-alarm-telegram-bot",
    kind: "personal",
    year: "2025–2026",
    title: { en: "Smoke Alarm Telegram Bot", ru: "Smoke Alarm Telegram Bot" },
    summary: {
      en: "A playful Telegram bot that turns a group smoke break into a tiny shared ritual.",
      ru: "Весёлый Telegram-бот, превращающий групповой перекур в небольшой общий ритуал.",
    },
    description: {
      en: "A group bot made for fun and then expanded into a surprisingly complete little social tool. A smoke call mentions the squad with a randomized message, adds the caller automatically, lets others join or change their mind with an inline button, and includes current Almaty weather. It also keeps history, leaderboards, opt-in state, and workday weather subscriptions.",
      ru: "Групповой бот, сделанный ради шутки и постепенно выросший в довольно полноценный социальный инструмент. Вызов на перекур упоминает компанию случайным сообщением, автоматически добавляет автора, позволяет присоединиться или передумать через inline-кнопку и показывает текущую погоду в Алматы. Бот также хранит историю, статистику, opt-in статус и подписки на прогноз по рабочим дням.",
    },
    role: { en: "Concept, bot development, and deployment", ru: "Концепция, разработка и деплой бота" },
    techStack: ["Python", "Telegram Bot API", "SQLite", "Open-Meteo API", "Docker", "Docker Compose", "uv"],
    images: [
      {
        src: "/portfolio/personal/smoke-alarm/smoke-call.png",
        alt: { en: "Smoke Alarm bot call with participants, weather, and join button", ru: "Вызов Smoke Alarm с участниками, погодой и кнопкой присоединения" },
      },
    ],
    notes: [
      {
        en: "Inline participation updates the original message, so the group can see who is going without a thread of replies.",
        ru: "Inline-участие обновляет исходное сообщение, поэтому группе видно, кто идёт, без цепочки ответов.",
      },
      {
        en: "SQLite persists users, opt-in state, calls, participation, and statistics across restarts.",
        ru: "SQLite хранит пользователей, opt-in статус, вызовы, участие и статистику между перезапусками.",
      },
      {
        en: "Randomized Russian copy and real weather make a repetitive utility feel specific to the group using it.",
        ru: "Случайные русские сообщения и реальная погода делают повторяющуюся утилиту живой и узнаваемой для своей компании.",
      },
    ],
    nextSteps: [
      {
        en: "Add stronger concurrency handling when several smoke calls or button presses happen together.",
        ru: "Усилить обработку конкурентных событий, когда одновременно происходят несколько вызовов или нажатий.",
      },
      {
        en: "Cover command, callback, migration, and scheduled-notification flows with automated tests.",
        ru: "Покрыть автоматическими тестами команды, callbacks, миграции и запланированные уведомления.",
      },
    ],
    links: {
      github: {
        label: { en: "Bot source on GitHub", ru: "Исходный код бота на GitHub" },
        href: "https://github.com/artchsh/smoke-alarm-telegram-bot",
      },
    },
  },
];

export const portfolioProjects: PortfolioProject[] = [
  ...personalPortfolioProjects,
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
