import { useEffect, useState } from "react";

//onTimeout -> is the function that should be executed once the timer expired.
export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);
  //useState(timeout)-> Initial value of useState() ki timeout he because it is the remaining time of setTimeout when QuestionTimer component is rendered.
  //We want to set a timer that expired after some time.->setTimeout function
  //ham 'timeout' ki value waha se lege jaha per QuestionTimer component use hoga.
  //timeout hone ke bad hum ko batana padega Parent Component(Quiz) ko because parent component me activeQuestionIndex he. Hame timeout ke bad next question chahiye. To setTimeout me as function call karege jo he onTimeout. onTimeout call arana chahiye browser ke duwara ak bar jab timeout expired ho jaye.

  //setTimeout-> next question ko lane ke liye
  //setInterval-> progress bar change karne ke liye. Isliye state ki bhi jarurat padegi.
  useEffect(() => {
    // setTimeout(()=>{onTimeout},timeout);
    console.log("SETTING TIMEOUT");
    const timer = setTimeout(onTimeout, timeout);
    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]); //We add 2 dependency (timeout, onTimeout) because we are using 2 prop:- timeout, onTimeout inside function of setTimeout() of useEffect() hook. We have to make sure that this effect function gets reexecuted if one of those dependency changes. It makes sense becuase the parent component should decide that the QuestionTimer 'timeout' should change we also want set the timer (setTimeout) and set it again.

  //useEffect is executed again if the surrounding component function (QuestionTimer) is executes again and the dependency values is changed.

  useEffect(() => {
    console.log("SETTING INTERVAL");
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);
  //When we update the setRemainingTime() which we will do at 100ms QuestionTimer executes again and setTimeout timer will be recreated. So therefore we will have multiple timer up and running. So we will useEffect() for setTimeout.
  return (
    <progress
      id="question-time"
      max={timeout}
      value={remainingTime}
      className={mode}
    />
  );
}
