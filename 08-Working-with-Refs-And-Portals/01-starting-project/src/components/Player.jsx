import { useRef, useState } from "react";

export default function Player() {
  const playerName = useRef();

  const [enteredPlayerName, setEnteredPlayerName] = useState(null);

  function handleClick() {
    setEnteredPlayerName(playerName.current.value);
    playerName.current.value = ""; //Ref should not be used to set or update.
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? "unknown entity"}</h2>
      <p>
        <input type="text" ref={playerName} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}

/* Ref explaination and will component render on ref value change
import { useRef, useState } from "react";

export default function Player() {
  const playerName = useRef();

  // const [enteredPlayerName, setEnteredPlayerName] = useState(null);

  function handleClick() {
    setEnteredPlayerName(playerName.current.value); // good to get the currently entered in the input field but not good to set or update.
    playerName.current.value = ""; //Ref should not be used to set or update.
  }

  // Note: pehli bar jab Player component chalga to playerName.current.value is undefined he. Next render cycle pe input field se connection hoga then we will be able to read the value (playerName.current.value). So whenever ref={} changes, the component does not get re-render means playerName.current.value in handleClick Function does not get to re-render the UI.

  return (
    <section id="player">
      <h2>
        Welcome{" "}
        {playerName.current ? playerName.current.value : "unknown entity"}
      </h2>
      <p>
        <input type="text" ref={playerName} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
*/

/* Good Updated Code with Logic:-
import { useState } from "react";

export default function Player() {
  const [enteredPlayerName, setEnterredPlayerName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    setSubmitted(false);
    setEnterredPlayerName(event.target.value);
  }

  function handleClick() {
    setSubmitted(true);
  }

  return (
    <section id="player">
      <h2>Welcome {submitted ? enteredPlayerName : "unknown entity"}</h2>
      <p>
        <input type="text" onChange={handleChange} value={enteredPlayerName} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}

*/
