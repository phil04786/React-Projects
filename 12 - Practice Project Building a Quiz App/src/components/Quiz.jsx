import QUESTIONS from "../questions.js";
import { useCallback, useState } from "react";

// import QuestionTimer from "./QuestionTimer.jsx";
// import Answers from "./Answers.jsx";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  /*
        const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

        Driving Questions from Answers. How?
        userAnswers = ['A','B'] -> 2 answers given(ie.2 questions answered)
        -> the next question shown should be the third question
        -> the index of that next question would be 2 (because indexes start at 0)
        Answers starts with 1,2,3...
        Questions starts with 0,1,2...Indexing as per Answers
        Question start at empty answers array (userAnswers.length):-0 
        Answer:-1 is given and saved in array
        Next Question is derived from array of Answers :-1 
        Answer:-2 is given and saved in array
    */

  // const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]); //If length is 0, it is a 1-Question
  // const [shuffledAnswers, setShuffledAnswers] = useState([]);
  // const activeQuestionIndex = answerState === "" ? userAnswers.length : userAnswers.length - 1; //Questions has been not answer yet; if answered then stick to old question userAnswers.length - 1
  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    // setAnswerState("answered");
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
    /*
      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
    */
  },
  []); //We now have function that are not recreated just because the surrounding component function was executed again.

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        // questionText={QUESTIONS[activeQuestionIndex].text}
        // answers={QUESTIONS[activeQuestionIndex].answers}
        // answerState={answerState}
        // selectedAnswer={userAnswers[userAnswers.length - 1]} //latest answer used in userAnswer
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
