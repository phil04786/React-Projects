import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef(); //It creates a ref called dialog that will be attached to the native HTML <dialog> element — a built-in HTML tag used to create modal dialogs.

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    //The ref is a reference passed from the parent component (TimerChallenge.js) when it uses the ResultModal component
    // So in this case:
    // ref in useImperativeHandle(...) refers to the dialog ref declared in the parent component.
    // useImperativeHandle(ref, ...) tells React what functions or values the parent should be able to access via that ref.

    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  return createPortal(
    <dialog ref={dialog} className="result-modal" /*open*/>
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>Your Score : {score} </h2>}
      <p>
        The target timer was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemainingTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
