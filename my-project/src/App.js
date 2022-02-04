import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import HeroSection from "./components/Hero/HeroSection.js";
import Body from "./components/Body/Body";
import EachHouse from "./components/Body/HouseShowcase/House/EachHouse/EachHouse";

function App() {
  return (
    <>
      <Header />
      {/*
      <HeroSection />
      <Body /> */}
      <EachHouse />
      <Footer />
    </>
  );
}

export default App;
