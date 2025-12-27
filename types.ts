
export enum PropertyType {
  RENT = 'Rent',
  SALE = 'Sale'
}

export enum HouseStyle {
  SINGLE_STORY = 'Single Story',
  DOUBLE_STORY = 'Double Story'
}

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  country: string;
  city: string;
  area: string;
  style: HouseStyle;
  bedrooms: number;
  bathrooms: number;
  hasGas: boolean;
  hasElectricity: boolean;
  phoneNumber: string;
  whatsappNumber: string;
  images: string[]; // Kept in interface for compatibility, but UI will hide upload
  price: string;
  currency: string;
  language: string;
  description?: string;
  createdAt: number;
}

export type ViewType = 'home' | 'post' | 'profile' | 'settings' | 'privacy' | 'about';
