import React from "react";
import Container from "../Container/Container";

const Banner = () => {
  return (
    <section>
      <div
        className="bg-cover  md:h-[500px] h-[300px] flex items-center"
        style={{
          backgroundImage:
            "linear-gradient(51deg, #000 0%, rgba(0, 95, 172, 0) 100%), url('https://dailyindustry.news/wp-content/uploads/2023/07/Mobile-phone-production-in-.gif')",
        }}
      >
        <Container>
          <div className="flex flex-col justify-center items-start w-full h-full px-6 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Always Keep a <br /> Positive Mindset
            </h2>
            <button className="primaryButton">
              Call Now
            </button>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Banner;
