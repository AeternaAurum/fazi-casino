export interface Casino {
  _id: string;
  name: string;
  category: string;
  decription: string;
  devices: [
    { x: number; y: number; orientation: number; appratusType: string }
  ];
}
