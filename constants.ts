import { VehicleCategory } from './types';

type VehicleData = {
  [key in VehicleCategory]?: {
    [brand: string]: {
      [model: string]: number[];
    };
  };
};

const years_car = [2024, 2023, 2022, 2021, 2020];
const years_motorcycle = [2024, 2023, 2022, 2021];

export const VEHICLE_DATA: VehicleData = {
  [VehicleCategory.CAR]: {
    'Acura': { 'MDX': years_car, 'RDX': years_car, 'TLX': years_car },
    'Audi': { 'A4': years_car, 'A6': years_car, 'Q5': years_car, 'Q7': years_car },
    'BMW': { '3 Series': years_car, '5 Series': years_car, 'X3': years_car, 'X5': years_car },
    'Buick': { 'Encore': years_car, 'Enclave': years_car, 'Envision': years_car },
    'Cadillac': { 'Escalade': years_car, 'XT5': years_car, 'CT5': years_car },
    'Chevrolet': { 'Silverado': years_car, 'Equinox': years_car, 'Tahoe': years_car, 'Camaro': years_car },
    'Dodge': { 'Charger': years_car, 'Challenger': years_car, 'Durango': years_car },
    'Ford': { 'F-150': years_car, 'Mustang': years_car, 'Explorer': years_car, 'Escape': years_car, 'Bronco': years_car },
    'GMC': { 'Sierra 1500': years_car, 'Yukon': years_car, 'Acadia': years_car },
    'Honda': { 'Civic': years_car, 'Accord': years_car, 'CR-V': years_car, 'Pilot': years_car },
    'Hyundai': { 'Elantra': years_car, 'Sonata': years_car, 'Tucson': years_car, 'Santa Fe': years_car },
    'Jeep': { 'Wrangler': years_car, 'Grand Cherokee': years_car, 'Cherokee': years_car },
    'Kia': { 'Forte': years_car, 'Sorento': years_car, 'Telluride': years_car },
    'Lexus': { 'RX': years_car, 'NX': years_car, 'ES': years_car },
    'Mazda': { 'Mazda3': years_car, 'CX-5': years_car, 'CX-9': years_car },
    'Mercedes-Benz': { 'C-Class': years_car, 'E-Class': years_car, 'GLC': years_car },
    'Nissan': { 'Altima': years_car, 'Rogue': years_car, 'Titan': years_car },
    'Ram': { '1500': years_car, '2500': years_car, '3500': years_car },
    'Subaru': { 'Outback': years_car, 'Forester': years_car, 'Crosstrek': years_car },
    'Tesla': { 'Model 3': years_car, 'Model Y': years_car, 'Model S': years_car, 'Model X': years_car },
    'Toyota': { 'Camry': years_car, 'Corolla': years_car, 'RAV4': years_car, 'Highlander': years_car },
    'Volkswagen': { 'Jetta': years_car, 'Tiguan': years_car, 'Golf': years_car },
    'Volvo Cars': { 'XC90': years_car, 'XC60': years_car, 'S60': years_car },
  },
  [VehicleCategory.TRUCK]: {
    'Volvo': { 'VNL': [2024, 2023, 2022], 'VHD': [2024, 2023, 2022] },
    'Freightliner': { 'Cascadia': [2024, 2023, 2022], 'M2 106': [2024, 2023, 2022] },
    'Kenworth': { 'T680': [2024, 2023, 2022], 'W900': [2024, 2023, 2022] },
    'Peterbilt': { '579': [2024, 2023, 2022], '389': [2024, 2023, 2022] },
    'Mack': { 'Anthem': [2024, 2023, 2022], 'Pinnacle': [2024, 2023, 2022] },
    'International': { 'Lonestar': [2024, 2023, 2022], 'LT Series': [2024, 2023, 2022] },
  },
  [VehicleCategory.MOTORCYCLE]: {
    'Aprilia': { 'RS 660': years_motorcycle, 'Tuono V4': years_motorcycle, 'RSV4': years_motorcycle },
    'BMW Motorrad': { 'R 1250 GS': years_motorcycle, 'S 1000 RR': years_motorcycle, 'F 850 GS': years_motorcycle },
    'Ducati': { 'Panigale V4': years_motorcycle, 'Monster': years_motorcycle, 'Multistrada V4': years_motorcycle },
    'Harley-Davidson': { 'Sportster': years_motorcycle, 'Softail': years_motorcycle, 'Touring': years_motorcycle },
    'Honda Powersports': { 'CBR1000RR': years_motorcycle, 'Africa Twin': years_motorcycle, 'Grom': years_motorcycle },
    'Husqvarna': { 'Svartpilen 401': years_motorcycle, 'Vitpilen 701': years_motorcycle, 'Norden 901': years_motorcycle },
    'Indian Motorcycle': { 'Scout': years_motorcycle, 'Chief': years_motorcycle, 'Chieftain': years_motorcycle },
    'Kawasaki': { 'Ninja 400': years_motorcycle, 'Ninja ZX-10R': years_motorcycle, 'Z900': years_motorcycle },
    'KTM': { '390 Duke': years_motorcycle, '1290 Super Duke R': years_motorcycle, '890 Adventure': years_motorcycle },
    'Moto Guzzi': { 'V7': years_motorcycle, 'V85 TT': years_motorcycle },
    'MV Agusta': { 'Brutale 800': years_motorcycle, 'F3': years_motorcycle },
    'Royal Enfield': { 'Classic 350': years_motorcycle, 'Himalayan': years_motorcycle, 'Interceptor 650': years_motorcycle },
    'Suzuki': { 'GSX-R1000': years_motorcycle, 'Hayabusa': years_motorcycle, 'V-Strom 650': years_motorcycle },
    'Triumph': { 'Street Triple': years_motorcycle, 'Bonneville T120': years_motorcycle, 'Tiger 900': years_motorcycle },
    'Yamaha': { 'MT-07': years_motorcycle, 'MT-09': years_motorcycle, 'YZF-R1': years_motorcycle },
    'Zero Motorcycles': { 'SR/S': years_motorcycle, 'DSR': years_motorcycle },
  },
  [VehicleCategory.BICYCLE]: {
    'Trek': { 'Marlin': [2024, 2023], 'Domane': [2024, 2023] },
    'Specialized': { 'Rockhopper': [2024, 2023], 'Allez': [2024, 2023] },
    'Giant': { 'Talon': [2024, 2023], 'Contend': [2024, 2023] },
    'Cannondale': { 'Trail': [2024, 2023], 'Synapse': [2024, 2023] },
    'Santa Cruz': { 'Tallboy': [2024, 2023], 'Nomad': [2024, 2023] },
  }
};
