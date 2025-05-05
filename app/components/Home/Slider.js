import React, { useState } from "react";
import styles from "./Slider.module.css"; // Make sure to create the accompanying CSS

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "Balanced Leadership",
      description:
        "We strive to achieve continuous growth by maintaining a balance between strong leadership, innovation, and operational efficiency.",
      image: "/path-to-your-image1.jpg", // Change this to the actual path of your image
    },
    {
      title: "Expert Solutions",
      description:
        "We provide expert solutions in a variety of sectors, balancing practical experience with innovative approaches to business problems.",
      image: "/path-to-your-image2.jpg", // Change this to the actual path of your image
    },
    {
      title: "Strategic Growth",
      description:
        "Our focus on strategic growth has allowed us to maintain an edge over the competition, with strong foundations and a forward-thinking approach.",
      image: "/path-to-your-image3.jpg", // Change this to the actual path of your image
    },
    {
      title: "Sustainable Innovation",
      description:
        "We aim to drive sustainable innovation, with a commitment to reducing environmental impact and fostering sustainable business practices.",
      image: "/path-to-your-image4.jpg", // Change this to the actual path of your image
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className={styles.sliderContainer}>
      <h1 className={styles.sliderHeading}>
        What problem can we solve together?
      </h1>

      {/* Slider Content */}
      <div className={styles.sliderContent}>
        <div className={styles.imageContainer}>
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className={styles.image}
          />
        </div>
        <div>
          <div className={styles.textContainer}>
            <h2>{slides[currentSlide].title}</h2>
            <p>{slides[currentSlide].description}</p>
          </div>
          <div className={styles.dots}>
            {slides.map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${
                  index === currentSlide ? styles.active : ""
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Slider Navigation */}
      <div className={styles.sliderNav}>
        <button className={styles.navButton} onClick={prevSlide}>
          &#10094;
        </button>
        <button className={styles.navButton} onClick={nextSlide}>
          &#10095;
        </button>
      </div>

      {/* Slider Dots */}
    </div>
  );
}

export default Slider;
