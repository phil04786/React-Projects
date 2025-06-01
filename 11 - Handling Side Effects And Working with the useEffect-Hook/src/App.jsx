import { useEffect, useRef, useState, useCallback } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

// Side Effects are "tasks" that don't impact the current component render cycle.
//Side Effects that don't need useEffect()
//This code will run once in the entire application life cycle when the code file is parsed and executed first time.
const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
const storedPlaces = storedIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
);

function App() {
  // const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
  // const storedPlaces = storedIds.map((id) =>
  //   AVAILABLE_PLACES.find((place) => place.id === id)
  // );

  /*

  const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
  const storedPlaces = storedIds.map((id) =>
    AVAILABLE_PLACES.find((place) => place.id === id)
  );
  const modal = useRef();
  const selectedPlace = useRef();
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces); This lines of code works synchrounoushly and does not take some time to finish during which the App coponent function execution would finish. What that means?

ChatGPT said:
Great, you're getting into the core concept of React's render timing and JavaScript execution behavior. Let's unpack your statement carefully:

🔁 Your Code Snippet
js
Copy code
const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
const storedPlaces = storedIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
);
const modal = useRef();
const selectedPlace = useRef();
const [availablePlaces, setAvailablePlaces] = useState([]);
const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);
🧠 Your Key Statement:
"This code works synchronously and does not take time to finish during which the App component function execution would finish."

✅ What This Means (And Why It's True):
Yes — this block is synchronous.

localStorage.getItem() — ✅ synchronous

JSON.parse() — ✅ synchronous

.map() with .find() — ✅ synchronous

useState() call — ✅ synchronous

So, when React calls your App() function, it runs this entire block before moving forward with the render.

There is no async delay, no Promise, no waiting. It completes immediately in JavaScript terms.

🔄 How React Uses It:
React calls the App() component like this:

js
Copy code
const renderedJSX = App();
When this happens:

All your synchronous logic runs (including localStorage access).

React registers the useState values.

React gets the JSX and paints the DOM.

Then React proceeds with useEffect() (if defined).

✅ So What You’re Really Saying:
The component execution (render) does not finish before localStorage access finishes.

That’s absolutely correct — because they happen in the same synchronous execution block.

❗Why This Is Different From useEffect()
If you had done this inside a useEffect():

js
Copy code
useEffect(() => {
  const stored = localStorage.getItem(...);
  setPickedPlaces(...);
}, []);
Then React would:

Finish rendering the component first (with empty pickedPlaces)

Then run the useEffect() after render

That’s the core distinction.

🧠 So in plain English:
Since the localStorage code runs outside useEffect(), it's treated like normal synchronous JavaScript logic, and will fully complete before React completes rendering the component.

This is why your state (pickedPlaces) is correctly initialized during the first render, not updated after it.



  */
  // const modal = useRef();
  const selectedPlace = useRef();
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);
  const [modalIsOpen, setmodalIsOpen] = useState(false);

  //Redundant usage of useEffect() -> Not Recommend
  // useEffect(() => {
  //   const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
  //   const storedPlaces = storedIds.map((id) =>
  //     AVAILABLE_PLACES.find((place) => place.id === id)
  //   );

  //   setPickedPlaces(storedPlaces);
  // }, []);

  //Side Effect:-
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );

      setAvailablePlaces(sortedPlaces);
    });
  }, []);

  function handleStartRemovePlace(id) {
    // modal.current.open();
    setmodalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    // modal.current.close();
    setmodalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    //Side Effects:-
    //Parse->string to array Stringify-> array to string
    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify([id, ...storedIds])
      );
    }
  }

  /*
  ✅ What .some() Does
.some() is a built-in JavaScript array method that:

Tests whether at least one element in the array passes a condition.

Returns true if the condition is true for any element.

Returns false if none of them match.

✅ In plain English:
"If the place is already picked, don’t add it again."


✅ What .find() Does
.find() is a built-in JavaScript array method that:

Searches through an array

Returns the first element that satisfies the condition (the callback returns true)

If no element matches, it returns undefined

🔹 What it does:
Searches through the AVAILABLE_PLACES array

Looks for the first place where the id matches the one passed into the function

So now "place" holds the full object, which you can add to the picked list.

✅ In Plain English:
"Look through the list of all available places and give me the one that has this ID."
*/

  // So to prevent the infinite loop useCallback hook for handleRemovePlace function.This useCallback hook prevents handleRemovePlace function to be create all the time. So useCallback insure that the inner handleRemovePlace function is not re-created instead it store internally in memory and reuse that store function whenever the  component function executes again.

  // You should use callback when passing [onConfirm] function as dependency to useEffect().

  //Callback also has [] which work same as useEffect(()=>{},[]). The [] in callback should receive the state or prop values that are used inside of handleRemovePlace function. There is nothing to be added to [] as we have set updating function "setPickedPlaces" which does not have to be added and using some browser features like localStorage or JSON object which also don't have to be added beaucse they don't trigger this component to be rendered again or anything like that. Its props or state value that should be added here []. Or, just as with useEffect, any other values that in the end depend on state vales( e.g., contect values, other functions).

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    // modal.current.close();
    setmodalIsOpen(false); //If this line commented without using the CallBack function then it will trigger the infinite loop.

    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    localStorage.setItem(
      "selectedPlace",
      JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current))
    );
  }, []);

  /*
  🔍 What it means:
prevPickedPlaces is the current list of picked places (before removal).

.filter(...) goes through each place in the array.
It creates a "new array" that includes only the elements that pass a certain condition.

It keeps only those places whose id is NOT equal to selectedPlace.current.

In short:
It removes the selected place from the list.

*/

  return (
    <>
      <Modal /*ref={modal}*/ open={modalIsOpen}>
        {/* {modalIsOpen && (
          <DeleteConfirmation
            onCancel={handleStopRemovePlace}
            onConfirm={handleRemovePlace}
          />
        )} */}
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          // places={AVAILABLE_PLACES}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
