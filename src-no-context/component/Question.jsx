function Question({ question, dispatch, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        options={question.options}
        dispatch={dispatch}
        answer={answer}
        correctOpt={question.correctOption}
      />
    </div>
  );
}

function Options({ options, dispatch, answer, correctOpt }) {
  return (
    <div className="options">
      {options.map((option, i) => {
        const hasAnswered = answer !== null;
        const markChoosedAns = i === answer ? "answer" : "";
        const markRightOrWrong = correctOpt === i ? "correct" : "wrong";
        const markAfterAnswer = hasAnswered ? markRightOrWrong : "";
        return (
          <button
            className={`btn btn-option ${markChoosedAns} ${markAfterAnswer}`}
            key={option}
            onClick={() => dispatch({ type: "newAnswer", payload: i })}
            disabled={hasAnswered}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Question;
