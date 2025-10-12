"use client";
import React, { useEffect, useState } from "react";
import styles from "./TextBlockSection.module.css"; // Link to the accompanying CSS
import Aos from "aos";

function TextBlockSection() {
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

  const blocks = [
    {
      title: "We believe in treating our Customers with respect and faith",
      description:
        "We are a family-owned Firm. The readiness to fully commit oneself to the Firm in good times as well as bad is something that applies in equal measure to everyone who works for it.",
    },
    {
      title: "We believe in treating our Customers with respect and faith",
      description:
        "We are a family-owned Firm. The readiness to fully commit oneself to the Firm in good times as well as bad is something that applies in equal measure to everyone who works for it.",
    },
    {
      title: "We believe in treating our Customers with respect and faith",
      description:
        "We are a family-owned Firm. The readiness to fully commit oneself to the Firm in good times as well as bad is something that applies in equal measure to everyone who works for it.",
    },
    {
      title: "We believe in treating our Customers with respect and faith",
      description:
        "We are a family-owned Firm. The readiness to fully commit oneself to the Firm in good times as well as bad is something that applies in equal measure to everyone who works for it.",
    },
    {
      title: "We believe in treating our Customers with respect and faith",
      description:
        "We are a family-owned Firm. The readiness to fully commit oneself to the Firm in good times as well as bad is something that applies in equal measure to everyone who works for it.",
    },
    {
      title: "We believe in treating our Customers with respect and faith",
      description:
        "We are a family-owned Firm. The readiness to fully commit oneself to the Firm in good times as well as bad is something that applies in equal measure to everyone who works for it.",
    },
  ];

  return (
    <div className={styles.textBlockSection_main}>
      <div className={styles.textBlockSection}>
        {blocks.map((block, index) => (
          <div key={index} className={styles.textBlock} data-aos={"fade-up"}>
            <h2 className={styles.title}>{block.title}</h2>
            <p className={styles.description}>{block.description}</p>
            <hr className={styles.separator} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TextBlockSection;
