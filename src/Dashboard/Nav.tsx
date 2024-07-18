import {   Menu } from "lucide-react"
import { Link } from "react-router-dom"

export default function Nav() {
    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">
                <label htmlFor="my-drawer" className="md:hidden lg:hidden  btn btn-sm btn-primary drawer-button ">
                    <Menu />
                </label>
            </div>
            <div className="drawer-side z-50">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 rounded-box min-w-fit gap-2 text-base-content min-h-full">
                <li>
                <Link to="">Me</Link>
            </li>
                <li> <Link to="bookings">Bookings</Link></li>
            <li>
                {/* <details open > */}
                    {/* <summary >Menu</summary> */}
                    <ul className="flex flex-col">
                        <li> <Link to="bookings">Bookings</Link></li>
                        <li> <Link to="payments">Payments</Link></li>
                        <li> <Link to="tickets">Tickets</Link></li>
                    </ul>
                {/* </details> */}
            </li>
                    <li>
                    </li>
                </ul>
            </div>
        </div>
    )
}
