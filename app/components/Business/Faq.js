import React from "react";
import FaqBar from "./FaqBar";
import styles from "./Faq.module.css";
function Faq() {
  return (
    <div className={styles.faq_container}>
      <h1 className={styles.faq_heading}>Frequently asked questions</h1>
      <div
        style={{
          width: "100%",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <div className={styles.faq_container_bar}>
          <div
            style={{
              marginTop: 10,
            }}
          >
            <FaqBar></FaqBar>
          </div>
          <div
            style={{
              marginTop: 10,
            }}
          >
            <FaqBar></FaqBar>
          </div>
          <div
            style={{
              marginTop: 10,
            }}
          >
            <FaqBar></FaqBar>
          </div>
          <div
            style={{
              marginTop: 10,
            }}
          >
            <FaqBar></FaqBar>
          </div>
          <div
            style={{
              marginTop: 10,
            }}
          >
            <FaqBar></FaqBar>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
