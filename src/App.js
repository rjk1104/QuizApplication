import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [currentQue, setCurrentQue] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [que, setQue] = useState([]);

  const handleClick = (que, ans) => {
    if (que.correct_answer === ans) {
      let x = score + 1;
      setScore(x);
    }
    if (currentQue + 1 < 15) {
      let cnt = currentQue + 1;
      setCurrentQue(cnt);
    } else {
      setShowScore(true);
    }

    console.log(showScore);
  };

  const getQue = () => {
    fetch("https://opentdb.com/api.php?amount=15")
      .then((response) => response.json())
      .then((response) => {
        console.log(response.results);
        setQue(response.results);
      })
      .catch((error) => console.log("errrr"));
  };
  useEffect(() => getQue(), []);

  return (
    <div className="container">
      {que.length > 0 ? (
        <div className="innercontainer">
          {showScore ? (
            <h2 className="score">
              {score > 10
                ? `Hurray😄 , Your score is ${score}!!`
                : `Oops 😒,Your score is ${score}`}
            </h2>
          ) : (
            <div className="questiondiv">
              <h2 className="progress">Quiz in progress</h2>
              <div>
                <span className="questionNumber"> Q {currentQue + 1}. </span>
                <span className="questionNumber">
                  {que[currentQue].question}
                </span>
              </div>
              <div className="answerdiv">
                <button
                  className="options"
                  onClick={() =>
                    handleClick(que[currentQue], que[currentQue].correct_answer)
                  }
                >
                  {que[currentQue].correct_answer}
                </button>
                {que[currentQue].incorrect_answers.map((ans, i) => (
                  <button
                    className="options"
                    key={i}
                    onClick={() => handleClick(que[currentQue], ans)}
                  >
                    {ans}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="load">
          <h2>Page is Loading...</h2>
        </div>
      )}
    </div>
  );
}

export default App;
