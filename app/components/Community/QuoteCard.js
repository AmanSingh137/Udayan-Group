import React from "react";
import styles from "./QuoteCard.module.css";
function QuoteCard() {
  return (
    <div className={styles.quote_container}>
      <div className={styles.quote_container_sub}>
        <div className={styles.quote_container_up}>
          <p className={styles.quote_container_up_para}>
            “We are facing challenges at every turn ... (yet) we have a moment
            to put aside our differences, offer solutions and work with others
            in the Western world to come together in defense of democracy and
            essential freedoms, including free enterprise. We are facing
            challenges at every turn ... (yet) we have a moment to put aside our
            differences, offer solutions and work with others in the Western
            world to come together in defense of democracy and essential
            freedoms, including free enterprise.” 
          </p>
        </div>

        <div className={styles.quote_container_down}>
          <div className={styles.quote_container_profile}></div>
          <div className={styles.text_container_profile}>
            <h1 className={styles.quote_container_name}>Mick Ross</h1>
            <h1 className={styles.quote_container_position}>Director</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuoteCard;
