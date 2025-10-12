"use client";
import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import Image from "next/legacy/image";
import HomeQualityCard from "./components/Home/HomeQualityCard";
import NumberStrip from "./components/Home/NumberStrip";
import BrandStrip from "./components/Home/BrandStrip";
import AOS from "aos";
import "aos/dist/aos.css"; // Don't forget to import AOS styles
import Slider from "./components/Home/Slider";
import TextBlockSection from "./components/Home/TextBlockSection";
import QuoteCard from "./components/Community/QuoteCard";
import ScrollVelocity from "./components/Home/ScrollVelocity";
import SplitText from "./components/Home/SplitText";

function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(false);
  const Qualities = [
    {
      title: "Excellence Through Balanced Leadership",
      description:
        "Leading globally with innovation, we balance growth, sustainability, and excellence to satisfy customers, employees, owners, and society.",
      image: "/business_banner.jpg"
    },
    {
      title: "Comprehensive Engineering & Project",
      description:
        "Leading globally with innovation, we balance growth, sustainability, and excellence to satisfy customers, employees, owners, and society.",
      image: "/windmill.jpg"
    },
    {
      title: "Excellence Through Balanced Leadership",
      description:
        "Leading globally with innovation, we balance growth, sustainability, and excellence to satisfy customers, employees, owners, and society.",
      image: "/banner.jpg"
    },
    {
      title: "Comprehensive Engineering & Project",
      description:
        "Leading globally with innovation, we balance growth, sustainability, and excellence to satisfy customers, employees, owners, and society.",
      image: "/windmill.jpg"
    },
  ];

  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 1000, once: true });
    
    // Mark component as mounted
    setMounted(true);

    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1200);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }

    // Open the curtain after a short delay
    setTimeout(() => setCurtainOpen(true), 500);
  }, []);

  return (
    <div>
      <div className={styles.container}>
        {/* Curtain Animation */}
        {/* {!curtainOpen && (
          <div className={styles.curtain}>
            <div className={styles.curtainTop}></div>
            <div className={styles.curtainBottom}></div>
          </div>
        )} */}

        {/* Background Image */}
        {/* <div className={styles.bg_img}>
        <Image
          src={"/banner.jpg"}
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
       </div> */}
        <div>
          <div className={styles.banner_card}>
            <SplitText
              text="The same high performance and quality expectation"
              className="text-2xl font-semibold text-center"
              delay={100}
              animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              easing="easeOutCubic"
              threshold={0.2}
              rootMargin="-50px"
              // onLetterAnimationComplete={handleAnimationComplete}
            />
            {/* <h1 className={styles.banner_card_heading}>
              The same high performance and quality expectation
            </h1> */}
            <p className={styles.banner_card_paragraph}>
              We believe in treating our Customers with respect and faith. We
              grow through creativity, innovation and inventions. We incorporate
              integrity, honesty and business ethics into all the aspects of our
              business functioning.
            </p>
          </div>
        </div>
        {/* Content */}
      </div>

      <div className={styles.container2}>
        <div className={styles.container2_left} data-aos={"fade-right"}>
          <div className={styles.container2_left_img_container}></div>
        </div>
        <div className={styles.container2_right} data-aos={"fade-left"}>
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

      <div className={styles.container3}>
        {Qualities?.map((quality, index) => {
          return (
            <div key={index}>
              <HomeQualityCard
                quality={quality}
                index={index}
                image={quality.image}
              ></HomeQualityCard>
            </div>
          );
        })}
      </div>
      <div>
        <Slider></Slider>
      </div>
      <div>
        {/* <BrandStrip animation={"right"}></BrandStrip>
        <BrandStrip animation={"left"}></BrandStrip> */}
        <ScrollVelocity
          texts={["Udayan Group", "Imperial Resort"]}
          velocity={100}
          className="custom-scroll-text"
        />
      </div>
      <div>
        <NumberStrip></NumberStrip>
      </div>
      <div className={styles.map_container}>
        <Image src={require("../public/map1.png")}></Image>
      </div>
      <div className={styles.quote_card}>
        <QuoteCard></QuoteCard>
      </div>
      <div>
        <TextBlockSection></TextBlockSection>
      </div>
    </div>
  );
}

export default HomePage;
