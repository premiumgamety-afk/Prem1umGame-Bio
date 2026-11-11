/* ============================================================
   config.js: личные данные сайта. Меняй только этот файл.
   Картинки и музыка указываются относительно твоей страницы.
   ============================================================ */
window.SITE = {
  lang: 'ru',
  title: 'Prem1umGame | portfolio',
  favicon: 'assets/favicon.svg',

  nick: 'Prem1umGame',
  logo: 'Prem1umGame solution',
  role: 'Backend',
  hero: 'Йоу, рад видеть! Всё, что ты видишь, — результат работы нейросетей и моей фантазии. Я не просто экспериментировал — я создал проекты, которые реально приносят деньги. Мир стремительно меняется, и будущее принадлежит тем, кто умеет использовать нейросети.',
  telegram: 'https://t.me/the_css',

  // анимация названия вкладки (поставь false, чтобы отключить)
  titleAnimation: 'Prem1umGame bio',
  // защита от копирования текста и картинок (false: отключить)
  protect: true,

  about: {
    intro: 'Если бы мне сказали описать себя в 40 словах, я бы сказал так:',
    text: 'Я всего лишь в 6-м классе, но уже добился для себя значимого результата. Пока кто-то тратит время на игры, я придумываю новые идеи и превращаю их в прибыль. Успеваю совмещать отличную учёбу с проектами и всегда нахожу время, чтобы создавать что-то своё.',
    avatar: 'assets/avatar.png'
  },

  // Minecraft-сервер (онлайн показывается в карточке)
  server: {
    host: 'ragehvh.my.to:24601',
    display: 'RageHvH.mooo.com'
  },

  music: {
    src: 'assets/meant-to-be.mp3',
    title: 'Meant to Be',
    artist: 'Cuntsniffer',
    cover: 'assets/cover.png'
  },

  // Discord через Lanyard (нужно зайти на сервер discord.gg/lanyard)
  discord: {
    id: '1315925668403482644',
    name: 'Prem1umGame 🥀',
    username: '@the_css',
    avatar: 'assets/avatar.png'
  },

  projectsIntro: 'Уже давно занимаюсь проектами на Minecraft, Discord, Сайты, также делаю свои программы. Все проекты сделаны полностью мной',
  // tags: 'owner' (Владелец), 'design' (Дизайн), 'coder' (Кодер) или любой свой текст
  projects: [
    { name: 'RageHvH', url: 'https://rageshop.my.to', domain: 'rageshop', tld: '.my.to',
      color: '#ff4040', icon: 'assets/rage.png', tags: ['owner', 'coder'] },
    { name: 'Prem1umGame Bio', url: 'https://zow.my.to', domain: 'zow', tld: '.my.to',
      color: '#ff9af5', icon: 'assets/favicon.svg', tags: ['owner', 'design', 'coder'] },
    { name: 'TheKosti23 Bio', url: 'https://zow.mooo.com', domain: 'zovv', tld: '.my.to',
      color: '#FF45EC', icon: 'assets/kosti.svg', tags: ['co-owner', 'design', 'coder'] }
  ],

  // иконки навыков: короткое имя берётся из assets основного сайта (java, python, node, go, mysql, ts, next, html, css),
  // либо укажи свой путь, например 'assets/rust.svg'
  skills: {
    intro: 'Честно говоря, я пока знаю лишь совсем немного языков программирования. Зато хорошо освоил prompt-engineering для различных типов нейросетей. В работе использую Java, Python и Node.js на бэкенде, а также Next.js с TypeScript на фронтенде.',
    backend: {
      text: 'Разрабатываю эффективные backend-системы с акцентом на стабильность, отказоустойчивость и простоту интеграции в существующую инфраструктуру.',
      chips: [['Java','java'],['Python','python'],['C++','c++'],['Lua','lua']]
    },
    frontend: {
      text: 'Работаю с фронтендом, но больше всего вдохновляюсь не кодом, а дизайном — люблю превращать идеи в удобные и красивые интерфейсы, которые приятно использовать.',
      chips: [['HTML','html'],['CSS','css']]
    }
  },

  footer: {
    logo: 'zow.my.to | Prem1umGame solutions',
    note: 'Весь этот сайт сделала нейросеть, за исключением дизайна, вдохновился у zov.wtf'
  }
};
