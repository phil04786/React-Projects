//Redux Logic Here:-
// import { createStore } from "redux";

import { createSlice, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import authReducer from "./auth";

// const redux = require("redux");

/*
const counterReducer = (state = initialState, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "increase") {
    return {
      counter: state.counter + action.amount,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "toggle") {
    return {
      showCounter: !state.showCounter,
      counter: state.counter,
    };
  }

  return state;
};
*/
/* Using Switch Case Statement:-  
    const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        counter: state.counter + 1,
      };

    case "increase":
      return {
        ...state,
        counter: state.counter + action.amount,
      };

    case "decrement":
      return {
        ...state,
        counter: state.counter - 1,
      };

    case "toggle":
      return {
        ...state,
        showCounter: !state.showCounter,
      };

    default:
      return state;
  }
};

*/

// const store = redux.createStore(counterReducer);

//const store = createStore(counterSlice.reducer); //single reducer
const store = configureStore({
  // reducer: counterSlice.reducer, //single reducer
  //   reducer: { counter: counterSlice.reducer }, //can have multiple reducer with key:value pair
  // reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
  reducer: { counter: counterReducer, auth: authReducer },
});

export default store;

// store.dispatch({ type: "increment" });
// store.dispatch({ type: "decrement" });
