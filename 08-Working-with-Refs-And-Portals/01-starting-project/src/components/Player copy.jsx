import { useState } from "react";

export default function Player() {
  const [enteredPlayerName, setEnteredPlayerName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [playerName, setPlayerName] = useState("");

  function handleChange(event) {
    // setEnteredPlayerName(event.target.value);
    const value = event.target.value;
    setEnteredPlayerName(value);

    // If input is cleared after submission, reset playerName
    if (submitted && value.trim() === "") {
      setPlayerName(""); // so that heading shows 'unknown entity'
    }
  }

  function handleClick() {
    if (enteredPlayerName.trim() === "") {
      alert("Please enter a name before submitting.");
      return;
    }
    setPlayerName(enteredPlayerName);
    setSubmitted(true);
  }

  return (
    <section id="player">
      {/* <h2>Welcome {submitted ? enteredPlayerName : "unknown entity"}</h2> */}
      {/* <h2>Welcome {submitted ? playerName : "unknown entity"}</h2> */}
      <h2>
        Welcome{" "}
        {submitted &&
          (playerName.trim() === "" ? "unknown entity" : playerName)}
      </h2>
      <p>
        <input type="text" onChange={handleChange} value={enteredPlayerName} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
