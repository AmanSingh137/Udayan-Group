import React from 'react';
import styles from "./page.module.css";
import HomePage from "./HomePage";

function page() {
  return (
    <div className={styles.page}>
      <HomePage />
    </div>
  );
};

export default page;