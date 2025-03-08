import { useState, useEffect } from "react";
import Title from "./Title"; // Ensure the Title component exists
import Refund from "/arrow-left-right.svg"; // Adjust the path as needed
import Call from "/contact.svg";
import Trust from "/book-open-check.svg";

const OurPolicy = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing after it becomes visible
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("policy-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const policies = [
    {
      img: Refund,
      title: "Easy Exchange Policy",
      desc: "Hassle-free exchanges for a smooth shopping experience. We make returns easy and fast!",
    },
    {
      img: Call,
      title: "24/7 Customer Support",
      desc: "Our support team is available round-the-clock to assist you with any questions or concerns.",
    },
    {
      img: Trust,
      title: "100% Best Materials",
      desc: "We use only the highest quality materials to ensure your satisfaction and long-lasting products.",
    },
  ];

  return (
    <div className="my-10">
      {/* Section Title */}
      <div className="text-center py-8 text-3xl">
        <Title text1="WHY" text2="CHOOSE TRIFTOPIA" />
        <p className="w-3/4 mx-auto text-sm md:text-base text-gray-600">
          "Crafting clear, actionable policies that drive success and shape a
          stronger future."
        </p>
      </div>

      {/* Policy Section */}
      <div
        id="policy-section"
        className={`flex flex-col sm:flex-row justify-center items-center gap-12 sm:gap-8 text-center py-20 transition-all duration-700 ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {policies.map((item, index) => (
          <div key={index} className="w-80">
            <img
              src={item.img}
              className="w-16 mx-auto mb-5"
              alt={item.title}
            />
            <p className="font-semibold text-lg">{item.title}</p>
            <p className="text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurPolicy;
