import Analytics from "../components/adminDashboard/Analytics";
import AdminNavbar from "../components/AdminNavbar";
import Container from "../components/Container";
import Footer from "../components/Footer";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import Report from "../components/adminDashboard/Reports";
// import AdminDashboard from "./AdminDashboard";

const AdminHome = () => {
    const { user } = useSelector((state: RootState) => state.auth)

  return (
    <div >
        <AdminNavbar />
      <Container className="bg-blue-100 flex flex-col gap-6">
        {/* <AdminDashboard/> */}
        <p className="text-black font-extrabold text-3xl">Hello {user.user.full_name},</p>
        <p className="text-black font-semibold text-2xl">Welcome to your Management page</p>
        <Analytics/>
        <Report/>
      </Container>
        <Footer />
    </div>
  )
}

export default AdminHome;