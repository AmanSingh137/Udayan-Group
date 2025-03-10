"use client";
import { DownIconSvg } from "@/app/svg";
import React, { useState } from "react";
import styles from "./FaqBar.module.css";

function FaqBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFaq = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.faqbar_container}>
      <div className={styles.faqbar_container_up} onClick={toggleFaq}>
        <h1 className={styles.faqbar_container_header}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt 
        </h1>
        <div className={`${styles.down_icon} ${isOpen ? styles.rotate : ""}`}>
          <DownIconSvg />
        </div>
      </div>
      <div
        className={`${styles.faqbar_container_down} ${
          isOpen ? styles.open : styles.closed
        }`}
      >
        <p className={styles.faqbar_container_description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
}

export default FaqBar;
