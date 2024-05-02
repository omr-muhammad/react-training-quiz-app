function FinishScreen({ points, maxPoints, highscore, dispatch }) {
  const percentage = Math.ceil((points / maxPoints) * 100);
  let emoji;

  if (percentage === 100) emoji = "🏅";
  else if (percentage < 100 && percentage >= 80) emoji = "🎉";
  else if (percentage < 80 && percentage >= 50) emoji = "🙃";
  else if (percentage < 50 && percentage > 0) emoji = "🙄";
  else if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored <b>{points}</b> out of {maxPoints} (
        {percentage})
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
