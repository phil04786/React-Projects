const redux = require("redux");

const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  }
};

const store = redux.createStore(counterReducer);
console.log(store.getState());

const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

store.subscribe(counterSubscriber);

//dispatch an action. Action is javascript Object with a type property. type defines the action to be done in Reducer and it should be distinct

// counterSubscriber ki initial ya default value:- 0 he.
// increment action call hue to counterSubscriber ki value 1 hogaye, phir hum ne dispatch call kar ke state change ki is karna susbsciprion trigger phir ho gaya or decrement action type call hue or counterSubscriber ki value 0 hogaye

store.dispatch({ type: "increment" });
store.dispatch({ type: "decrement" });
