"use client";
import React, { useEffect, useRef } from "react";
import styles from "./Tree.module.css"; // Import CSS module

const treeData = {
  title: "We are a leading global firm",
  children: [
    {
      title: "Node 1",
      description:
        "The firm becomes a part of theirs. Our alumni network keeps former colleagues connected.",
      height: "60px", // Different vertical line height
    },
    {
      title: "Node 2",
      description:
        "The firm becomes a part of theirs. Our alumni network keeps former colleagues connected.",
      height: "100px",
    },
    {
      title: "Node 3",
      description:
        "The firm becomes a part of theirs. Our alumni network keeps former colleagues connected.",
      height: "60px",
    },
    {
      title: "Node 4",
      description:
        "The firm becomes a part of theirs. Our alumni network keeps former colleagues connected.",
      height: "100px",
    },
  ],
};

const Tree = () => {
  const nodeRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animateDrop);
          }
        });
      },
      { threshold: 0.5 } // Trigger the animation when 50% of the element is in view
    );

    nodeRefs.current.forEach((node) => {
      observer.observe(node);
    });

    return () => {
      nodeRefs.current.forEach((node) => {
        observer.unobserve(node);
      });
    };
  }, []);

  return (
    <div className={styles.treeContainer}>
      {/* Root Node */}
      <div className={styles.root}>{treeData.title}</div>

      {/* Main Vertical Connector */}
      <div className={styles.connectorVertical}></div>

      {/* Child Nodes */}
      <div className={styles.childrenContainer}>
        {treeData.children.map((child, index) => (
          <div
            key={index}
            className={styles.childNode}
            style={{ "--line-height": child.height }} // Using custom property for height
            ref={(el) => (nodeRefs.current[index] = el)} // Assign reference to each node
          >
            <div className={styles.connectorVerticalChild}></div>
            <div className={styles.card}>
              <h3>{child.title}</h3>
              <p>{child.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tree;
