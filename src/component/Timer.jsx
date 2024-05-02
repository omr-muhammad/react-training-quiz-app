import { useEffect, useState } from "react";
import { useQuiz } from "../contexts/QuizContext";

function Timer() {
  const { dispatch, questions } = useQuiz();
  const [remaininSeconds, setTimer] = useState(questions.length * 30); // 30 second PER question
  const minutes = Math.floor(remaininSeconds / 60);
  const seconds = remaininSeconds % 60;

  useEffect(() => {
    const clear = setInterval(() => {
      setTimer((pre) => pre - 1);
    }, 1000);

    return () => clearInterval(clear);
  }, []);

  if (remaininSeconds === 0) dispatch({ type: "finish" });

  return (
    <div className="timer">
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
}

export default Timer;
