import styles from "./Sidebar.module.css";
import { FiHome, FiLogOut } from "react-icons/fi";
export default function Sidebar() {
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
        </div>
        <button className={styles.logout}>
          <FiLogOut size={18} color="#fff" /> Logout
        </button>
      </div>
    </div>
  );
}
