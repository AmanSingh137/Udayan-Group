import Image from "next/image";
import styles from "./Intro.module.css";
const Intro = () => {
  return (
    <section className={styles.whoWeAre}>
      <div className={styles.whoWeAre_sub}>
        <div className={styles.textContent}>
          <h1 className={styles.business_heading}>Who we are</h1>
          <p className={styles.business_para}>
            In a fast-moving and increasingly complex global economy, our
            success depends on how faithfully we adhere to our core principles:
            delivering exceptional client service, acting with integrity and
            responsibility, and supporting the growth of our employees.
          </p>
          <div className={styles.business_sub_card}>
            <div className={styles.business}>
              <h3 className={styles.business_heading}>Our business</h3>
              <p className={styles.business_para}>
                We serve millions of customers, clients, and communities in over
                100 global markets with more than 300,000 employees worldwide.
              </p>
            </div>
            <div className={styles.business}>
              <h3 className={styles.business_heading}>Our business</h3>
              <p className={styles.business_para}>
                We serve millions of customers, clients, and communities in over
                100 global markets with more than 300,000 employees worldwide.
              </p>
            </div>
            <div className={styles.business}>
              <h3 className={styles.business_heading}>Our business</h3>
              <p className={styles.business_para}>
                We serve millions of customers, clients, and communities in over
                100 global markets with more than 300,000 employees worldwide.
              </p>
            </div>
          </div>
        </div>
        <div
          style={
            {
              // backgroundColor: "#f0f0f0",
            }
          }
        >
          <div className={styles.imageContainer}>
            {/* <Image
              src="/path-to-image.jpg"
              alt="Corporate Image"
              layout="fill"
              objectFit="cover"
            /> */}
            <div className={styles.corporateResponsibility}>
              <h3 className={styles.business_heading}>
                Corporate Responsibility
              </h3>
              <h4 className={styles.business_heading}>Our impact</h4>
              <p className={styles.business_para}>
                Helping to power economic growth by breaking down barriers and
                creating opportunities in communities across the globe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
