import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
const Navbar = () => {
  return (
    <div className={styles.navbar_container}>
      <div className={styles.navbar_container_left}>
        <Image src={"/logo.png"} width={140} height={140}></Image>
      </div>
      <div></div>
      <div className={styles.navbar_container_right}>
        <div className={styles.navlink_container}>
          <Link href="/" className={styles.navlink}>
            Home
          </Link>
        </div>
        <div className={styles.navlink_container}>
          <Link href="/" className={styles.navlink}>
            Business
          </Link>
        </div>
        <div className={styles.navlink_container}>
          <Link href="/" className={styles.navlink}>
            Community
          </Link>
        </div>
        <div className={styles.navlink_container}>
          <Link href="/" className={styles.navlink}>
            Jobs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
