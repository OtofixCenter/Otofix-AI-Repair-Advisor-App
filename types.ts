
export enum VehicleCategory {
  CAR = 'Car',
  TRUCK = 'Truck',
  BUS = 'Bus',
  MOTORCYCLE = 'Motorcycle',
  SHIP = 'Ship',
  BICYCLE = 'Bicycle',
  SCOOTER = 'Scooter',
  DRONE = 'Drone',
  SMART_HOME = 'Smart Home Device',
  GARDEN_MACHINE = 'Vineyard/Garden Machine',
}
export type VehicleInfo = {
  type: string;
  brand: string;
  model: string;
  year: string;
};
