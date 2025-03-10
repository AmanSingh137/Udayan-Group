import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./HomePage";
import BusinessPage from "./BusinessPage";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar></Navbar>
      <BusinessPage></BusinessPage>
      {/* <HomePage></HomePage>
      <Footer></Footer> */}
    </div>
  );
}
