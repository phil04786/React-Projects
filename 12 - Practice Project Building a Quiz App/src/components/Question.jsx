import { useState } from "react";
import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";
import QUESTIONS from "../questions.js";

export default function Question({
  index,
  // questionText,
  // answers,
  onSelectAnswer,
  // selectedAnswer,
  // answerState,
  onSkipAnswer,
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered.";
  }
  return (
    <div id="question">
      <QuestionTimer
        // key={activeQuestionIndex}
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null}
        mode={answerState}
        /* onTimeout={() =>
            handleSelectAnswer(null)
          }  null-> shows no answer is choosen for this question. Only this function (() =>
            handleSelectAnswer(null)) is changed. The function in javascript are values they are objects and when the function (() =>
            handleSelectAnswer(null)) is created the JSX is evaluated and the function (() =>
            handleSelectAnswer(null)) is a new object in memory is created. Even if still contains the same logic and code it is still a new object in memory. So everytime the code of return statement or JSX code is evaluated a new function is created here (() =>
            handleSelectAnswer(null)). and this JSX code is evaluated whenever the state in Quiz is updated which happens whenthe user picks answer.
          So use a hook so the function don't get recreated unless need becuase there that dependencies changed.
          */
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        // key={activeQuestionIndex}
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        // onSelect={onSelectAnswer}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
