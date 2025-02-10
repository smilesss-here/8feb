import { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

function App() {
  const [accepted, setAccepted] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  // Function to move "No" button away from the cursor
  const escapeNoButton = () => {
    const x = (Math.random() - 0.5) * 250; // Random horizontal movement
    const y = (Math.random() - 0.5) * 250; // Random vertical movement
    setNoPosition({ x, y });
  };

  // Function to create falling hearts effect
  const generateHearts = () => {
    const newHearts = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + "vw",
      delay: Math.random() * 2,
    }));
    setHearts(newHearts);
  };

  return (
    <div className="container">
      {accepted ? (
        <>
          <h1 className="love-text">💖 Yay! I love you! 💖</h1>
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              className="heart"
              initial={{ y: "-10vh", opacity: 1 }}
              animate={{ y: "110vh", opacity: 0 }}
              transition={{ duration: 3, delay: heart.delay }}
              style={{ left: heart.left }}
            >
              💕
            </motion.div>
          ))}
        </>
      ) : (
        <>
          <h1 className="question">Will you be mine? 🥰</h1>
          <div className="button-group">
            <button
              className="yes-btn"
              onClick={() => {
                setAccepted(true);
                generateHearts();
              }}
            >
              Yes! 💕
            </button>
            <motion.button
              className="no-btn"
              animate={{ x: noPosition.x, y: noPosition.y }}
              transition={{ type: "spring", stiffness: 70, damping: 10 }}
              onMouseEnter={escapeNoButton} // Escape on hover (Desktop)
              onTouchStart={escapeNoButton} // Escape on touch (Mobile)
            >
              No 😢
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
