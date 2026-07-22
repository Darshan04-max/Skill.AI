import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Skills from "../components/Skills";
import Roadmap from "../components/Roadmap";
import Pricing from "../components/Pricing";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Skills />
      <Roadmap />
      <Pricing />
      <Stats />
      <Testimonials />
       <FAQ />
       <Newsletter />
     <Footer />
    </>
  );
}

export default Home;