"use client";
import React, { useEffect, useState } from "react";
import styles from "./HomeQualityCard.module.css";
import Aos from "aos";

function HomeQualityCard({ quality, index, image }) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Initialize AOS
    Aos.init({ duration: 1000, once: true });
    
    // Mark component as mounted
    setMounted(true);

    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1200);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div
      className={styles.container2}
      style={{
        flexDirection: index % 2 == 0 ? "row" : "row-reverse",
      }}
    >
      <div className={styles.container2_left}>
        <div 
          className={styles.container2_left_img_container} 
          style={{ 
            backgroundImage: image ? `url(${image})` : 'linear-gradient(45deg, #f0f0f0, #e0e0e0)',
            backgroundSize: "cover",
          }}
        ></div>
      </div>
      <div
        className={styles.container2_right}
        data-aos={index % 2 == 0 ? "fade-left" : "fade-right"}
      >
        <div>
          <h1 className={styles.container_right_number}>{index + 1}</h1>
        </div>
        <div>
          <h1 className={styles.container2_right_heading}>{quality?.title}</h1>
          <p className={styles.container2_right_paragraph}>
            {quality?.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeQualityCard;
