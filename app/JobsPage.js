"use client";
import React, { useState } from "react";
import styles from "./jobs/Jobs.module.css";
import JobCard from "./components/Jobs/JobCard";

const jobData = [
  {
    id: 1,
    date: "20 Jan, 2025",
    title: "Process Excellence",
    location: "Mumbai",
    color: "#FFCCCC",
  },
  {
    id: 2,
    date: "20 Jan, 2025",
    title: "Process Excellence",
    location: "Mumbai",
    color: "#CCE5FF",
  },
  {
    id: 3,
    date: "20 Jan, 2025",
    title: "Process Excellence",
    location: "Mumbai",
    color: "#FFCCFF",
  },
  {
    id: 4,
    date: "20 Jan, 2025",
    title: "Process Excellence",
    location: "Mumbai",
    color: "#CCFFCC",
  },
  {
    id: 5,
    date: "20 Jan, 2025",
    title: "Process Excellence",
    location: "Mumbai",
    color: "#CCFFFF",
  },
  {
    id: 6,
    date: "20 Jan, 2025",
    title: "Process Excellence",
    location: "Mumbai",
    color: "#FFFFCC",
  },
];

export default function JobsPage() {
  return (
    <div className={styles.container}>
      {/* Left Sidebar */}
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebar_heading}>Filters</h2>
        <div className={styles.filterSection}>
          <h4>Working Schedule</h4>
          <label className={styles.checkbox_container}>
            <input type="checkbox" className={styles.checkbox} />
            <p className={styles.checkbox_title}> Full time</p>
          </label>
          <label className={styles.checkbox_container}>
            <input type="checkbox" className={styles.checkbox} />{" "}
            <p className={styles.checkbox_title}> Part time</p>
          </label>
          <label className={styles.checkbox_container}>
            <input type="checkbox" className={styles.checkbox} />{" "}
            <p className={styles.checkbox_title}> Internship</p>
          </label>
        </div>
        <div className={styles.filterSection}>
          <h4>Employment Type</h4>
          <label className={styles.checkbox_container}>
            <input type="checkbox" className={styles.checkbox} />{" "}
            <p className={styles.checkbox_title}>Full day</p>
          </label>
          <label className={styles.checkbox_container}>
            <input type="checkbox" className={styles.checkbox} />{" "}
            <p className={styles.checkbox_title}>Remote</p>
          </label>
          <label className={styles.checkbox_container}>
            <input type="checkbox" className={styles.checkbox} />

            <p className={styles.checkbox_title}>Distant work</p>
          </label>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1>Current Openings</h1>
          <div className={styles.searchFilters}>
            {/* Search Bar */}

            <select className={styles.dropdown}>
              <option className={styles.dropdown_option}>
                Select Department
              </option>
            </select>

            <select className={styles.dropdown}>
              <option className={styles.dropdown_option}>
                Select Location
              </option>
            </select>
            <input
              type="text"
              className={styles.searchBar}
              placeholder="Search job titles..."
            />
            <button className={styles.searchButton}>Search</button>
          </div>
        </div>

        <div className={styles.jobGrid}>
          {jobData.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      </main>
    </div>
  );
}
