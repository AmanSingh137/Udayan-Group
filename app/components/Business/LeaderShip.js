import React from "react";
import FaqBar from "./FaqBar";
import styles from "./LeaderShip.module.css";
import LeadershipCard from "./LeadershipCard";
function LeaderShip() {
  return (
    <div className={styles.leadership_container}>
      <h1 className={styles.leadership_heading}>Leadership</h1>
      <div
        style={{
          width: "100%",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <div className={styles.leaderships}>
          <LeadershipCard></LeadershipCard>
        </div>
      </div>
    </div>
  );
}

export default LeaderShip;
