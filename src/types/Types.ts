// import { cars, TCar } from '../components/dashboard/Bookings';

export interface AuthState {
    isAuthenticated: boolean;
    user: any;
    token: string | null;
}
export type FormValues = {
    email: string;
    full_name: string;
    contact_phone:string,
    address:string,
    role:string
    password: string;
  };

  // export interface TUser {
  //   FullName: string;
  //   Email: string;
  //   Contact: number;
  //   Password: string;
  //   Address: string;
  // }
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
    // imageUrl: string;
  }

 
  