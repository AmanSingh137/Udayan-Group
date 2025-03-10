"use client";
import React, { useRef } from "react";
import styles from "./Businesses.module.css";
import BusinessCard from "./BusinessCard";
import { LeftArrowSvg, RightArrowSvg } from "@/app/svg";

function Businesses() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" }); // Scroll right by 300px
    }
  };

  return (
    <div className={styles.business_container}>
      <div className={styles.businesss_wrapper}>
        <div className={styles.businesss} ref={scrollRef}>
          {[...Array(5)].map((_, index) => (
            <div key={index} className={styles.business_card_wrapper}>
              <BusinessCard />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.slider_controls}>
        <button className={styles.scroll_button} onClick={scrollLeft}>
          <LeftArrowSvg></LeftArrowSvg>
        </button>
        <button className={styles.scroll_button} onClick={scrollRight}>
          <RightArrowSvg></RightArrowSvg>
        </button>
      </div>
    </div>
  );
}

export default Businesses;
