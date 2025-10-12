import React from "react";
import styles from "./Businesscard.module.css";

function BusinessCard() {
  return (
    <div className={styles.card}>
      <div 
        className={styles.card_image}
        style={{
          backgroundImage: 'url(/windmill.jpg)'
        }}
      ></div>
      <div className={styles.card_overlay}></div>
      <div className={styles.card_content}>
        <h2 className={styles.card_title}>WINDMILL ENERGY</h2>
        <p className={styles.card_description}>
          Leading the way in sustainable energy solutions. 
          Discover innovative renewable energy technologies that power tomorrow. 
          Experience the future of clean energy and environmental sustainability.
        </p>
      </div>
    </div>
  );
}

export default BusinessCard;
