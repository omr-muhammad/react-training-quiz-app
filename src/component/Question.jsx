import { useQuiz } from "../contexts/QuizContext";

function Question() {
  const { questions, index } = useQuiz();
  return (
    <div>
      <h4>{questions[index].question}</h4>
      <Options />
    </div>
  );
}

function Options() {
  const { questions, dispatch, answer, index } = useQuiz();
  return (
    <div className="options">
      {questions[index].options.map((option, i) => {
        const hasAnswered = answer !== null;
        const markChoosedAns = i === answer ? "answer" : "";
        const markRightOrWrong =
          questions[index].correctOption === i ? "correct" : "wrong";
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
