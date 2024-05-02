import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { index, questions, maxPossiblePoints, points, answer } = useQuiz();
  return (
    <header className="progress">
      <progress
        max={questions.length}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Questions <b>{index + 1}</b> / {questions.length}
      </p>

      <p>
        <b>{points}</b> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
