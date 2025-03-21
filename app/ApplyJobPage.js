import styles from "./ApplyJobPage.module.css";

export default function ApplyJobPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header_container}>
        <a href="#" className={styles.backLink}>
          ← Back to jobs
        </a>
        <h1 className={styles.heading}>
          You're applying for, <br /> <span>merchant operations</span>
        </h1>
      </div>

      <div className={styles.content}>
        {/* Left Side - Job Details */}
        <div className={styles.jobDetails}>
          <h3>Job Description:</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute
            <br></br>
            <br></br>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea
          </p>

          <h3>Key Responsibilities:</h3>
          <ul>
            <li>
              <b>1-2 years</b> of hands-on experience with merchant onboarding.
            </li>
            <li>Excellent written and verbal communication skills.</li>
            <li>
              A proven track record of process building and issue resolution.
            </li>
          </ul>

          <h3>Required Skills</h3>
          <div className={styles.skills}>
            <span>Excel</span>
            <span>Wireframing</span>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className={styles.formContainer}>
          <input
            type="text"
            placeholder="Enter full name"
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Enter email id"
            className={styles.input}
          />
          <input
            type="tel"
            placeholder="Enter mobile number"
            className={styles.input}
          />

          <div className={styles.upload}>📤 Upload your resume here</div>

          <button className={styles.applyButton}>APPLY FOR THE ROLE</button>
        </div>
      </div>
    </div>
  );
}
