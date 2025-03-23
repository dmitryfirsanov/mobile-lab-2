export interface Dish {
  id: number;
  name: string;
  price: number;
  image: any;
  description: string;
}

export const dishes: Dish[] = [
  {
    id: 1,
    name: "Пицца Маргарита",
    price: 1169,
    image: require("@/assets/images/placeholder.svg"),
    description: "Классическая пицца с томатным соусом, моцареллой и базиликом",
  },
  {
    id: 2,
    name: "Паста Карбонара",
    price: 1349,
    image: require("@/assets/images/placeholder.svg"),
    description: "Сливочная паста с панчеттой, яйцами и сыром пармезан",
  },
  {
    id: 3,
    name: "Салат Цезарь",
    price: 899,
    image: require("@/assets/images/placeholder.svg"),
    description: "Свежий салат ромэн с гренками, пармезаном и соусом Цезарь",
  },
  {
    id: 4,
    name: "Лосось на гриле",
    price: 1709,
    image: require("@/assets/images/placeholder.svg"),
    description: "Филе лосося на гриле с лимоном и травами",
  },
  {
    id: 5,
    name: "Шоколадный торт",
    price: 719,
    image: require("@/assets/images/placeholder.svg"),
    description: "Насыщенный шоколадный торт с жидкой начинкой",
  },
];
