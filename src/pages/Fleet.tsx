import React from 'react';
import Car1 from '../assets/images/car.jpg';
import Car2 from '../assets/images/Car1.jpg';
import Car3 from '../assets/images/Car2.jpg';
import Car4 from '../assets/images/Car3.jpg';
import Car5 from '../assets/images/Car4.jpg';
import Car6 from '../assets/images/Car5.jpg';
import Car7 from '../assets/images/Car6.jpg';
import Car8 from '../assets/images/Car7.jpg';
import Car9 from '../assets/images/Car8.jpg';
import Car10 from '../assets/images/Car9.jpg';

interface VehicleSpecs {
  manufacturer: string;
  model: string;
  year: string;
  imageUrl: string; 
}

// Dummy data with local image paths
const dummyCars: VehicleSpecs[] = [
  { manufacturer: 'Toyota', model: 'Camry', year: '2023', imageUrl:Car1,},
  { manufacturer: 'Honda', model: 'Civic', year: '2022', imageUrl:Car2,},
  { manufacturer: 'Ford', model: 'Mustang', year: '2021',  imageUrl:Car3,},
  { manufacturer: 'Chevrolet', model: 'Malibu', year: '2023', imageUrl:Car4,},
  { manufacturer: 'BMW', model: 'X5', year: '2020',  imageUrl:Car5,},
  { manufacturer: 'Audi', model: 'A4', year: '2022', imageUrl:Car6,},
  { manufacturer: 'Mercedes', model: 'C-Class', year: '2021', imageUrl:Car7,},
  { manufacturer: 'Hyundai', model: 'Elantra', year: '2023', imageUrl:Car8,},
  { manufacturer: 'Kia', model: 'Optima', year: '2020', imageUrl:Car9,},
  { manufacturer: 'Nissan', model: 'Altima', year: '2022', imageUrl:Car10,},
];

const Fleet: React.FC = () => {
  return (
    <div className="container mx-auto py-8 bg-gradient-to-r from-blue-100 to-blue-200">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">Our Fleet</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
        {dummyCars.map((car, index) => (
          <div key={index} className="card shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <img
              src={car.imageUrl}
              alt={`${car.manufacturer} ${car.model}`}
              className="card-image rounded-t-lg"
            />
            <div className="card-body bg-white p-4">
              <h2 className="card-title text-xl font-bold text-gray-800 mb-2">{`${car.manufacturer} ${car.model}`}</h2>
              <p className="text-gray-700"><strong>Year:</strong> {car.year}</p>              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fleet;
