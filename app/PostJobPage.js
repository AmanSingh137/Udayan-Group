import styles from "./PostJobPage.module.css";

export default function PostJobPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Post a job</h1>

      <div className={styles.content}>
        {/* Left Side - Job Posting Form */}
        <div className={styles.formContainer}>
          <input
            type="text"
            placeholder="Enter Position Name"
            className={styles.input}
          />
          <textarea
            placeholder="Description"
            className={styles.textarea}
          ></textarea>
          <input type="text" placeholder="Location" className={styles.input} />

          <h4 className={styles.label}>Main skill for this position</h4>
          <input
            type="text"
            placeholder="Add one main skill"
            className={styles.input}
          />

          <h4 className={styles.label}>Other skills</h4>
          <input
            type="text"
            placeholder="Add more skills"
            className={styles.input}
          />

          <h4 className={styles.label}>Salary range</h4>
          <div className={styles.salaryRange}>
            <input
              type="text"
              placeholder="Min yearly salary"
              className={styles.salaryInput}
            />
            <input
              type="text"
              placeholder="Max yearly salary"
              className={styles.salaryInput}
            />
          </div>

          <button className={styles.applyButton}>APPLY FOR THE ROLE</button>
        </div>

        {/* Right Side - Job Stats */}
        <div className={styles.stats}>
          <h4>Last 30 days:</h4>
          <ul>
            <li>
              • Job post views: <b>627,753</b>
            </li>
            <li>
              • Job applicants: <b>1,24,662</b>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
