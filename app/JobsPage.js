"use client";
import React, { useState, useEffect } from "react";
import styles from "./jobs/Jobs.module.css";
import JobCard from "./components/Jobs/JobCard";
import { useJobs } from "./hooks/useJobs";

export default function JobsPage() {
  const { jobs, loading, error, searchJobs, fetchJobsByType, pagination } = useJobs({
    autoFetch: true,
    size: 12,
  });

  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedType, setSelectedType] = useState({
    fullTime: false,
    partTime: false,
    internship: false,
  });

  const handleSearch = () => {
    if (searchKeyword.trim()) {
      searchJobs(searchKeyword, 0, 12);
    }
  };

  const handleTypeChange = (type) => {
    setSelectedType((prev) => ({
      fullTime: false,
      partTime: false,
      internship: false,
      [type]: !prev[type],
    }));

    if (!selectedType[type]) {
      const typeMap = {
        fullTime: "FULL_TIME",
        partTime: "PART_TIME",
        internship: "INTERNSHIP",
      };
      fetchJobsByType(typeMap[type], 0, 12);
    } else {
      // If unchecking, fetch all jobs
      searchJobs("", 0, 12);
    }
  };

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <div className={styles.container}>
      {/* Left Sidebar */}
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebar_heading}>Filters</h2>
        <div className={styles.filterSection}>
          <h4>Working Schedule</h4>
          <label className={styles.checkbox_container}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={selectedType.fullTime}
              onChange={() => handleTypeChange("fullTime")}
            />
            <p className={styles.checkbox_title}>Full time</p>
          </label>
          <label className={styles.checkbox_container}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={selectedType.partTime}
              onChange={() => handleTypeChange("partTime")}
            />
            <p className={styles.checkbox_title}>Part time</p>
          </label>
          <label className={styles.checkbox_container}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={selectedType.internship}
              onChange={() => handleTypeChange("internship")}
            />
            <p className={styles.checkbox_title}>Internship</p>
          </label>
        </div>
        
        <div className={styles.filterSection}>
          <h4>Results</h4>
          <p className={styles.checkbox_title}>
            {pagination.totalElements} jobs found
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1>Current Openings</h1>
          <div className={styles.searchFilters}>
            <input
              type="text"
              className={styles.searchBar}
              placeholder="Search job titles, keywords..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <button className={styles.searchButton} onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        {loading && (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <p>Loading jobs...</p>
          </div>
        )}

        {error && (
          <div style={{ 
            padding: "20px", 
            backgroundColor: "#fee", 
            color: "#c33",
            borderRadius: "5px",
            margin: "20px 0"
          }}>
            {error}
          </div>
        )}

        {!loading && jobs.length === 0 && (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <p>No jobs found. Try adjusting your filters or search terms.</p>
          </div>
        )}

        <div className={styles.jobGrid}>
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              date={formatDate(job.createdAt)}
              title={job.title}
              location={job.location}
              company={job.company}
              salary={job.salary}
              jobType={job.jobType}
              experienceLevel={job.experienceLevel}
              color={getRandomColor(job.id)}
            />
          ))}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            gap: "10px", 
            marginTop: "30px" 
          }}>
            <button
              onClick={() => searchJobs(searchKeyword, pagination.currentPage - 1, 12)}
              disabled={pagination.currentPage === 0}
              style={{
                padding: "10px 20px",
                backgroundColor: pagination.currentPage === 0 ? "#ccc" : "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: pagination.currentPage === 0 ? "not-allowed" : "pointer",
              }}
            >
              Previous
            </button>
            <span style={{ padding: "10px" }}>
              Page {pagination.currentPage + 1} of {pagination.totalPages}
            </span>
            <button
              onClick={() => searchJobs(searchKeyword, pagination.currentPage + 1, 12)}
              disabled={pagination.currentPage >= pagination.totalPages - 1}
              style={{
                padding: "10px 20px",
                backgroundColor: pagination.currentPage >= pagination.totalPages - 1 ? "#ccc" : "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: pagination.currentPage >= pagination.totalPages - 1 ? "not-allowed" : "pointer",
              }}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

// Helper function to generate consistent colors based on ID
function getRandomColor(id) {
  const colors = [
    "#FFCCCC", "#CCE5FF", "#FFCCFF", 
    "#CCFFCC", "#CCFFFF", "#FFFFCC",
    "#FFE5CC", "#E5CCFF", "#CCFFE5"
  ];
  return colors[id % colors.length];
}
