import Navbar from "../components/Navbar"
import Container from "../components/Container"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Benefits from "../components/Benefits"
import { benefitOne } from "../utils/data"
const Home = () => {
  return (
    <div>
      <Container className="bg-base-300 flex flex-col gap-6">
        <Navbar />
        <Hero/>
        <Benefits data={benefitOne} /> 
        <Footer />
      </Container>
    </div>
  )
}

export default Home