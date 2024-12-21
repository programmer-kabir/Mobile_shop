import React from "react";
import Banner from "../Components/Home/Banner";
import FeatureProducts from "../Components/Home/FeatureProducts";
import Testimonials from "../Components/Home/Testimonials/Testimonials";

const Home = () => {
  return (
    <div className="md:pt-12 pt-14 space-y-16">
      <Banner />
      <FeatureProducts />
      <Testimonials />
    </div>
  );
};

export default Home;
