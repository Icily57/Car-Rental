import Benefit1 from '../assets/images/display1.jpg';
import { Link } from 'react-router-dom';

export default function Hero() {
    return (
      <div className="hero h-fit mb-20">
      <div className="hero-content grid md:grid-cols-2 sm:gap-5">
        <div>
          <h1 className="text-5xl font-bold">Want to drive or be in your dream car but can't afford to buy?</h1>
          <p className="py-6">
           Enuma Car Rental Services got you covered. We offer you the best affordable car rental services. We ensure that we make your dream come true by providing you with the easy and seamless process of having your dream car, even if for a while😉.
          </p>
          <Link to="/register">
            <button className="btn btn-outline btn-info">Start your journey</button>
          </Link>
        </div>
        <img src={Benefit1} className="max-w-sm rounded-lg shadow-2xl" />
      </div>
    </div>
      );
      
}