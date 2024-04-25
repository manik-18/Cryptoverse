import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import CryptoCurrencies from "./components/CryptoCurrencies";
import CryptoDetails from "./components/CryptoDetails";
import News from "./components/News";
import Footer from "./components/Footer";
import Error404 from "./components/Error404";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/cryptocurrencies" element={<CryptoCurrencies />} />
        <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
        <Route exact path="/news" element={<News />} />
        <Route exact path="/*" element={<Error404 />} />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
