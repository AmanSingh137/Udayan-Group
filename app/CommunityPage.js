import React from "react";
import styles from "./CommunityPage.module.css";
import ImagesMarquee from "./components/community/ImagesMarquee";
import Footer from "./components/Footer";
import NumberStrip from "./components/community/NumberStrip";
import QuoteCard from "./components/community/QuoteCard";
function CommunityPage() {
  const items = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    image: `https://picsum.photos/300/290?random=${i}`, // Random images from Lorem Picsum
  }));
  return (
    <div className={styles.community_container}>
      <div className={styles.community_container1}>
        <h1 className={styles.community_heading}>Unearth the future today</h1>
        <div>
          <div className={styles.community_container1_counter_container_strip}>
            <div className={styles.community_container1_counter_container}>
              <h1 className={styles.community_container1_counter_txt}>1M+</h1>
              <p className={styles.community_container1_counter_desc}>
                the firm becomes
              </p>
            </div>
            <div className={styles.community_container1_counter_container}>
              <h1 className={styles.community_container1_counter_txt}>1M+</h1>
              <p className={styles.community_container1_counter_desc}>
                the firm
              </p>
            </div>
            <div className={styles.community_container1_counter_container}>
              <h1 className={styles.community_container1_counter_txt}>1M+</h1>
              <p className={styles.community_container1_counter_desc}>
                the firm akjfhda
              </p>
            </div>
          </div>
          <p className={styles.community_description}>
            the firm becomes a part of theirs. Our alumni network keeps former
            colleagues around the world connected to the firm and one another,
            creating opportunities for business collaboration, thought
            leadership, and lasting relationships.. the firm becomes a part of
            theirs. Our alumni network keeps former colleagues around the world
          </p>
        </div>
      </div>
      <div className={styles.images_marquee_container}>
        {items.map((item) => (
          <div key={item.id} className={styles.images_marquee}>
            <img src={item.image} alt={`Random ${item.id}`} />
            <div className={styles.overlay}>
              <h1 className={styles.overlay_heading}>
                Environmental sustainablity
              </h1>
              <p className={styles.overlay_description}>
                the firm becomes a part of theirs. Our alumni network keeps
                former colleagues around the world connected to the firm and one
                another,
              </p>
            </div>
          </div>
        ))}
      </div>

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
              equal measure. In each of our sectors of activity we are leaders
              on a world scale, in terms of both technology and organization. We
              strive to achieve continuous growth that is far above average for
              the sectors in which we are active. We aim for a net operating
              margin that enables us to afford our high expenditure on research
              and development as well as investments made by our own efforts.
              Our activities both inside and outside our Firm reflect
              commitment, trust, openness and sustainability.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.quote_container}>
        <QuoteCard></QuoteCard>
      </div>
      <div>
        <NumberStrip></NumberStrip>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default CommunityPage;
