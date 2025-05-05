"use client";
import React, { useEffect, useState } from "react";
import styles from "./CommunityPage.module.css";
import ImagesMarquee from "./components/Community/ImagesMarquee";
import Footer from "./components/Footer";
import NumberStrip from "./components/Community/NumberStrip";
import QuoteCard from "./components/Community/QuoteCard";
import Aos from "aos";
import Intro from "./components/Community/Intro";
import ExploreMore from "./components/Community/ExploreMore";
import CircularGallery from "./components/Community/CircularGallery";
import Restoring from "./components/Community/Restoring";
function CommunityPage() {
  const items = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    image: `https://picsum.photos/300/290?energy=${i}`, // Random images from Lorem Picsum
  }));

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // Initialize AOS
    Aos.init({ duration: 1000, once: true });

    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1200);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }

    // Open the curtain after a short delay
    setTimeout(() => setCurtainOpen(true), 500);
  }, []);

  return (
    <div className={styles.community_container}>
      <div className={styles.community_container1} data-aos={"fade-down"}>
        <div className={styles.community_container1_left}>
          <h1 className={styles.community_heading}>Unearth the future today</h1>
        </div>
        <div>
          <div className={styles.community_container1_counter_container_strip}>
            <div className={styles.community_container1_counter_container}>
              <h1 className={styles.community_container1_counter_txt}>1M+</h1>
              <p className={styles.community_container1_counter_desc}>
                the firm becomes
              </p>
            </div>
            <div className={styles.community_container1_counter_container}>
              <h1 className={styles.community_container1_counter_txt}>1M+</h1>
              <p className={styles.community_container1_counter_desc}>
                the firm
              </p>
            </div>
            <div className={styles.community_container1_counter_container}>
              <h1 className={styles.community_container1_counter_txt}>1M+</h1>
              <p className={styles.community_container1_counter_desc}>
                the firm akjfhda
              </p>
            </div>
          </div>
          <p className={styles.community_description}>
            the firm becomes a part of theirs. Our alumni network keeps former
            colleagues around the world connected to the firm and one another,
            creating opportunities for business collaboration, thought
            leadership, and lasting relationships.. the firm becomes a part of
            theirs. Our alumni network keeps former colleagues around the world
          </p>
        </div>
      </div>
      <div className={styles.images_marquee_container}>
        {items.map((item) => (
          <div key={item.id} className={styles.images_marquee}>
            <img src={item.image} alt={`Random ${item.id}`} />
            <div className={styles.overlay}>
              <h1 className={styles.overlay_heading}>
                Environmental sustainablity
              </h1>
              <p className={styles.overlay_description}>
                the firm becomes a part of theirs. Our alumni network keeps
                former colleagues around the world connected to the firm and one
                another,
              </p>
            </div>
          </div>
        ))}
      </div>

      <Intro></Intro>
      <Restoring></Restoring>
      <div
        style={{
          position: "relative",
          justifyContent: "center",
          backgroundColor: "#F5F5F5",
          alignItems: "center",
          displayflex: "flex",
          paddingTop: "50px",
          flexDirection: "column",
        }}
      >
        <ExploreMore></ExploreMore>
      </div>

      <div style={{ height: "600px", position: "relative" }}>
        <CircularGallery bend={4} textColor="#ffffff" borderRadius={0.05} />
      </div>
      {/* <div className={styles.quote_container}> */}
      <QuoteCard></QuoteCard>
      {/* </div> */}
      <div>
        <NumberStrip></NumberStrip>
      </div>
    </div>
  );
}

export default CommunityPage;
