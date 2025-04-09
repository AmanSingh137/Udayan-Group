import React from "react";
import styles from "../../jobs/Jobs.module.css";
import { FaArrowCircleRight, FaLocationArrow } from "react-icons/fa";

const JobCard = ({ color, date, title, location }) => {
  return (
    <div
      className={styles.card}
      style={{
        borderColor: "#d6d6d5",
        borderWidth: 0.5,
        borderStyle: "solid",
      }}
    >
      <div className={styles.cardHeader}>
        <span className={styles.date}>{date}</span>
      </div>
      <h3 className={styles.jobTitle}>{title}</h3>
      <div className={styles.tags}>
        <span>FullTime</span>
        <span>Distant</span>
        <span>Project</span>
      </div>
      <div className={styles.footer}>
        <div className={styles.location}>
          <FaLocationArrow size={16} />
          <span>{location}</span>
        </div>
        <button className={styles.applyBtn}>
          Apply now
          <FaArrowCircleRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default JobCard;
