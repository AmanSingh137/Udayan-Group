"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./PostJobPage.module.css";
import jobService from "./services/jobService";
import { useAuth } from "./context/AuthContext";

export default function PostJobPage() {
  const router = useRouter();
  const { user, isEmployer } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    jobType: "FULL_TIME",
    experienceLevel: "INTERMEDIATE",
    salary: "",
    requirements: "",
    responsibilities: "",
    category: "",
    applicationDeadline: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isEmployer()) {
      setError("Only employers can post jobs. Please login as an employer.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const jobData = {
        ...formData,
        applicationDeadline: formData.applicationDeadline 
          ? new Date(formData.applicationDeadline).toISOString()
          : null,
      };

      await jobService.createJob(jobData);
      setSuccess(true);
      setTimeout(() => {
        router.push("/jobs");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className={styles.container}>
        <p style={{ textAlign: "center", padding: "50px" }}>
          Please <a href="/login">login</a> to post a job.
        </p>
      </div>
    );
  }

  if (success) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h2 style={{ color: "#28a745" }}>✓ Job Posted Successfully!</h2>
          <p>Your job posting is now live.</p>
          <p>Redirecting to jobs page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Post a job</h1>

      {error && (
        <div
          style={{
            padding: "15px",
            margin: "20px 0",
            backgroundColor: "#fee",
            color: "#c33",
            borderRadius: "5px",
            fontSize: "14px",
          }}
        >
          {error}
        </div>
      )}

      <div className={styles.content}>
        {/* Left Side - Job Posting Form */}
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Job Title (e.g., Senior Software Engineer)"
              className={styles.input}
              value={formData.title}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="company"
              placeholder="Company Name"
              className={styles.input}
              value={formData.company}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="location"
              placeholder="Location (e.g., New York, NY or Remote)"
              className={styles.input}
              value={formData.location}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Job Description"
              className={styles.textarea}
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>

            <textarea
              name="responsibilities"
              placeholder="Key Responsibilities (optional)"
              className={styles.textarea}
              value={formData.responsibilities}
              onChange={handleChange}
            ></textarea>

            <textarea
              name="requirements"
              placeholder="Requirements & Qualifications (optional)"
              className={styles.textarea}
              value={formData.requirements}
              onChange={handleChange}
            ></textarea>

            <h4 className={styles.label}>Job Type</h4>
            <select
              name="jobType"
              className={styles.input}
              value={formData.jobType}
              onChange={handleChange}
              required
            >
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="CONTRACT">Contract</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="TEMPORARY">Temporary</option>
            </select>

            <h4 className={styles.label}>Experience Level</h4>
            <select
              name="experienceLevel"
              className={styles.input}
              value={formData.experienceLevel}
              onChange={handleChange}
              required
            >
              <option value="ENTRY_LEVEL">Entry Level</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="SENIOR">Senior</option>
              <option value="EXECUTIVE">Executive</option>
            </select>

            <h4 className={styles.label}>Category (optional)</h4>
            <input
              type="text"
              name="category"
              placeholder="e.g., Technology, Marketing, Finance"
              className={styles.input}
              value={formData.category}
              onChange={handleChange}
            />

            <h4 className={styles.label}>Salary Range (optional)</h4>
            <input
              type="text"
              name="salary"
              placeholder="e.g., $80,000 - $120,000 per year"
              className={styles.input}
              value={formData.salary}
              onChange={handleChange}
            />

            <h4 className={styles.label}>Application Deadline (optional)</h4>
            <input
              type="date"
              name="applicationDeadline"
              className={styles.input}
              value={formData.applicationDeadline}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
            />

            <button 
              type="submit" 
              className={styles.applyButton}
              disabled={loading}
            >
              {loading ? "POSTING JOB..." : "POST JOB"}
            </button>
          </form>
        </div>

        {/* Right Side - Job Stats */}
        <div className={styles.stats}>
          <h4>Tips for posting jobs:</h4>
          <ul>
            <li>• Write a clear and descriptive job title</li>
            <li>• Include specific requirements and qualifications</li>
            <li>• Mention salary range to attract quality candidates</li>
            <li>• Specify whether the job is remote, hybrid, or on-site</li>
            <li>• Be transparent about responsibilities</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
