import { memo, useCallback, useMemo, useState } from "react";

import IconButton from "../UI/IconButton.jsx";
import MinusIcon from "../UI/Icons/MinusIcon.jsx";
import PlusIcon from "../UI/Icons/PlusIcon.jsx";
import CounterOutput from "./CounterOutput.jsx";
import { log } from "../../log.js";

function isPrime(number) {
  log("Calculating if is prime number", 2, "other");
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}
/*
memo will do is that it will take a look at the props of the your component function(Counter) and whenever the component function(Counter) would normally execute again for example because the App cmoponent execute; memo will take a look at the old prop value and at the new prop value that would be received now if that component function(Counter) would execute and if those prop values are exactly the same which for arrays, objects means that they really have to be exactly the same array or object in memory. If they are the same this component function(Counter) execution will be prevented by memo. So component function(Counter) will only be executed if initialCount change or if it's internal state change that it is not affected by memo. memo only prevents function execution that are triggered by the parent component so the App compoment. It prevent unnessary component execution. memo does not care about internal changes. It only care about parent component doing the change children component. memo don't care about the changes in state of Counter. It only care about changes from parent component. If state in counter is changed the Counter will render and all other child Component(IconButton, CounterOutput) will render  and memo don't care about Counter interal state. It only care about changes made through parent component.
Note:- If blocking a component execution there will also block all child compomemt executions.
*/
// const Counter = memo(function Counter({ initialCount }) {
export default function Counter({ initialCount }) {
  log("<Counter /> rendered", 1);

  //useMemo makes sure that isPrime only get executed if initialCount changed. But it will not get executed if the counter state is changed.
  const initialCountIsPrime = useMemo(
    () => isPrime(initialCount),
    [initialCount]
  );

  const [counter, setCounter] = useState(initialCount);

  const handleDecrement = useCallback(function handleDecrement() {
    setCounter((prevCounter) => prevCounter - 1);
  }, []);

  const handleIncrement = useCallback(function handleIncrement() {
    setCounter((prevCounter) => prevCounter + 1);
  }, []);

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{" "}
        <strong>is {initialCountIsPrime ? "a" : "not a"}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={counter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
    </section>
  );
}
