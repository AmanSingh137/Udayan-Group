"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Sidebar.module.css";
import { FiHome, FiLogOut } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ onFilterChange }) {
  const router = useRouter();
  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout;
  const [filters, setFilters] = useState({
    fullTime: false,
    partTime: false,
    internship: false,
    fullDay: false,
    remote: false,
    distant: false,
  });

  const handleFilterChange = (filterName) => {
    const newFilters = {
      ...filters,
      [filterName]: !filters[filterName],
    };
    setFilters(newFilters);
    
    // Notify parent component
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleLogout = () => {
    if (logout) {
      logout();
      router.push("/");
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="/logo_white.png" alt="Udayan Group" />
      </div>
      <div className={styles.sidebar_menu}>
        <div>
          <nav>
            <button className={styles.navItem}>
              <FiHome size={18} color="#000" />
              <p className={styles.sidebar_txt}>Home</p>
            </button>
          </nav>
          
          {/* Filters Section */}
          <div className={styles.filtersSection}>
            <h3 className={styles.filterHeading}>Filters</h3>
            
            <div className={styles.filterGroup}>
              <h4 className={styles.filterTitle}>Working Schedule</h4>
              <label className={styles.checkboxLabel}>
                <input 
                  type="checkbox" 
                  className={styles.checkbox}
                  checked={filters.fullTime}
                  onChange={() => handleFilterChange('fullTime')}
                />
                <span>Full time</span>
              </label>
              <label className={styles.checkboxLabel}>
                <input 
                  type="checkbox" 
                  className={styles.checkbox}
                  checked={filters.partTime}
                  onChange={() => handleFilterChange('partTime')}
                />
                <span>Part time</span>
              </label>
              <label className={styles.checkboxLabel}>
                <input 
                  type="checkbox" 
                  className={styles.checkbox}
                  checked={filters.internship}
                  onChange={() => handleFilterChange('internship')}
                />
                <span>Internship</span>
              </label>
            </div>
            
            <div className={styles.filterGroup}>
              <h4 className={styles.filterTitle}>Employment Type</h4>
              <label className={styles.checkboxLabel}>
                <input 
                  type="checkbox" 
                  className={styles.checkbox}
                  checked={filters.fullDay}
                  onChange={() => handleFilterChange('fullDay')}
                />
                <span>Full day</span>
              </label>
              <label className={styles.checkboxLabel}>
                <input 
                  type="checkbox" 
                  className={styles.checkbox}
                  checked={filters.remote}
                  onChange={() => handleFilterChange('remote')}
                />
                <span>Remote</span>
              </label>
              <label className={styles.checkboxLabel}>
                <input 
                  type="checkbox" 
                  className={styles.checkbox}
                  checked={filters.distant}
                  onChange={() => handleFilterChange('distant')}
                />
                <span>Distant work</span>
              </label>
            </div>
          </div>
        </div>
        {user && (
          <button className={styles.logout} onClick={handleLogout}>
            <FiLogOut size={18} color="#fff" /> Logout
          </button>
        )}
      </div>
    </div>
  );
}
