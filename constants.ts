import { Step, DomainType } from './types';

export const STEPS: Step[] = [
  {
    id: 1,
    title: "Візит користувача",
    description: "Користувач заходить на Промо-сторінкою (Adult/Landing). Це небезпечне середовище. Він бачить кнопку 'Увійти через Google'.",
    activeDomain: DomainType.PROMO,
    highlightEdges: []
  },
  {
    id: 2,
    title: "Перенаправлення на 'Чистий домен'",
    description: "Натискання кнопки перекидає користувача на окремий безпечний домен (Clean Domain). Промо-сайт не має доступу до Google API напряму.",
    activeDomain: DomainType.PROMO,
    highlightEdges: ['promo-to-clean'],
    showDataPacket: {
      from: DomainType.PROMO,
      to: DomainType.CLEAN,
      label: "Redirect",
      isSecure: true
    }
  },
  {
    id: 3,
    title: "Запит авторизації",
    description: "'Чистий домен' формує правильне посилання для Google OAuth (з client_id) і відправляє користувача до Google.",
    activeDomain: DomainType.CLEAN,
    highlightEdges: ['clean-to-google'],
    showDataPacket: {
      from: DomainType.CLEAN,
      to: DomainType.GOOGLE,
      label: "OAuth Request",
      isSecure: true
    }
  },
  {
    id: 4,
    title: "Згода користувача (Google)",
    description: "Користувач знаходиться на серверах Google. Він вводить пароль і дає згоду. Промо-сайт цього не бачить.",
    activeDomain: DomainType.GOOGLE,
    highlightEdges: []
  },
  {
    id: 5,
    title: "Повернення коду (Callback)",
    description: "Google повертає користувача назад на 'Чистий домен' разом із тимчасовим кодом доступу (Auth Code).",
    activeDomain: DomainType.GOOGLE,
    highlightEdges: ['google-to-clean'],
    showDataPacket: {
      from: DomainType.GOOGLE,
      to: DomainType.CLEAN,
      label: "Auth Code",
      isSecure: true
    }
  },
  {
    id: 6,
    title: "Обмін токенами (Backend)",
    description: "Сервер 'Чистого домену' обмінює код на реальні токени доступу. Створюється безпечна сесія.",
    activeDomain: DomainType.CLEAN,
    highlightEdges: []
  },
  {
    id: 7,
    title: "Повернення на Промо",
    description: "'Чистий домен' перенаправляє користувача назад на Промо-сайт, додаючи одноразовий квиток (ticket). Токени не передаються!",
    activeDomain: DomainType.CLEAN,
    highlightEdges: ['clean-to-promo'],
    showDataPacket: {
      from: DomainType.CLEAN,
      to: DomainType.PROMO,
      label: "Ticket (One-time)",
      isSecure: true
    }
  },
  {
    id: 8,
    title: "Перевірка квитка",
    description: "Промо-сайт автоматично запитує 'Чистий домен': 'Цей квиток дійсний?'.",
    activeDomain: DomainType.PROMO,
    highlightEdges: ['promo-req-clean'],
    showDataPacket: {
      from: DomainType.PROMO,
      to: DomainType.CLEAN,
      label: "Verify API",
      isSecure: true
    }
  },
  {
    id: 9,
    title: "Вхід успішний",
    description: "'Чистий домен' підтверджує вхід. Промо-сайт авторизує користувача. Дані користувача в безпеці.",
    activeDomain: DomainType.PROMO,
    highlightEdges: ['clean-res-promo'],
    showDataPacket: {
      from: DomainType.CLEAN,
      to: DomainType.PROMO,
      label: "OK (Session confirmed)",
      isSecure: true
    }
  }
];