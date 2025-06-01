import { useRef } from "react";

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledAnswers = useRef();
  if (!shuffledAnswers.current) {
    //shuffledAnswers.current is undefined means not truthy means I know that I don't have any shuffled answers yet because that will be the initial state that it is undefined.
    // const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.current = [...answers];
    /*
  shuffledAnswers.sort((a,b) => -1) Those elements will be swapped
  shuffledAnswers.sort((a,b) => 1)Those elements will not be swapped stay in the order they are.
  sort will go through all the elements pair by pair in shuffledAnswers Array to drive a new order. Math.random() will give number from 0 to 1(excluding) so some time positive some time negative
  */
    // shuffledAnswers.sort(() => Math.random() - 0.5);
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {/* {QUESTIONS[activeQuestionIndex].answers.map((answer) => ( */}
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer; //userAnsers se pata chalega ki last me kon sa answer pick kara he.four answers me se kon sa answer choose kara he. 'answer' ko currenlty ouput kone wala he.
        let cssClass = "";

        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }
        return (
          <li key={answer} className="answer">
            {/* classname should be an empty string if the answer has not been selected yet; it should be selected let say if it has being selected and it should be correct if it was selected and is correct and wrong if it was selected and is wrong*/}
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
