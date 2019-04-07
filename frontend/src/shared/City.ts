import { Casino } from './Casino';
export interface City {
  _id: string;
  name: string;
  description: string;
  image: string;
  casinos: [string];
}
