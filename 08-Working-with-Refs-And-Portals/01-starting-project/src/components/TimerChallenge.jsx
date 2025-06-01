import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

// let timer; Won't Work because every TimerChallenge component will get it and will change it's values.
export default function TimerChallenge({ title, targetTime }) {
  // let timer; Won't Work because TimerChallenge component will render on state change and its value will be Lost.
  const timer = useRef(); //It is component specific and each TimerChallenge component will get it's specific ref. Ref will not reset when the component execute or render and setting ref value does not render the TimerChallenge component.
  const dialog = useRef();
  // const [timerStarted, setTimerStarted] = useState(false);
  // const [timerExpired, setTimerExpired] = useState(false);

  // function handleStart() {
  //   timer.current = setTimeout(() => {
  //     setTimerExpired(true);
  //     dialog.current.open();
  //   }, targetTime * 1000);
  //   setTimerStarted(true);
  // }

  // function handleStop() {
  //   clearTimeout(timer.current);
  // }
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  // Timer Active Check
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  // True if the timer has started but not yet completed.

  // This flag controls button label and message display.

  // Timer Completion Logic
  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    // setTimeRemaining(targetTime * 1000);
    dialog.current.open();
  }
  //   When timeRemaining hits 0 or below, the timer:

  // Stops (clearInterval)

  // Resets (setTimeRemaining)

  // Opens the modal via ref.

  /* Note:-
  Why Use useEffect?
Using if (timeRemaining <= 0) directly inside the body of the component is risky because:

It runs on every render, which can cause infinite loops or unexpected behavior.

React recommends using useEffect for side effects like timers, DOM manipulation, or async tasks.
  */
  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }
  // Start Button Handler
  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }
  /*
  Then:

After 10 ms → timeRemaining = 990

After 20 ms → timeRemaining = 980

After 30 ms → timeRemaining = 970

...

After 1 second (1000 ms) → timeRemaining = 0

🖥️ What the UI Actually Shows
React re-renders every time setTimeRemaining updates the state. But browsers can't update the screen 100 times per second (every 10ms). Most monitors and browsers refresh at 60Hz — that's once every ~16.67ms.

So instead of seeing every single step, you may only see updates like this:

python-repl
Copy
Edit
1000 ms remaining
980 ms remaining
960 ms remaining
940 ms remaining
...
The numbers may skip some steps visually (like from 1000 → 980 → 960), even though the state is being updated properly every 10ms.

📊 60Hz = 60 Frames Per Second
"60Hz" means the display refreshes 60 times per second.

To get how long each frame takes:

1000
 ms (1 second)
60
≈
16.67
 ms
60
1000 ms (1 second)
​
 ≈16.67 ms
So, the browser tries to update the screen once every 16.67 milliseconds.

🕹️ Why This Matters for Timers
If you're using a very fast timer like:

js
Copy
Edit
setInterval(() => {
  updateSomething();
}, 10);
That means you're trying to update something every 10ms, which is faster than the screen can refresh (16.67ms). So:

The code runs every 10ms, yes.

But the user only sees updates every ~16.67ms (i.e. some updates are skipped visually).

This is why in practice, if you log something every 10ms, you'll see all the logs in the console — but on screen, the values will appear to “skip” numbers.

🎯 Takeaway
60Hz means your screen updates once every ~16.67ms.

Even if you update a value more frequently (like every 1ms or 10ms), the user can only see changes about 60 times per second.

For UI animations or timers, updating every 16ms is plenty — and anything more frequent is usually overkill for visuals.
*/

  // Starts the countdown by subtracting 10ms every 10ms.

  // Saves the interval ID into timer.current so we can stop it later.

  // Stop Button Handler
  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }
  return (
    <>
      {/* {timerExpired && ( */}
      {/* <ResultModal ref={dialog} targetTime={targetTime} result="lost" /> */}
      {/* )} */}
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />

      <section className="challenge">
        <h2>{title}</h2>
        {/* {timerExpired && <p>You lost!</p>} */}
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
