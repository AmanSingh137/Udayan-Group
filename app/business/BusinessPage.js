import React from "react";
import styles from "../BusinessPage.module.css";
import NumberStrip from "../components/Business/NumberStrip";
import Image from "next/legacy/image";
import Faq from "../components/Business/Faq";
import Footer from "../components/Footer";
import LeaderShip from "../components/Business/LeaderShip";
import Businesses from "../components/Business/Businesses";
import Tree from "../components/Business/Tree";

function BusinessPage() {
  return (
    <div>
      <div className={styles.businessPage}>
        <div className={styles.business_container1}>
          <h1 className={styles.business_heading}>
            Creating long term sustainable wealth
          </h1>
          <p className={styles.business_description}>
            the firm becomes a part of theirs. Our alumni network keeps former
            colleagues around the world connected to the firm and one another,
            creating opportunities for business collaboration, thought
            leadership, and lasting relationships.
          </p>
        </div>
        <div className={styles.business_container2}>
          <div className={styles.business_container2_sub}>
            <NumberStrip></NumberStrip>
          </div>
        </div>
        <div className={styles.business_banner}>
          <Image
            src="/business_banner.jpg"
            alt="Business Banner"
            layout="fill" // Fills the parent div
            objectFit="cover" // Ensures the image covers the div properly
            priority
          />
        </div>
        <div className={styles.business_container1}>
          <div>
            <h1 className={styles.business_heading}>
              Creating long term sustainable wealth
            </h1>
            <p className={styles.business_description}>
              the firm becomes a part of theirs. Our alumni network keeps former
              colleagues around the world connected to the firm and one another,
              creating opportunities for business collaboration, thought
              leadership, and lasting relationships.
            </p>
          </div>

          <Image alt="logo 1" src={"/logo.png"} width={420} height={420}></Image>
        </div>

        <div className={styles.leadership_container}>
          <div className={styles.leadership_container_sub}>
            <Businesses></Businesses>
          </div>
        </div>

        <div className={styles.tree_container}>
          <Tree></Tree>
        </div>

        <div className={styles.leadership_container}>
          <div className={styles.leadership_container_sub}>
            <LeaderShip></LeaderShip>
          </div>
        </div>

        <div className={styles.faq_container}>
          <Faq></Faq>
        </div>
      </div>
    </div>
  );
}

export default BusinessPage;
