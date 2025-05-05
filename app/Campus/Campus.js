// import styles from "./Campus.module.css";

// const Campus = () => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.overlay}>
//         <h1 className={styles.title}>
//           FIND YOUR <br />
//           CAMPUS CREW <br />
//           OVER LUNCH
//         </h1>
//         <p className={styles.subtitle}>Every friend starts as a stranger.</p>
//         <button className={styles.button}>Join the Waiting list</button>
//         <p className={styles.signIn}>I already have an account</p>
//         <p className={styles.terms}>
//           By signing up, you agree to the <a href="#">Terms of Service</a> and{" "}
//           <a href="#">Privacy Policy</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Campus;
"use client";
import { useState } from "react";
import styles from "./Campus.module.css";

const questions = [
  {
    question: "In group projects, I am usually the:",
    options: ["👑 Leader", "🎨 Creative one", "🤝 Supporter", "🎯 Executor"],
  },
  {
    question: "How do you handle deadlines?",
    options: [
      "📅 Plan ahead",
      "💡 Improvise",
      "🏃 Work last minute",
      "✅ Stick to routine",
    ],
  },
  {
    question: "What's your approach to problem-solving?",
    options: [
      "🔍 Analyze first",
      "🛠 Try & fix",
      "💬 Ask for help",
      "🚀 Take action",
    ],
  },
];

export default function Campus() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setProgress(((currentQuestion + 1) / questions.length) * 100);
    }
  };

  return (
    <div className={styles.container}>
      {/* Back Arrow */}
      <button className={styles.backButton}>&larr;</button>

      {/* Progress Bar */}
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Question Section */}
      <h2 className={styles.questionTitle}>
        {questions[currentQuestion].question}
      </h2>

      {/* Options */}
      <div className={styles.optionsContainer}>
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            className={styles.optionButton}
            onClick={handleNext}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
