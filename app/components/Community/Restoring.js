import React from "react";
import styles from "./Restoring.module.css"; // Importing the CSS module for styling
function Restoring() {
  return (
    <div className={styles.container2}>
      <div className={styles.container2_sub}>
        <div className={styles.container2_left}>
          <div className={styles.container2_left_img_container}></div>
        </div>
        <div className={styles.container2_right}>
          <h1 className={styles.container2_right_heading}>
            Restoring the flow of power what we can do
          </h1>
          <p className={styles.container2_right_paragraph}>
            We want to satisfy our customers, employees, owners and society in
            equal measure. In each of our sectors of activity we are leaders on
            a world scale, in terms of both technology and organization. We
            strive to achieve continuous growth that is far above average for
            the sectors in which we are active. We aim for a net operating
            margin that enables us to afford our high expenditure on research
            and development as well as investments made by our own efforts. Our
            activities both inside and outside our Firm reflect commitment,
            trust, openness and sustainability.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Restoring;
