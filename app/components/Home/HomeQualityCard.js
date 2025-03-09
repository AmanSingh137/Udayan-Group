import React from "react";
import styles from "./HomeQualityCard.module.css";
function HomeQualityCard({ quality, index }) {
  return (
    <div
      className={styles.container2}
      style={{
        flexDirection: index % 2 == 0 ? "row" : "row-reverse",
      }}
    >
      <div className={styles.container2_left}>
        <div className={styles.container2_left_img_container}></div>
      </div>
      <div className={styles.container2_right}>
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
