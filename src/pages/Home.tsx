import Navbar from "../components/Navbar"
import Container from "../components/Container"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Benefits from "../components/Benefits"
import { benefitOne } from "../utils/data"
import Fleet from "./Fleet"
const Home = () => {
  return (
    <div>
        <Navbar />
      <Container className="bg-blue-100 text-black flex flex-col gap-6">
        <Hero/>
        <Fleet/>
        <Benefits data={benefitOne} /> 
      </Container>
        <Footer />
    </div>
  )
}

export default Home