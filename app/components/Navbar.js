"use client";
import Image from "next/legacy/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
const Navbar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  return (
    <div className={`${styles.navbar_container} ${isHomePage ? styles.homePage : styles.otherPages}`}>
      <div className={styles.navbar_container_left}>
        <Link href="/">
          <Image alt="logo 2" src={"/logo.png"} width={140} height={140}></Image>
        </Link>
      </div>
      <div></div>
      <div className={styles.navbar_container_right}>
        <div className={styles.navlink_container}>
          <Link href="/" className={styles.navlink}>
            Home
          </Link>
        </div>
        <div className={styles.navlink_container}>
          <Link href="/business" className={styles.navlink}>
            Business
          </Link>
        </div>
        <div className={styles.navlink_container}>
          <Link href="/community" className={styles.navlink}>
            Community
          </Link>
        </div>
        <div className={styles.navlink_container}>
          <Link href="/jobs" className={styles.navlink}>
            Jobs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
