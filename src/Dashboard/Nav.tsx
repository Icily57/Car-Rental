import { Menu } from "lucide-react";
import { FaCalendarAlt, FaCreditCard, FaTicketAlt, FaUserCircle } from "react-icons/fa";
import { Link} from "react-router-dom";
import { useState } from "react";

function Nav() {
    // const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-base-200 shadow-md fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo / Branding */}
                <Link to="/" className="text-xl font-bold text-primary">
                    Enuma Car Rental
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6">
                    <li>
                        <Link to="/book" className="font-semibold hover:text-primary">Book</Link>
                    </li>
                    <li>
                        <Link to="bookings" className="flex items-center hover:text-primary">
                            <FaCalendarAlt className="mr-2" />
                            My Bookings
                        </Link>
                    </li>
                    <li>
                        <Link to="payments" className="flex items-center hover:text-primary">
                            <FaCreditCard className="mr-2" />
                            My Transactions
                        </Link>
                    </li>
                    <li>
                        <Link to="tickets" className="flex items-center hover:text-primary">
                            <FaTicketAlt className="mr-2" />
                            My Tickets
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" className="flex items-center hover:text-primary">
                            <FaUserCircle className="mr-2" />
                            My Profile
                        </Link>
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden btn btn-sm btn-primary"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <Menu />
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="md:hidden bg-base-200 shadow-lg absolute top-full left-0 w-full py-2">
                    <ul className="flex flex-col space-y-2 px-4">
                        <li>
                            <Link to="/book" className="block py-2 hover:text-primary" onClick={() => setMenuOpen(false)}>
                                Book
                            </Link>
                        </li>
                        <li>
                            <Link to="/bookings" className="flex items-center py-2 hover:text-primary" onClick={() => setMenuOpen(false)}>
                                <FaCalendarAlt className="mr-2" />
                                My Bookings
                            </Link>
                        </li>
                        <li>
                            <Link to="/transactions" className="flex items-center py-2 hover:text-primary" onClick={() => setMenuOpen(false)}>
                                <FaCreditCard className="mr-2" />
                                My Transactions
                            </Link>
                        </li>
                        <li>
                            <Link to="/tickets" className="flex items-center py-2 hover:text-primary" onClick={() => setMenuOpen(false)}>
                                <FaTicketAlt className="mr-2" />
                                My Tickets
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile" className="flex items-center py-2 hover:text-primary" onClick={() => setMenuOpen(false)}>
                                <FaUserCircle className="mr-2" />
                                My Profile
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default Nav;
