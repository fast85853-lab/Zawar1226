import type { PropertyType, HouseStyle } from "../types";

interface GenerateInput {
  title: string;
  location: string;
  propertyType: PropertyType;
  houseStyle: HouseStyle;
  price: string;
}

export function generatePropertyDescription(data: GenerateInput): string {
  return `Beautiful ${data.houseStyle} ${data.propertyType} located in ${
    data.location
  }. Offered at ${data.price}. Perfect for families and investors.`;
}
