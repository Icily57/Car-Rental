import Layout from "../Dashboard/Layout";
import Footer from "../components/Footer";
import Nav from "../Dashboard/Nav";

export default function Dashboard() {
    return (
        <div className="h-screen">
            <Nav />
            <Layout />
            <Footer />
        </div>

    );
}  