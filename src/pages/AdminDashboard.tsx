import AdminLayout from "../Dashboard/AdminLayout";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";

export default function AdminDashboard() {
    return (
        <div className="h-screen">
            <AdminNavbar />
            <AdminLayout/>
            <Footer />
        </div>

    );
}  