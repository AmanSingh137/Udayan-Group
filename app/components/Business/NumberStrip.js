"use client";
import React from "react";
import CountUp from "react-countup";
import styles from "./NumberStrip.module.css";

function NumberStrip() {
  const numbers = [
    { value: 10000, suffix: "+", text: "Udyan group People Around the World" },
    {
      value: 1000000,
      suffix: "+",
      text: "We ensure robust operations",
    },
    {
      value: 95,
      suffix: "%",
      text: "We aim to satisfy our customers, employees",
    },
    { value: 10000, suffix: "+", text: "Udyan group People Around the World" },
    {
      value: 1000000,
      suffix: "+",
      text: "We ensure robust operations that support our",
    },
    {
      value: 95,
      suffix: "%",
      text: "We aim to satisfy our customers, employees",
    },
  ];

  return (
    <div className={styles.numberstrip_container}>
      {numbers.map((num, index) => (
        <div className={styles.number_container} key={index}>
          <h1 className={styles.number_container_heading}>
            <CountUp start={0} end={num.value} duration={8} separator="," />
            {num.suffix}
          </h1>
          <p className={styles.number_container_description}>{num.text}</p>
        </div>
      ))}
    </div>
  );
}

export default NumberStrip;
