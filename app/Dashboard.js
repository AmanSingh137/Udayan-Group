import JobCard from "./components/Jobs/JobCard";
import styles from "./Dashboard.module.css";
import { FiHome, FiSearch } from "react-icons/fi";
const jobData = [
  {
    id: 1,
    date: "20 Jan, 2025",
    title: "Electrical Engineer",
    location: "Mumbai",
    color: "#FFCCCC",
  },
  {
    id: 2,
    date: "20 Jan, 2025",
    title: "Electrical Engineer",
    location: "Pune",
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
export default function Dashboard() {
  return (
    <div className={styles.container}>
      {/* Search and Post Job */}
      <div className={styles.topBar}>
        <div className={styles.topBar_left}>
          <input
            type="text"
            placeholder="Search job opening"
            className={styles.search}
          />
          <button className={styles.searchBtn}>
            <p>Search</p>
            <FiSearch
              size={18}
              color="#fff"
              className={styles.searchBtn_icon}
            />
          </button>
        </div>
        <button className={styles.postJob}>Post a job</button>
      </div>

      {/* Job Openings Section */}
      <h2 className={styles.heading}>Current Openings</h2>
      <div className={styles.filters}>
        <select className={styles.dropdown}>
          <option>Select Department</option>
        </select>
        <select className={styles.dropdown}>
          <option>Select Location</option>
        </select>
      </div>
      <div>
        <div className={styles.jobGrid}>
          {jobData.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      </div>
    </div>
  );
}
