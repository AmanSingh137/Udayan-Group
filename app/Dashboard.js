"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import JobCard from "./components/Jobs/JobCard";
import styles from "./Dashboard.module.css";
import { FiSearch } from "react-icons/fi";
import { useJobs } from "./hooks/useJobs";
import { useAuth } from "./context/AuthContext";

export default function Dashboard({ filters }) {
  const router = useRouter();
  const auth = useAuth();
  const user = auth?.user;
  const isEmployer = auth?.isEmployer || (() => false);
  const { 
    jobs, 
    loading, 
    error, 
    searchJobs, 
    fetchMyJobs,
    fetchJobsByType,
    pagination 
  } = useJobs({ autoFetch: true, size: 12 });

  const [searchKeyword, setSearchKeyword] = useState("");
  const [viewMode, setViewMode] = useState("all"); // 'all' or 'myJobs'

  // Apply filters when they change
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const activeFilters = Object.keys(filters).filter(key => filters[key]);
      
      if (activeFilters.length > 0) {
        // Check for job type filters first
        const typeMap = {
          fullTime: "FULL_TIME",
          partTime: "PART_TIME",
          internship: "INTERNSHIP",
        };
        
        const jobTypeFilter = activeFilters.find(f => typeMap[f]);
        
        if (jobTypeFilter) {
          // Filter by job type
          const jobType = typeMap[jobTypeFilter];
          fetchJobsByType(jobType, 0, 12);
        } else if (activeFilters.includes('remote') || activeFilters.includes('distant')) {
          // Filter by location for remote/distant work
          searchJobs("Remote", 0, 12);
        } else if (activeFilters.includes('fullDay')) {
          // Show all jobs for full day (can refine this logic)
          searchJobs("", 0, 12);
        } else {
          searchJobs("", 0, 12);
        }
      } else {
        // No filters active, show all jobs
        searchJobs("", 0, 12);
      }
    }
  }, [filters]);

  const handleSearch = () => {
    if (viewMode === "myJobs") {
      // Cannot search in my jobs view
      return;
    }
    searchJobs(searchKeyword, 0, 12);
  };

  const handlePostJob = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (isEmployer && !isEmployer()) {
      alert("Only employers can post jobs. Please login as an employer.");
      return;
    }
    router.push("/post-job");
  };

  const toggleViewMode = () => {
    if (!user) return;
    
    if (viewMode === "all") {
      fetchMyJobs();
      setViewMode("myJobs");
    } else {
      searchJobs("", 0, 12);
      setViewMode("all");
    }
  };

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      day: "numeric", 
      month: "short", 
      year: "numeric" 
    });
  };

  // Get random color for cards
  const getRandomColor = (id) => {
    const colors = [
      "#FFCCCC", "#CCE5FF", "#FFCCFF",
      "#CCFFCC", "#CCFFFF", "#FFFFCC",
      "#FFE5CC", "#E5CCFF", "#CCFFE5"
    ];
    return colors[id % colors.length];
  };

  return (
    <div className={styles.container}>
      {/* Search and Post Job */}
      <div className={styles.topBar}>
        <div className={styles.topBar_left}>
          <input
            type="text"
            placeholder="Search job opening"
            className={styles.search}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            disabled={viewMode === "myJobs"}
          />
          <button 
            className={styles.searchBtn} 
            onClick={handleSearch}
            disabled={viewMode === "myJobs"}
          >
            <p>Search</p>
            <FiSearch
              size={18}
              color="#fff"
              className={styles.searchBtn_icon}
            />
          </button>
        </div>
        {user && (
          <div style={{ display: "flex", gap: "10px" }}>
            {isEmployer && isEmployer() && (
              <button 
                className={styles.postJob}
                onClick={toggleViewMode}
                style={{ 
                  backgroundColor: viewMode === "myJobs" ? "#28a745" : "#6c757d"
                }}
              >
                {viewMode === "myJobs" ? "View All Jobs" : "My Posted Jobs"}
              </button>
            )}
            <button className={styles.postJob} onClick={handlePostJob}>
              Post a job
            </button>
          </div>
        )}
      </div>

      {/* Job Openings Section */}
      <h2 className={styles.heading}>
        {viewMode === "myJobs" ? "My Posted Jobs" : "Current Openings"}
        {pagination.totalElements > 0 && (
          <span style={{ fontSize: "16px", fontWeight: "normal", marginLeft: "10px" }}>
            ({pagination.totalElements} jobs)
          </span>
        )}
      </h2>

      {loading && (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p>Loading jobs...</p>
        </div>
      )}

      {error && (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#fee",
            color: "#c33",
            borderRadius: "5px",
            margin: "20px 0",
          }}
        >
          {error}
        </div>
      )}

      {!loading && jobs.length === 0 && (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p>
            {viewMode === "myJobs"
              ? "You haven't posted any jobs yet."
              : "No jobs found. Try adjusting your search terms."}
          </p>
          {viewMode === "myJobs" && (
            <button
              onClick={handlePostJob}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Post Your First Job
            </button>
          )}
      </div>
      )}

      <div>
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
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "30px",
          }}
        >
          <button
            onClick={() =>
              viewMode === "myJobs"
                ? fetchMyJobs(pagination.currentPage - 1, 12)
                : searchJobs(searchKeyword, pagination.currentPage - 1, 12)
            }
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
            onClick={() =>
              viewMode === "myJobs"
                ? fetchMyJobs(pagination.currentPage + 1, 12)
                : searchJobs(searchKeyword, pagination.currentPage + 1, 12)
            }
            disabled={pagination.currentPage >= pagination.totalPages - 1}
            style={{
              padding: "10px 20px",
              backgroundColor:
                pagination.currentPage >= pagination.totalPages - 1 ? "#ccc" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor:
                pagination.currentPage >= pagination.totalPages - 1 ? "not-allowed" : "pointer",
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
