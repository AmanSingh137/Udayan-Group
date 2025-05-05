import { useState } from "react";
import styles from "./ExploreMore.module.css"; // Importing the CSS module for styling

const ExploreMore = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle visibility of the item
  };

  const items = [
    { title: "Our purpose and values" },
    { title: "Our purpose and values" },
    { title: "Our purpose and values" },
    { title: "Our purpose and values" },
  ];

  return (
    <div className={styles.explore_container}>
      <div className={styles.explore_container_sub}>
        <div className={styles.textContent}>
          <h1 className={styles.accordionContent_heading}>Explore More</h1>
          <p className={styles.accordionContent_para}>
            Learn more about life and our impact on the communities in which we
            live and work. Learn more about life and our impact on the
            communities in which we live and work. Learn more about life and our
            impact on the communities in which we live and work. Learn more
            about life and our impact on the communities in which we live and
            work. Learn more about life and our impact on the communities in
            which we live and work. live and work. Learn more about life and our
            impact on the communities in which we live and work. Learn more
            about life and our impact on the communities in which we live and
            work. Learn more about life and our impact on the communities in
            which we live and work. Learn more about life and our impact on the
            communities in which we live and work.
          </p>
        </div>
        <div className={styles.accordion}>
          {items.map((item, index) => (
            <div key={index} className={styles.accordionItem}>
              <div
                className={styles.accordionHeader}
                onClick={() => handleToggle(index)}
              >
                <span>{item.title}</span>
                <span className={styles.plusSign}>
                  {openIndex === index ? "-" : "+"}
                </span>
              </div>
              {openIndex === index && (
                <div className={styles.accordionContent}>
                  <p className={styles.accordionContent_para}>
                    communities in which we live and work. Learn more about life
                    and our impact on the communities in which we live and work.
                    Learn more about life and our impact on the communities in
                    which we live and work. Learn more about life and our impact
                    on the communities in which we live and work. live and work.
                    Learn more about life and our impact on the communities in
                    which we live and work. Learn more about life and our impact
                    on the communities in which we live and work. Learn more
                    about life and our impact on the communities in which we
                    live and work. Learn more about life and our impact on the
                    communities in which we live and work.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;
