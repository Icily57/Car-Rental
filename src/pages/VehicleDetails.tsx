import React from 'react';
import { useNavigate } from 'react-router-dom';
import Car1 from '../assets/images/Car1.jpg'
import Car2 from '../assets/images/Car2.jpg'
import Car3 from '../assets/images/Car3.jpg'
import Car4 from '../assets/images/Car4.jpg'
import Car5 from '../assets/images/Car5.jpg'
import Car6 from '../assets/images/Car6.jpg'
import Car7 from '../assets/images/Car7.jpg'
import Car8 from '../assets/images/Car8.jpg'
import Car9 from '../assets/images/Car9.jpg'

interface Car {
  vehicleSpec_id: number;
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

const dummyCars: Car[] = [
  {
    vehicleSpec_id: 1,
    manufacturer: 'Toyota',
    model: 'Landcruiser 300',
    year: '2023',
    fuel_type: 'Gasoline',
    engine_capacity: '2.5L',
    transmission: 'Automatic',
    seating_capacity: '5',
    color: 'White',
    rental_rate: '$50/day',
    availability: 'Available',
    imageUrl: `url(${Car1})`
  },
  {
    vehicleSpec_id: 2,
    manufacturer: 'Jaguar Land Rover',
    model: 'Land Rover Range Rover Velar',
    year: '2020',
    fuel_type: 'Gasoline',
    engine_capacity: '2.0L',
    transmission: 'Automatic',
    seating_capacity: '5',
    color: 'Black',
    rental_rate: '$45/day',
    availability: 'Available',
    imageUrl: `url(${Car2})`
  },
  {
    vehicleSpec_id: 3,
    manufacturer: 'Toyota',
    model: 'Rav4',
    year: '2013',
    fuel_type: 'Gasoline',
    engine_capacity: '5.0L',
    transmission: 'Manual',
    seating_capacity: '4',
    color: 'Coffee Brown',
    rental_rate: '$80/day',
    availability: 'Available',
    imageUrl: `url(${Car3})`
  },
  {
    vehicleSpec_id: 4,
    manufacturer: 'Lexus',
    model: 'Super Sport',
    year: '2010',
    fuel_type: 'Gasoline',
    engine_capacity: '5.3L',
    transmission: 'Automatic',
    seating_capacity: '7',
    color: 'Blue',
    rental_rate: '$90/day',
    availability: 'Available',
    imageUrl: `url(${Car4})`
  },
  {
    vehicleSpec_id: 5,
    manufacturer: 'Toyota',
    model: 'Landcruiser V8',
    year: '2014',
    fuel_type: 'Gasoline',
    engine_capacity: '2.0L',
    transmission: 'Automatic',
    seating_capacity: '5',
    color: 'Silver',
    rental_rate: '$100/day',
    availability: 'Available',
    imageUrl: `url(${Car5})`
  },
  {
    vehicleSpec_id: 6,
    manufacturer: 'Suzuki',
    model: 'Wagon R',
    year: '2014',
    fuel_type: 'Gasoline',
    engine_capacity: '2.0L',
    transmission: 'Automatic',
    seating_capacity: '5',
    color: 'White',
    rental_rate: '$95/day',
    availability: 'Available',
    imageUrl: `url(${Car6})`
  },
  {
    vehicleSpec_id: 7,
    manufacturer: 'Mercedes-Benz',
    model: 'C-Class',
    year: '2019',
    fuel_type: 'Gasoline',
    engine_capacity: '2.0L',
    transmission: 'Automatic',
    seating_capacity: '5',
    color: 'Blue',
    rental_rate: '$110/day',
    availability: 'Available',
    imageUrl: `url(${Car7})`
  },
  {
    vehicleSpec_id: 8,
    manufacturer: 'Peugeot',
    model: '208',
    year: '2017',
    fuel_type: 'Electric',
    engine_capacity: 'N/A',
    transmission: 'Automatic',
    seating_capacity: '5',
    color: 'White',
    rental_rate: '$120/day',
    availability: 'Available',
    imageUrl: `url(${Car8})`
  },
  {
    vehicleSpec_id: 9,
    manufacturer: 'Toyota',
    model: 'Fielder Hybrid',
    year: '2013',
    fuel_type: 'Gasoline',
    engine_capacity: '2.5L',
    transmission: 'Automatic',
    seating_capacity: '5',
    color: 'Silver',
    rental_rate: '$55/day',
    availability: 'Available',
    imageUrl: `url(${Car9})`
  },
//   {
//     vehicleSpec_id: 10,
//     manufacturer: 'Nissan',
//     model: 'March',
//     year: '2014',
//     fuel_type: 'Gasoline',
//     engine_capacity: '2.0L',
//     transmission: 'Automatic',
//     seating_capacity: '5',
//     color: 'Black',
//     rental_rate: '$40/day',
//     availability: 'Available',
//     imageUrl: 'https://media.autochek.africa/file/w_750,q_75/JWcWfcAh.webp'
//   }
];

const Explore: React.FC = () => {
  const navigate = useNavigate();

  const handleBookingClick = (carId: number) => {
    navigate(`/dashboard/Booking/${carId}`);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Vehicle Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyCars.map(car => (
          <div key={car.vehicleSpec_id} className="card shadow-xl">
            <figure>
              <img src={car.imageUrl} alt={`${car.manufacturer} ${car.model}`} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{`${car.manufacturer} ${car.model}`}</h2>
              <p><strong>Year:</strong> {car.year}</p>
              <p><strong>Fuel Type:</strong> {car.fuel_type}</p>
              <p><strong>Engine Capacity:</strong> {car.engine_capacity}</p>
              <p><strong>Transmission:</strong> {car.transmission}</p>
              <p><strong>Seating Capacity:</strong> {car.seating_capacity}</p>
              <p><strong>Color:</strong> {car.color}</p>
              <p><strong>Rental Rate:</strong> {car.rental_rate}</p>
              <p><strong>Availability:</strong> {car.availability}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={() => handleBookingClick(car.vehicleSpec_id)}>Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
