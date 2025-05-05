"use client";
import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import axios from "axios";

const Login = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 2000); // Change dot every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const login = (e) => {
    e.preventDefault(); // Prevent default form submission

    axios
      .post("http://localhost:5000/api/auth/login", {
        username: email,
        password: password,
      })
      .then((response) => {
        console.log("response.data", response.data); // Handle success response
      })
      .catch((error) => {
        console.error("error", error); // Handle error response
      });
  };

  return (
    <div className={styles.container}>
      {/* Left Panel */}
      <div className={styles.leftPanel}>
        <h1>Lorem ipsmu sit</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magn
        </p>

        {/* Dotted Slider */}
        <div className={styles.dots}>
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className={`${styles.dot} ${
                index === activeIndex ? styles.activeDot : ""
              }`}
            ></span>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className={styles.rightPanel}>
        <a href="#" className={styles.backLink}>
          &larr; Back to website
        </a>
        <h2 className={styles.title}>Sign in</h2>
        <form className={styles.form} onSubmit={login}>
          <label className={styles.label}>User Id:</label>
          <input
            // type="email"
            placeholder="User Id"
            value={email}
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            placeholder="************"
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className={styles.footer}>
            <a href="#" className={styles.forgotPassword}>
              Forgot password?
            </a>
          </div>
          <button type="submit" className={styles.signInButton}>
            Sign In
          </button>
          <div className={styles.footer}>
            <a href="#" className={styles.forgotPassword}>
              Don't have an account? sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
