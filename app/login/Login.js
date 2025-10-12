"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login: authLogin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 2000); // Change dot every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await authLogin(username, password);
    
    setLoading(false);
    
    if (result.success) {
      // Redirect based on user role
      const userRole = result.data.role;
      if (userRole === "ROLE_EMPLOYER" || userRole === "ROLE_ADMIN") {
        router.push("/jobs"); // Dashboard for employers
      } else {
        router.push("/jobs"); // Job listings for candidates
      }
    } else {
      setError(result.error);
    }
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
        <a href="/" className={styles.backLink}>
          &larr; Back to website
        </a>
        <h2 className={styles.title}>Sign in</h2>
        
        {error && (
          <div style={{ 
            padding: '10px', 
            marginBottom: '15px', 
            backgroundColor: '#fee', 
            color: '#c33',
            borderRadius: '5px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}
        
        <form className={styles.form} onSubmit={handleLogin}>
          <label className={styles.label}>Username:</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            className={styles.input}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />

          <label className={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            placeholder="************"
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />

          <div className={styles.footer}>
            <a href="#" className={styles.forgotPassword}>
              Forgot password?
            </a>
          </div>
          <button 
            type="submit" 
            className={styles.signInButton}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          <div className={styles.footer}>
            <a href="/signup" className={styles.forgotPassword}>
              Don't have an account? sign up
            </a>
          </div>
          
          {/* Test credentials hint */}
          <div style={{ 
            marginTop: '20px', 
            padding: '10px', 
            backgroundColor: '#f0f8ff',
            borderRadius: '5px',
            fontSize: '12px'
          }}>
            <strong>Test Credentials:</strong><br/>
            Employer: username: <code>employer</code>, password: <code>employer123</code><br/>
            Candidate: username: <code>candidate</code>, password: <code>candidate123</code>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
