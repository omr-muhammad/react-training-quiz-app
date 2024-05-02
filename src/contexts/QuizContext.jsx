import { useContext, createContext, useReducer, useEffect } from "react";

const QuizContext = createContext();

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "success":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "failed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      const question = state.questions[state.index];
      const points =
        action.payload === question.correctOption
          ? state.points + question.points
          : state.points;

      return {
        ...state,
        answer: action.payload,
        points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index++,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.highscore < state.points ? state.points : state.highscore,
      };
    case "restart":
      return initialState;
    default:
      throw new Error("Unknown Action Type");
  }
}

export default function QuizContextProvider({ children }) {
  const [{ questions, status, index, answer, points, highscore }, dispatch] =
    useReducer(reducer, initialState);

  // const numOfQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((max, question) => {
    return (max += question.points);
  }, 0);
  let rerunTheEffect = 0;

  if (status === "loading") rerunTheEffect++;

  useEffect(() => {
    // IIFE Approach
    (async () => {
      try {
        const res = await fetch("http://localhost:5000/questions");
        const data = await res.json();
        dispatch({ type: "success", payload: data });
      } catch (error) {
        dispatch({ type: "failed" });
      }
    })();
  }, [rerunTheEffect]);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);

  if (context === undefined)
    throw new Error("Context Was Used Outside Of Its Provider");

  return context;
}
