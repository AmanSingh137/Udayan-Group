import { BrandIconSvg } from "@/app/svg";
import React, { useEffect, useRef, useState } from "react";
import styles from "./BrandStrip.module.css";

function BrandStrip({ animation }) {
  const stripRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollX(window.scrollY * 0.5); // Adjust speed factor if needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.marquee_container}>
      <div
        ref={stripRef}
        className={styles.marquee}
        style={{
          transform: `translateX(${-scrollX}px)`,
          animation: `10s linear infinite ${
            animation == "right" ? "marquee-scroll1" : "marquee-scroll2"
          }`,
        }}
      >
        {[...Array(10)].map((_, index) => (
          <div key={index} className={styles.marquee_item}>
            <BrandIconSvg />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrandStrip;
