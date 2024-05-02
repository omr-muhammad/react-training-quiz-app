import { useQuiz } from "../contexts/QuizContext";

function FinishScreen() {
  const { points, maxPossiblePoints, highscore, dispatch } = useQuiz();

  const percentage = Math.ceil((points / maxPossiblePoints) * 100);
  let emoji;

  if (percentage === 100) emoji = "🏅";
  else if (percentage < 100 && percentage >= 80) emoji = "🎉";
  else if (percentage < 80 && percentage >= 50) emoji = "🙃";
  else if (percentage < 50 && percentage > 0) emoji = "🙄";
  else if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored <b>{points}</b> out of{" "}
        {maxPossiblePoints} ({percentage})
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </>
  );
}

export default FinishScreen;
