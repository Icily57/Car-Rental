// import { cars, TCar } from '../components/dashboard/Bookings';

export interface AuthState {
    isAuthenticated: boolean;
    user: any;
    user_id: number | null;
    token: string | null;
}
export type FormValues = {
    id: number;
    email: string;
    full_name: string;
    contact_phone:string,
    address:string,
    role:string
    password: string;
  };

  export interface TicketState {
    tickets: string[];
    loading: boolean;
    error: string | null;
  }
  export interface Booking {
    id: number;
    car: TCar;
    customerName: string;
    bookingDate: string;
    returnDate: string;
    amount: number;
    status: string;
  }
  export interface TCar {
    manufacturer: string;
    model: string;
    year: string;
    fuel_type: string;
    engine_capacity: string;
    transmission: string;
    seating_capacity: string;
    color: string;
    rental_rate: string;
    availability: string;
    imageUrl: string;
  }

 export interface Car {
  vehicleSpec_id: number;
  manufacturer: string,
  model:string,
  year: number | string,
  fuel_type: string,
  engine_capacity: string,
  transmission: string,
  rental_rate: number,
  availability: string,
  color: string;
  booking_date: string;
  return_date: string;
  total_amount: number;
    imageUrl: string;
  }

 
export interface TicketFormInputs {
  subject: string;
  description: string;
  status: string;
}

export interface BookingFormInputs {
  booking_date: string;
  return_date: string;
  location_name: string;
}

export interface BookingResponse {
  id: number;
  booking_date: string;
  return_date: string;
  location_name: string;
  amount: number;
  user_id: number;
  vehicle_id: number;
  "msg": string;
}
export interface VehicleSpecsFormValues {
  manufacturer: string;
  model: string;
  year: number;
  fuel_type: string;
  features: string;
  engine_capacity: string;
  transmission: string;
  seating_capacity: number;
  color: string;
  imageUrl: string;
}
export interface VehicleForm {
  vehicleSpec_id: number;
  rental_rate: number;
}

 export interface VehicleSpecs {
  id: number;
  manufacturer: string;
  model: string;
  year: number;
  fuel_type: string;
  engine_capacity: string;
  transmission: string;
  seating_capacity: number;
  color: string;
  imageUrl: string;
}

export interface TicketFormInputs{
  user_id: number;
  subject: string;
  description: string;
  status: string;
}
  