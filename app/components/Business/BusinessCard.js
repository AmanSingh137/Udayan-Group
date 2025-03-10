import React from "react";
import styles from "./Businesscard.module.css";
import Image from "next/image";

function BusinessCard() {
  return (
    <div className={styles.business_container}>
      <div className={styles.business_container_top}>
        <Image
          className={styles.business_container_image}
          src="/windmill.jpg"
          alt="Business Banner"
          width={420}
          height={600}
          priority
        />
        <div className={styles.overlay}>
          <div className={styles.overlay_text}>
            <h2>Windmill Energy</h2>
            <p>Leading the way in sustainable energy solutions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessCard;
