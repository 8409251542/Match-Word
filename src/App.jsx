import { useState, useEffect } from "react";
import "../src/index.css";

// Original data
const data = [
  { word: "Ram", key: 1 },
  { word: "Ramayan", key: 1 },
  { word: "virat", key: 2 },
  { word: "Rohit", key: 2 },
  { word: "food", key: 3 },
  { word: "Poha", key: 3 },
  { word: "Delhi", key: 4 },
  { word: "India", key: 4 },
  { word: "Bat", key: 5 },
  { word: "Ball", key: 5 },
  { word: "Bihar", key: 6 },
  { word: "Patna", key: 6 },
];

// Function to shuffle an array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function App() {
  const [count, setCount] = useState(0);
  const [shuffledData, setShuffledData] = useState([]);
  const [keyValid, setKeyValid] = useState(null);
  const [preBox, setPreBox] = useState(null);
  const [hiddenIndices, setHiddenIndices] = useState([]);
  const [colorMap, setColorMap] = useState({});

  useEffect(() => {
    const shuffled = shuffleArray(data);
    setShuffledData(shuffled);
  }, []);

  const handleMatch = (item, index) => {
    setCount(count + 1);

    if (hiddenIndices.includes(index)) return;

    setColorMap((prev) => ({
      ...prev,
      [index]: "blue",
    }));

    if (keyValid === null) {
      setKeyValid(item.key);
      setPreBox(index);
    } else if (item.key === keyValid) {
      // Correct match
      setColorMap((prev) => ({
        ...prev,
        [index]: "green",
        [preBox]: "green",
      }));
      setTimeout(() => {
        setHiddenIndices([...hiddenIndices, preBox, index]);
        setColorMap({});
      }, 1000);
      setKeyValid(null);
      setPreBox(null);
    } else {
      // Incorrect match
      setColorMap((prev) => ({
        ...prev,
        [index]: "red",
        [preBox]: "red",
      }));
      setTimeout(() => {
        setColorMap({});
      }, 1000);
      setKeyValid(null);
      setPreBox(null);
    }
  };

  const handleReset = () => {
    setCount(0);
    setColorMap({});
    setHiddenIndices([]);
    setKeyValid(null);
    setPreBox(null);
    const shuffled = shuffleArray(data);
    setShuffledData(shuffled);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100vw",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {shuffledData.map((item, index) => (
          <div
            key={index}
            onClick={() => handleMatch(item, index)}
            style={{
              height: "5%",
              width: "20%",
              textAlign: "center",
              margin: "10px",
              padding: "10px",
              border: "0.25px solid black",
              cursor: hiddenIndices.includes(index) ? "default" : "pointer",
              backgroundColor: hiddenIndices.includes(index)
                ? "transparent"
                : colorMap[index] || "#f0f0f0",
              display: hiddenIndices.includes(index) ? "none" : "block",
            }}
          >
            {item.word}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          paddingTop: "20px",
          flexDirection: "column",
          width: "100vw",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h4>Attempts: {Math.floor(count / 2)}</h4>
        <button
          style={{
            padding: "10px",
            cursor: "pointer",
            backgroundColor: "blue",
            color: "white",
            border: "none",
          }}
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </>
  );
}

export default App;
