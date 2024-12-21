import React from "react";
import Banner from "../Components/Home/Banner";
import FeatureProducts from "../Components/Home/FeatureProducts";
import Testimonials from "../Components/Home/Testimonials/Testimonials";
import Faqs from "../Components/Home/Faqs";
import ContactInfo from "../Components/Home/ContactInfo";
import Brands from "../Components/Home/Brands";

const Home = () => {
  return (
    <div className="md:pt-12 pt-14 space-y-16">
      <Banner />
      <FeatureProducts />
      <Brands />
      <Faqs/>
      <Testimonials />
      <ContactInfo/>
    </div>
  );
};

export default Home;
