
export enum Category {
  PUBLIC = 'Instituições Públicas',
  EDUCATION = 'Educação',
  HEALTH = 'Saúde',
  COMMERCE = 'Comércio e Serviços',
  LEISURE = 'Lazer e Cultura'
}

export enum FeedType {
  NEWS = 'Notícia',
  SALE = 'Venda',
  EVENT = 'Evento',
  UTILITY = 'Utilidade Pública'
}

export interface Institution {
  id: string;
  name: string;
  category: Category;
  description: string;
  address: string;
  phone: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  type: FeedType;
  title: string;
  content: string;
  timestamp: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}
