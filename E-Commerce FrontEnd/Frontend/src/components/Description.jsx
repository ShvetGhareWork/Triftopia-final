import React, { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import Antique from "/antique.jpg";
import Limited from "/limited.jpeg";

const Description = () => {
  const [inView1, setInView1] = useState(false);
  const [inView2, setInView2] = useState(false);

  const { ref: ref1, inView: observerInView1 } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { ref: ref2, inView: observerInView2 } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    setInView1(observerInView1);
    setInView2(observerInView2);
  }, [observerInView1, observerInView2]);

  const textAnimation1 = useSpring({
    opacity: inView1 ? 1 : 0,
    transform: inView1 ? "translateX(0)" : "translateX(100px)",
    config: { tension: 200, friction: 100 },
  });

  const imageAnimation1 = useSpring({
    opacity: inView1 ? 1 : 0,
    transform: inView1 ? "translateX(0)" : "translateX(-100px)",
    config: { tension: 200, friction: 100 },
  });

  const textAnimation2 = useSpring({
    opacity: inView2 ? 1 : 0,
    transform: inView2 ? "translateX(0)" : "translateX(-100px)",
    config: { tension: 200, friction: 100 },
  });

  const imageAnimation2 = useSpring({
    opacity: inView2 ? 1 : 0,
    transform: inView2 ? "translateX(0)" : "translateX(100px)",
    config: { tension: 200, friction: 100 },
  });

  return (
    <div className="p-10 sm:p-28 w-full h-auto grid grid-rows-2 gap-20">
      <div className="w-full flex flex-col sm:flex-row items-center sm:items-start">
        <animated.img
          ref={ref1}
          className="w-full sm:w-1/2 h-auto sm:h-112 mb-5 sm:mb-0"
          src={Antique}
          alt="Antique"
          style={imageAnimation1}
        />
        <ul className="w-full sm:w-2/5 text-xl grid gap-6 ml-5">
          <animated.li className="text-5xl" style={textAnimation1}>
            ANTIQUE
          </animated.li>
          <animated.li style={textAnimation1}>
            ➔ Each antique item is listed with a detailed description that
            includes its origin, age, materials used, craftsmanship, and
            condition.
          </animated.li>
          <animated.li style={textAnimation1}>
            ➔ High-Quality Images showcasing multiple angles, close-ups of
            engravings, and unique features to give customers a clear view.
          </animated.li>
          <animated.li style={textAnimation1}>
            ➔ <strong>Price:</strong> Transparent pricing based on rarity,
            condition, and demand of the item.
          </animated.li>
          <animated.li style={textAnimation1}>
            ➔ <strong>Bestseller Status:</strong> Highlighting the most popular
            items with a “Bestseller” tag to help customers discover
            sought-after pieces.
          </animated.li>
        </ul>
      </div>

      <div className="w-full flex flex-col sm:flex-row-reverse items-center sm:items-start">
        <animated.img
          ref={ref2}
          className="w-full sm:w-1/2 h-auto sm:h-112 mb-5 sm:mb-0"
          src={Limited}
          alt="Limited Edition"
          style={imageAnimation2}
        />
        <ul className="w-full sm:w-2/5 text-xl grid gap-6 ml-5">
          <animated.li className="text-5xl" style={textAnimation2}>
            LIMITED ACCESS
          </animated.li>
          <animated.li style={textAnimation2}>
            ➔ Our Limited Access products are one-of-a-kind pieces, carefully
            curated for their rarity, age, and unique craftsmanship.
          </animated.li>
          <animated.li style={textAnimation2}>
            ➔ These items are only available to a select group of customers,
            ensuring exclusivity and premium access to the most sought-after
            pieces.
          </animated.li>
          <animated.li style={textAnimation2}>
            ➔ Transparent pricing based on the item’s rarity, condition, and
            demand, reflecting the true value of these extraordinary items.
          </animated.li>
          <animated.li style={textAnimation2}>
            ➔ Prioritized access is given to our loyal customers, VIP members,
            and those who have registered for early notifications on limited
            releases.
          </animated.li>
        </ul>
      </div>
    </div>
  );
};

export default Description;
