import React from 'react';
import { Info } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from './Contact';
import 'tailwindcss/tailwind.css';

const About: React.FC = () => {
  const staffData = [
    { name: 'John Doe', position: 'CEO', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Jane Smith', position: 'CTO', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { name: 'Jim Brown', position: 'CFO', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { name: 'Jill White', position: 'COO', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { name: 'Jack Black', position: 'CMO', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { name: 'Jenny Green', position: 'HR Manager', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { name: 'Jerry Blue', position: 'Lead Developer', image: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { name: 'Jessica Yellow', position: 'Product Manager', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { name: 'Jordan Purple', position: 'Sales Manager', image: 'https://randomuser.me/api/portraits/men/5.jpg' },
    { name: 'Joan Orange', position: 'Customer Support', image: 'https://randomuser.me/api/portraits/women/5.jpg' },
  ];

  const services = [
    { name: 'Wide Range of Vehicles', description: 'Choose from a variety of vehicles including sedans, SUVs, and luxury cars.' },
    { name: 'Flexible Booking Options', description: 'Book your vehicle for short-term or long-term rentals with flexible options.' },
    { name: '24/7 Customer Support', description: 'Get assistance anytime with our round-the-clock customer support service.' },
    { name: 'Easy Online Booking', description: 'Use our user-friendly online platform to book your vehicle quickly and easily.' },
    { name: 'Competitive Pricing', description: 'Enjoy affordable rates with no hidden fees or extra charges.' },
  ];

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-200 text-gray-800 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex items-center justify-center py-4 bg-blue-500 text-white">
            <Info className="w-8 h-8" />
            <h1 className="text-3xl font-extrabold ml-2">About Us</h1>
          </div>
          <div className="p-6">
            <p className="mb-4 text-gray-700">Welcome to our Vehicle Rental Management System. Our platform facilitates the efficient rental process of vehicles, ensuring a seamless experience for both administrators and customers. We offer a wide range of four-wheelers and two-wheelers to cater to your needs.</p>
            <p className="mb-4 text-gray-700">Our system is built using modern technologies such as React.js for the frontend, Hono and Drizzle for the backend, and PostgreSQL for data storage. We also integrate Stripe for secure payment processing.</p>
            <h2 className="text-2xl text-blue-600 font-bold mb-2">Our Features</h2>
            <ol className="list-decimal list-inside mb-4 bg-gray-200 p-4 rounded-lg">
              <li className="bg-gray-100 p-2 rounded mb-2 transition duration-300 ease-in-out transform hover:scale-105">User-friendly booking system</li>
              <li className="bg-gray-100 p-2 rounded mb-2 transition duration-300 ease-in-out transform hover:scale-105">Secure payment gateway</li>
              <li className="bg-gray-100 p-2 rounded mb-2 transition duration-300 ease-in-out transform hover:scale-105">Comprehensive admin dashboard</li>
              <li className="bg-gray-100 p-2 rounded mb-2 transition duration-300 ease-in-out transform hover:scale-105">Detailed reports and analytics</li>
              <li className="bg-gray-100 p-2 rounded mb-2 transition duration-300 ease-in-out transform hover:scale-105">Responsive user interface</li>
            </ol>
            <p className='font-semibold text-gray-700'>Thank you for choosing our platform. We strive to provide the best rental experience for all our users.</p>
            
            {/* Our Services Section */}
            <h2 className="text-2xl text-blue-600 font-bold my-4">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
            
            <h2 className="text-2xl text-blue-600 font-bold my-4">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {staffData.map((staff, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center transition duration-300 ease-in-out transform hover:scale-105">
                  <img src={staff.image} alt={staff.name} className="w-24 h-24 mx-auto rounded-full mb-2" />
                  <h3 className="text-lg font-bold text-gray-800">{staff.name}</h3>
                  <p className="text-gray-600">{staff.position}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Contact />
      </div>
      <Footer />
    </>
  );
};

export default About;
