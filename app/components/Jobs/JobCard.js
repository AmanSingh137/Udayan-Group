"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "../../jobs/Jobs.module.css";
import { FaArrowCircleRight, FaLocationArrow } from "react-icons/fa";

const JobCard = ({ 
  id, 
  color, 
  date, 
  title, 
  location, 
  company, 
  salary, 
  jobType, 
  experienceLevel 
}) => {
  const router = useRouter();

  const handleApply = (e) => {
    e.stopPropagation();
    router.push(`/apply-job/${id}`);
  };

  const handleCardClick = () => {
    router.push(`/job-details/${id}`);
  };

  // Format job type for display
  const formatJobType = (type) => {
    if (!type) return "";
    return type.replace(/_/g, " ").toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div
      className={styles.card}
      style={{
        borderColor: "#d6d6d5",
        borderWidth: 0.5,
        borderStyle: "solid",
        cursor: "pointer",
      }}
      onClick={handleCardClick}
    >
      <div className={styles.cardHeader}>
        <span className={styles.date}>{date}</span>
      </div>
      <h3 className={styles.jobTitle}>{title}</h3>
      {company && <p style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>{company}</p>}
      {salary && <p style={{ fontSize: "14px", color: "#28a745", fontWeight: "600", marginBottom: "10px" }}>{salary}</p>}
      <div className={styles.tags}>
        {jobType && <span>{formatJobType(jobType)}</span>}
        {experienceLevel && <span>{formatJobType(experienceLevel)}</span>}
      </div>
      <div className={styles.footer}>
        <div className={styles.location}>
          <FaLocationArrow size={16} />
          <span>{location}</span>
        </div>
        <button className={styles.applyBtn} onClick={handleApply}>
          Apply now
          <FaArrowCircleRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default JobCard;
