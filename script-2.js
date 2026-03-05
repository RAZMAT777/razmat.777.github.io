const contentMap = {
  en: {
    navMission: "Mission",
    navCapabilities: "Capabilities",
    navWork: "Work",
    navReach: "Reach",
    tag: "System-Level Developer with Mechatronics DNA",
    title: "Code, circuits, mechanics. One engineering language.",
    desc:
      "I build product interfaces, backend logic, and automation flows that behave like a tuned machine: clear tolerances, no wasted motion, full operational focus.",
    ctaWork: "Inspect Projects",
    ctaContact: "Open Channel",
    stat1: "Years in TUMO",
    stat2: "Polytechnic years",
    stat3: "Builder mindset",
    capTitle: "Execution Areas",
    cap1Title: "React Frontend",
    cap1Body: "Interface architecture, reusable components, and responsive behavior tuned for real users.",
    cap2Title: "Node.js Services",
    cap2Body: "Structured API layers with predictable contracts, practical scaling paths, and clean request flow.",
    cap3Title: "Python Automation",
    cap3Body: "Scripts that remove repetitive tasks and lock process quality for everyday operations.",
    cap4Title: "Mechatronics Thinking",
    cap4Body: "Mechanical discipline applied to software systems: constraints first, elegance through precision.",
    workTitle: "Build Log",
    work1Title: "React Product Console",
    work1Body: "Authentication, route control, and data filtering wired for speed and clarity.",
    work2Title: "Node API Backbone",
    work2Body: "Service endpoints with stable response patterns and practical maintenance strategy.",
    work3Title: "Python Ops Scripts",
    work3Body: "Automated repeat operations to cut manual load and reduce execution drift.",
    reachTitle: "Available for serious builds"
  },
  ru: {
    navMission: "Миссия",
    navCapabilities: "Возможности",
    navWork: "Работы",
    navReach: "Связь",
    tag: "Системный разработчик с базой в мехатронике",
    title: "Код, схемы, механика. Один инженерный язык.",
    desc:
      "Я строю интерфейсы, серверную логику и автоматизацию как настроенный механизм: четкие допуски, без лишних движений, с полным контролем поведения.",
    ctaWork: "Смотреть проекты",
    ctaContact: "Открыть канал",
    stat1: "Лет в TUMO",
    stat2: "Года в Политехе",
    stat3: "Режим создателя",
    capTitle: "Зоны исполнения",
    cap1Title: "Фронтенд на React",
    cap1Body: "Архитектура интерфейсов, переиспользуемые компоненты и адаптивное поведение для реальных пользователей.",
    cap2Title: "Сервисы на Node.js",
    cap2Body: "Структурированные API-слои с понятными контрактами, путями масштабирования и чистым потоком запросов.",
    cap3Title: "Автоматизация на Python",
    cap3Body: "Скрипты, которые снимают рутину и фиксируют качество процессов в ежедневной работе.",
    cap4Title: "Мехатронное мышление",
    cap4Body: "Механическая дисциплина в программных системах: сначала ограничения, затем элегантность через точность.",
    workTitle: "Журнал сборки",
    work1Title: "React Product Console",
    work1Body: "Авторизация, управление маршрутами и фильтрация данных, настроенные на скорость и ясность.",
    work2Title: "Node API Backbone",
    work2Body: "Сервисные эндпоинты со стабильными паттернами ответов и практичной стратегией поддержки.",
    work3Title: "Python Ops Scripts",
    work3Body: "Автоматизация повторяемых операций для снижения ручной нагрузки и ошибок исполнения.",
    reachTitle: "Открыт для серьезных проектов"
  }
};

const switchButtons = document.querySelectorAll(".switch-btn");
const translatableNodes = document.querySelectorAll("[data-i18n]");
const sectionNodes = [...document.querySelectorAll("main section")];
const navNodes = [...document.querySelectorAll(".dock a")];
const revealNodes = document.querySelectorAll(".reveal");
const spotlightNode = document.querySelector(".spotlight");

function updateLanguage(langCode) {
  const dictionary = contentMap[langCode] || contentMap.en;

  translatableNodes.forEach((node) => {
    const token = node.dataset.i18n;
    if (dictionary[token]) {
      node.textContent = dictionary[token];
    }
  });

  switchButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === langCode);
  });

  document.documentElement.lang = langCode;
}

switchButtons.forEach((button) => {
  button.addEventListener("click", () => {
    updateLanguage(button.dataset.lang);
  });
});

const revealWatcher = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.18 }
);

revealNodes.forEach((node) => revealWatcher.observe(node));

const navWatcher = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const activeId = `#${entry.target.id}`;
      navNodes.forEach((node) => {
        node.classList.toggle("active", node.getAttribute("href") === activeId);
      });
    });
  },
  { threshold: 0.5 }
);

sectionNodes.forEach((node) => navWatcher.observe(node));

if (spotlightNode) {
  window.addEventListener("pointermove", (event) => {
    spotlightNode.style.opacity = "1";
    spotlightNode.style.left = `${event.clientX}px`;
    spotlightNode.style.top = `${event.clientY}px`;
  });

  window.addEventListener("pointerleave", () => {
    spotlightNode.style.opacity = "0";
  });
}

document.getElementById("year-2").textContent = new Date().getFullYear();
updateLanguage("en");
