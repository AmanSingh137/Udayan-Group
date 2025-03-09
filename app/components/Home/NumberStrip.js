import React from "react";
import styles from "./NumberStrip.module.css";
function NumberStrip() {
  return (
    <div className={styles.numberstrip_container}>
      <div className={styles.number_container}>
        <h1 className={styles.number_container_heading}>10k+</h1>
        <p className={styles.number_container_description}>
          Udyan group People Around the World
        </p>
      </div>
      <div className={styles.number_container}>
        <h1 className={styles.number_container_heading}>1M+</h1>
        <p className={styles.number_container_description}>
          we ensure robust operations that support our investments
        </p>
      </div>
      <div className={styles.number_container}>
        <h1 className={styles.number_container_heading}>95%</h1>
        <p className={styles.number_container_description}>
          We aim to satisfy our customers, employees, owners.
        </p>
      </div>
    </div>
  );
}

export default NumberStrip;
