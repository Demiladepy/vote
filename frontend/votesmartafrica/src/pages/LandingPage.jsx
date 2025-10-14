import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import About from "../components/About";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Impact from "../components/Impact";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="bg-gray-50 text-gray-900">
      <Navbar />
      <HeroSection />
      <About />
      <Features />
      <HowItWorks />
      <Impact />
      <Footer />
    </div>
  );
};

export default LandingPage;
