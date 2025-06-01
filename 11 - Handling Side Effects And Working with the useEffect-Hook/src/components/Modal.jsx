import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
/*
const Modal = forwardRef(function Modal({ children }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
      close: () => {
        dialog.current.close();
      },
    };
  });

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
});

export default Modal;
*/
function Modal({ children, open }) {
  const dialog = useRef();

  // useImperativeHandle(ref, () => {
  //   return {
  //     open: () => {
  //       dialog.current.showModal();
  //     },
  //     close: () => {
  //       dialog.current.close();
  //     },
  //   };
  // });

  // Any value that causes the component function to execute again which is the case in end for props and state such a value is dependency if it is used inside of useEffect(), Refs or objects(navigator), methods(location) that are built into the browser are not dependency. useEffect() only care about the dependency that would cause the component function to execute again. Why? Because this useEffect() should run whenever the component function executed if one of its dependency changed. As with empty [] can't have any dependency you can't change. So useEffect() will run [open] whenever the modal component function is executed and the value of the open prop change.

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]); //Note:- open is a prop and adding it as dependency [open] can create a loop. We are telling React that this effect function should be re-executed whenever this modal component function executed and if the "open" value changed. execute this useEffect() if value is changed in the open from to true to false ot false to true or if dependency is a number or string the effect funtion will run again if that number or string changed.

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {open ? children : null}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;
