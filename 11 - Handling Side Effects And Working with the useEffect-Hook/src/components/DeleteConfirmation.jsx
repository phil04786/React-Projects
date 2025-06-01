import { useEffect } from "react";
import ProgressBar from "./ProgressBar.jsx";

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  // console.log("Timer Set");

  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm(); //if you are using prop or state value as function you should add them as dependencies
    }, TIMER);

    return () => {
      console.log("Cleaning up timer");
      clearTimeout(timer); //cleanUp function that's executed right before the effect function runs again or right before the DeleteConfirmation dismount. this will reove the timer whenever this DeleteConfirmation dismount. If cleanUp function will run again if effect is run again then the cleanup function runs right before the effect function runs.

      // Note:- Clean up function (return ()=>) does not run right before the effect function is executed before the first time. It is executed only after the subsequent execution of effect function (useEffect) and when this component is removed.

      //We can face "infinite Loop" when adding function as a dependency to useEffect().
    };
  }, [onConfirm]); //if you are using prop or state value as function you should add them as dependencies. Use it as a value. //Note:- onConfirm is a function and adding it as dependency [onConfirm] can create a loop. We are telling React that this effect function should be re-executed whenever this modal component function executed. So to prevent the infinite loop useCallback hook for handleRemovePlace function.This useCallback hook prevents handleRemovePlace function to be create all the time.

  //Note:- onConfirm ={handleRemovePlace} function in javascipt are just values specifically they are objects.
  // handleRemovePlace function is recreated very time this App component function execute because this entire function body then runs again and all the values that are defined in this App component function are recreated whenever the App component function is executed. so handleRemovePlace function is recreated when App is executed since function are objects in javascript a new object is created and in javascript when we create two different objects even if they have the same shape or the same code they are not the same.
  //This comparision code is, in the end, the comparision code executed by REact based onyour useEffect dependencies. It compares the effect dependency values for (in)equality.

  //functions:-
  /*
    function hello() {
      console.log('hello');
    }

    function hello2(){
     console.log('hello);
    }
     
    hello === hello2
    false
 */
  //Objects:-
  /* 
    const a = {
      name:'Max'
    }
    
    const b ={
    name: 'Max'
    }

    a===b
    false
    */

  // So objects and functions are not treated as Equal this onConfirm dependency of this effect (()=> {}) function  in the DeleteConfirmation component will be different between render cycles. Because when the App component rerender when the App function is executed again A Brand New handleRemovePlace function will be created and that function is receive here in DeleteConfirmation React takes a look at this New Value this new function and compare it to the old value old function and it determines that this two values are different so React will re-execute this effect function even though this [onConfirm] dependency did not change.

  //And if onConfirm() as a function is executed in the effect function and you are updating the useState()[setModalIsOpen(false)] again it will trigger an infinite loop. Updating the setModalIsOpen(false) cuases App to render and a Brand New handleRemovePlace function is created and passed to DeleteConfirmation component and therefore their the effect functions runs again which again then trigger the onConfirm() function and so on.

  // We will not face the infinite loop because onConfirm() is called a setupdate is triggered but setModalIsOpen(false) is set to false actually leads to DeleteConfirmation being removed from the DOM becuase it leads to Modal component removing the children from the DOM and the children prop of the Modal component holds this delete confirmation component. We don't enter the infinite loop because the this DeleteConfirmation component disappear.

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar timer={TIMER} />
    </div>
  );
}
