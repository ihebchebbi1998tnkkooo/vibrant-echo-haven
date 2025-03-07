
export interface Product {
  id: string;
  name: string;
  description: string;
  startingPrice: string;
  image?: string;
  presentationImage?: string;
  category: string;
  type: string;
  metier_type: string;
  isPersonalizable?: boolean;
  availableColors?: string[];
}
