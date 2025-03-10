import React from "react";
import styles from "./Leadershipcard.module.css";
function LeadershipCard() {
  return (
    <div className={styles.leadership_container}>
      <div className={styles.leadership_container_top}></div>
      <div className={styles.leadership_container_bottom}>
        <h1 className={styles.leadership_container_bottom_heading}>
          Aman Kumar
        </h1>
        <p className={styles.leadership_container_bottom_position}>Director</p>
      </div>
    </div>
  );
}

export default LeadershipCard;
