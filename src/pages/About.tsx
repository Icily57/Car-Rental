import React from 'react';
import { Info } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from './Contact';

const About: React.FC = () => {
  return (
    <>
    <Navbar />
    <div className="p-6 bg-cyan-200 text-base-content">
      <div className="max-w-4xl mx-auto bg-cyan-200">
        <div className="flex items-center mb-4">
          <Info className="w-6 h-6 text-primary" />
          <h1 className="text-2xl text-white text-center font-extrabold ml-2">About Us</h1>
        </div>
        <p className="mb-4">Welcome to our Vehicle Rental Management System. Our platform facilitates the efficient rental process of vehicles, ensuring a seamless experience for both administrators and customers. We offer a wide range of four-wheelers and two-wheelers to cater to your needs.</p>
        <p className="mb-4">Our system is built using modern technologies such as React.js for the frontend, Hono and Drizzle for the backend, and PostgreSQL for data storage. We also integrate Stripe for secure payment processing.</p>
        <br/>
        {/* <div className="flex items-stretch mb-4"> */}
        <h2 className="text-xl font-bold mb-2">Our Features</h2>
        <br/>
        <ol className="list-disc list-inside mb-4">
          <li>User-friendly booking system</li>
          <br/>
          <li>Secure payment gateway</li>
          <br/>
          <li>Comprehensive admin dashboard</li>
          <br/>
          <li>Detailed reports and analytics</li>
          <br/>
          <li>Responsive user interface</li>
        </ol>
        {/* </div> */}
        <br/>
        <p className='font-semibold'>Thank you for choosing our platform. We strive to provide the best rental experience for all our users.</p>
   </div>
      <Contact />
    </div>
    <Footer />
    </>
  );
};

export default About;
