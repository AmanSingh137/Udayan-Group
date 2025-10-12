"use client";
import { use } from "react";
import { useRouter } from "next/navigation";
import { useJob } from "../../hooks/useJobs";
import styles from "../../ApplyJobPage.module.css";

export default function JobDetailsPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { job, loading, error } = useJob(parseInt(id));

  if (loading) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p>Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: "center", padding: "50px", color: "#c33" }}>
          <h2>Job Not Found</h2>
          <p>{error || "The job you're looking for doesn't exist."}</p>
          <button 
            onClick={() => router.push("/jobs")}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            ← Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header_container}>
        <a 
          onClick={() => router.push("/jobs")} 
          className={styles.backLink}
          style={{ cursor: "pointer" }}
        >
          ← Back to jobs
        </a>
        <h1 className={styles.heading}>
          <span>{job.title}</span>
        </h1>
      </div>

      <div className={styles.content}>
        {/* Left Side - Job Details */}
        <div className={styles.jobDetails}>
          <div style={{ marginBottom: "20px" }}>
            <h3>Company:</h3>
            <p>{job.company}</p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h3>Location:</h3>
            <p>{job.location}</p>
          </div>

          {job.salary && (
            <div style={{ marginBottom: "20px" }}>
              <h3>Salary:</h3>
              <p style={{ color: "#28a745", fontWeight: "600" }}>{job.salary}</p>
            </div>
          )}

          <div style={{ marginBottom: "20px" }}>
            <h3>Posted:</h3>
            <p>{formatDate(job.createdAt)}</p>
          </div>

          <h3>Job Description:</h3>
          <p style={{ whiteSpace: "pre-wrap", marginBottom: "20px" }}>
            {job.description}
          </p>

          {job.responsibilities && (
            <>
              <h3>Key Responsibilities:</h3>
              <p style={{ whiteSpace: "pre-wrap", marginBottom: "20px" }}>
                {job.responsibilities}
              </p>
            </>
          )}

          {job.requirements && (
            <>
              <h3>Required Skills & Qualifications:</h3>
              <p style={{ whiteSpace: "pre-wrap", marginBottom: "20px" }}>
                {job.requirements}
              </p>
            </>
          )}

          {job.applicationDeadline && (
            <div style={{ 
              backgroundColor: "#fff3e0", 
              padding: "15px", 
              borderRadius: "5px",
              marginTop: "20px" 
            }}>
              <strong>⏰ Application Deadline:</strong>{" "}
              {formatDate(job.applicationDeadline)}
            </div>
          )}
        </div>

        {/* Right Side - Apply Form */}
        <div className={styles.formContainer}>
          <h3 style={{ marginBottom: "20px" }}>Interested in this role?</h3>
          <button 
            onClick={() => router.push(`/apply-job/${id}`)}
            className={styles.applyButton}
          >
            APPLY FOR THIS JOB
          </button>

          <div style={{ 
            marginTop: "30px", 
            padding: "20px", 
            backgroundColor: "#f5f5f5",
            borderRadius: "8px" 
          }}>
            <h4>Job Details</h4>
            <div style={{ marginTop: "15px" }}>
              <p><strong>Job Type:</strong> {job.jobType?.replace(/_/g, " ")}</p>
              <p><strong>Experience:</strong> {job.experienceLevel?.replace(/_/g, " ")}</p>
              {job.category && <p><strong>Category:</strong> {job.category}</p>}
              <p><strong>Status:</strong> <span style={{ 
                color: job.status === "ACTIVE" ? "#28a745" : "#666" 
              }}>{job.status}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

