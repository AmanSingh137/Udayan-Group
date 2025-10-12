"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./ApplyJobPage.module.css";
import { useJob } from "./hooks/useJobs";
import { useApplications } from "./hooks/useApplications";
import { useAuth } from "./context/AuthContext";

export default function ApplyJobPage({ jobId }) {
  const router = useRouter();
  const { job, loading: jobLoading, error: jobError } = useJob(jobId);
  const { applyForJob, loading: submitting } = useApplications();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    resumeUrl: "",
    linkedinProfile: "",
    yearsOfExperience: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Pre-fill if user is logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.fullName || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const applicationData = {
      jobId: jobId,
      ...formData,
      yearsOfExperience: formData.yearsOfExperience ? parseInt(formData.yearsOfExperience) : 0,
    };

    const result = await applyForJob(applicationData);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/jobs");
      }, 2000);
    } else {
      setError(result.error);
    }
  };

  if (jobLoading) {
    return (
      <div className={styles.container}>
        <p style={{ textAlign: "center", padding: "50px" }}>Loading job details...</p>
      </div>
    );
  }

  if (jobError || !job) {
    return (
      <div className={styles.container}>
        <p style={{ textAlign: "center", padding: "50px", color: "#c33" }}>
          {jobError || "Job not found"}
        </p>
        <button onClick={() => router.push("/jobs")} style={{ margin: "20px auto", display: "block" }}>
          Back to Jobs
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h2 style={{ color: "#28a745" }}>✓ Application Submitted Successfully!</h2>
          <p>Thank you for applying. We'll be in touch soon.</p>
          <p>Redirecting to jobs page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header_container}>
        <a href="/jobs" className={styles.backLink}>
          ← Back to jobs
        </a>
        <h1 className={styles.heading}>
          You're applying for, <br /> <span>{job.title}</span>
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

          <h3>Job Description:</h3>
          <p>{job.description}</p>

          {job.responsibilities && (
            <>
              <h3>Key Responsibilities:</h3>
              <p style={{ whiteSpace: "pre-wrap" }}>{job.responsibilities}</p>
            </>
          )}

          {job.requirements && (
            <>
              <h3>Required Skills & Qualifications:</h3>
              <p style={{ whiteSpace: "pre-wrap" }}>{job.requirements}</p>
            </>
          )}
        </div>

        {/* Right Side - Form */}
        <div className={styles.formContainer}>
          {error && (
            <div
              style={{
                padding: "10px",
                marginBottom: "15px",
                backgroundColor: "#fee",
                color: "#c33",
                borderRadius: "5px",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Enter full name"
              className={styles.input}
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Enter email id"
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Enter mobile number"
              className={styles.input}
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="yearsOfExperience"
              placeholder="Years of experience"
              className={styles.input}
              value={formData.yearsOfExperience}
              onChange={handleChange}
              min="0"
            />
            <input
              type="url"
              name="resumeUrl"
              placeholder="Resume URL (Google Drive, Dropbox, etc.)"
              className={styles.input}
              value={formData.resumeUrl}
              onChange={handleChange}
            />
            <input
              type="url"
              name="linkedinProfile"
              placeholder="LinkedIn Profile URL"
              className={styles.input}
              value={formData.linkedinProfile}
              onChange={handleChange}
            />
            <textarea
              name="coverLetter"
              placeholder="Cover Letter (optional)"
              className={styles.input}
              value={formData.coverLetter}
              onChange={handleChange}
              rows="5"
              style={{ minHeight: "100px", resize: "vertical" }}
            />

            <button 
              type="submit" 
              className={styles.applyButton}
              disabled={submitting}
            >
              {submitting ? "SUBMITTING..." : "APPLY FOR THE ROLE"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
