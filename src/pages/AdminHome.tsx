import Analytics from "../components/adminDashboard/Analytics";
import AdminNavbar from "../components/AdminNavbar";
import Container from "../components/Container";
import Footer from "../components/Footer";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
// import AdminDashboard from "./AdminDashboard";

const AdminHome = () => {
    const { user } = useSelector((state: RootState) => state.auth)

  return (
    <div >
      <Container className="bg-base-300 flex flex-col gap-6">
        <AdminNavbar />
        {/* <AdminDashboard/> */}
        <p className="text-gray-50 font-extrabold text-3xl">Hello {user.user.full_name},</p>
        <p className="text-gray-50 font-semibold text-2xl">Welcome to your Analysis page</p>
        <Analytics/>
      </Container>
        <Footer />
    </div>
  )
}

export default AdminHome;