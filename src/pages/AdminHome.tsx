import Analytics from "../components/adminDashboard/Analytics";
import AdminNavbar from "../components/AdminNavbar";
import Container from "../components/Container";
import Footer from "../components/Footer";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import Report from "../components/adminDashboard/Reports";

const AdminHome = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    console.log(user?.full_name);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white">
            <AdminNavbar />
            <Container className="flex flex-col gap-8 py-10 px-6">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                        Hello, {user?.full_name}!
                    </h1>
                    <p className="text-lg text-gray-300 mt-2">
                        Welcome to your Admin Management Dashboard
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gray-800 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300">
                        <Analytics />
                    </div>
                    <div className="p-6 bg-gray-800 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300">
                        <Report />
                    </div>
                </div>
            </Container>
            <Footer />
        </div>
    );
};

export default AdminHome;
