import Image from "next/legacy/image";
import React from "react";
import styles from "./Footer.module.css";
import { InstagramIcon, XIcon, FacebookIcon } from "../svg";
function Footer() {
  return (
    <div className={styles.footer_main_container}>
      <div className={styles.footer_container_top}>
        <div className={styles.footer_container_top_left}>
          <h1 className={styles.footer_header}>EXPLORE OUR FEATURE HANDS-ON</h1>
          <p className={styles.footer_description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
          <div className={styles.input_container}>
            <input
              placeholder="Enter your email"
              className={styles.email_input_container}
            ></input>
            <div className={styles.submit_btn_container}>
              <p className={styles.submit_btn_container_txt}>Submit</p>
            </div>
          </div>
        </div>
        <div className={styles.footer_container_top_right}>
          <Image
            alt="footer graph 1"
            src={"/footer_graph.png"}
            width={600}
            height={400}
          ></Image>
        </div>
      </div>
      <div className={styles.footer_container_bottom}>
        <div>
          <p className={styles.footer_container_bottom_copyright_txt}>
            copyright © 2020-24 Udayan Group Pvt Ltd.
          </p>
        </div>
        <div className={styles.social_icons}>
          <div className={styles.social_icon}>
            <FacebookIcon></FacebookIcon>
          </div>
          <div className={styles.social_icon}>
            <InstagramIcon></InstagramIcon>
          </div>

          <div className={styles.social_icon}>
            <XIcon></XIcon>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
