import React from "react";
import styles from "../../jobs/Jobs.module.css";
import { FaArrowCircleRight, FaLocationArrow } from "react-icons/fa";

const JobCard = ({ color, date, title, location }) => {
  return (
    <div className={styles.card} style={{ backgroundColor: color }}>
      <div className={styles.cardHeader}>
        <span className={styles.date}>{date}</span>
      </div>
      <h3 className={styles.jobTitle}>{title}</h3>
      <div className={styles.tags}>
        <span>Full Time</span>
        <span>Distant</span>
        <span>Project Work</span>
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
