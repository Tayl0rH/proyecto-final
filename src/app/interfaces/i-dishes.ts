export interface IDish {
  id?: string;
  name: string; // max 50
  description: string; // max200
  price: number; // positivo
  category: string;
  image?: string;
  enabled: boolean; // x defecto true
}
