function Progress({ index, numQuestions, totalPoints, points, answer }) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Questions <b>{index + 1}</b> / {numQuestions}
      </p>

      <p>
        <b>{points}</b> / {totalPoints}
      </p>
    </header>
  );
}

export default Progress;
