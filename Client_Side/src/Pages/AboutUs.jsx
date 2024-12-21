import React from "react";
import Container from "../Components/Container/Container";

const AboutUs = () => {
  return (
    <div className="pt-16">
      <Container>
        <h2 className="text-2xl md:text-3xl font-semibold text-center">
          About Us
        </h2>
        <p className="text-gray-800  text-center">
          Welcome to Mobile shop, where innovation meets creativity.
        </p>
        <div className="py-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img
                  src="https://i.ibb.co.com/JKprtBr/about.jpg"
                  alt="About Us"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>

              <div className="md:w-1/2">
                <h3 className="text-2xl font-semibold text-black mb-2">
                  Who We Are
                </h3>
                <p className="text-base text-gray-600 mb-7">
                  We are a passionate team dedicated to providing the best
                  products and services to our customers. Our goal is to create
                  a seamless and enjoyable shopping experience for everyone.
                </p>
                <h3 className="text-2xl font-semibold text-black mb-2">
                  Our Mission
                </h3>
                <p className="text-base text-gray-600 mb-7">
                  Our mission is to revolutionize the shopping experience by
                  offering top-notch products, exceptional customer service, and
                  fast delivery. We aim to be your go-to destination for all
                  your shopping needs.
                </p>
                <h3 className="text-2xl font-semibold text-black mb-2">
                  Our Values
                </h3>
                <p className="text-base text-gray-600">
                  We believe in integrity, quality, and customer satisfaction.
                  Our team strives to innovate and improve continuously,
                  ensuring that our customers receive the best possible
                  experience every time they shop with us .
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <h3 className="text-2xl font-semibold text-black mb-4">
                Join Us on Our Journey
              </h3>
              <p className="text-lg text-gray-700">
                We are always striving to improve and innovate. Follow us on
                social media and stay up to date with our latest offerings.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
