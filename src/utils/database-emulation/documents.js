export const DOCUMENTS = [
  {
    id: 1,
    type: 'category',
    name: 'Обязательные для всех',
    description: 'Документы, обязательные для всех сотрудников без исключения',
    opened: false,
    statuses: ['a', 'b', 'c'],
    data: [
      {
        id: 1,
        type: 'document-item',
        name: 'Паспорт',
        require: true,
        forAll: true,
        description: 'Для всех',
        statuses: ['d'],
      },
      {
        id: 2,
        type: 'document-item',
        name: 'ИНН',
        require: true,
        description: 'Для всех',
      },
    ],
  },
  {
    id: 2,
    type: 'category',
    opened: false,
    name: 'Обязательные для трудоустройства',
    description: 'Документы, без которых невозможно трудоустройство человека на какую бы то ни было должность в компании вне зависимости от граж',
    data: [],
  },
  {
    id: 3,
    type: 'category',
    opened: false,
    name: 'Специальные',
    data: [],
  },
  {
    id: 4,
    type: 'document-item',
    name: 'Тестовое задание',
    description: 'Россия, Белоруссия, Украина, администратор филиала, повар-сушист, повар-пиццмейкер, повар горячего цеха',
  },
  {
    id: 5,
    type: 'document-item',
    name: 'Трудовой договор',
    statuses: ['e', 'f'],
  },
  {
    id: 6,
    type: 'document-item',
    name: 'Мед. книжка',
  }
];
