import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Footer from "./footer/footer";
import Navbar from "./navbar/navbar";
import Home from "./pages/homepage";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
