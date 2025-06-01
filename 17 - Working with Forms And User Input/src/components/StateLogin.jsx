import { useState } from "react";
import Input from "./Input.jsx";

import { isEmail, isNotEmpty, hasMinLength } from "../util/validation.js";
import { useInput } from "../hooks/useInput.js";

export default function Login() {
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [enteredPassword, setEnteredPassword] = useState("");

  // const [enteredValues, setEnteredValues] = useState({
  //   email: "",
  //   // email: {value:'',didEdit:false},       state for event-> onBlur
  //   password: "",
  // });

  // // const [errors, setErrors] = useState({ email: null, password: null });

  // const [didEdit, setDidEdit] = useState({
  //   email: false,
  //   password: false,
  // });

  // const emailIsInvalid = didEdit.email && !enteredValues.email.includes("@");
  // const emailIsInvalid =
  //   didEdit.email &&
  //   !isEmail(enteredValues.email) &&
  //   !isNotEmpty(enteredValues.email);

  // const passwordIsInvalid =
  //   didEdit.password && enteredValues.password.trim().length < 6;

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", (value) => hasMinLength(value, 6));

  // const passwordIsInvalid =
  //   didEdit.password && !hasMinLength(enteredValues.password, 6);

  /* Explanation:

This checks whether an email is considered invalid based on a simple rule: if the email is not an empty string and does not include an "@" symbol, then it is invalid.

Evaluation Logic
enteredValues.email !== "": Ensures the user has entered something.

!enteredValues.email.includes("@"): Checks that the input doesn't contain an "@".

If both conditions are true, the email is flagged as invalid.
 */
  // const emailIsInvalid =
  //   enteredValues.email !== "" && !enteredValues.email.includes("@");

  //for onBlur Logic: If the user did edit the email and the email does not include '@' then we set emailIsInvalid to true.
  // const emailIsInvalid = didEdit.email && !enteredValues.email.includes("@");

  // function validate() {
  //   const emailError = !enteredValues.email.includes("@")
  //     ? "Please enter a valid email"
  //     : null;

  //   const passwordError =
  //     enteredValues.password.trim() === "" ? "Password is required" : null;

  //   setErrors({ email: emailError, password: passwordError });

  //   return !emailError && !passwordError; // return true if no errors
  // }
  function handleSubmit(event) {
    event.preventDefault();
    // console.log(enteredValues);

    if (emailHasError || passwordHasError) {
      return;
    }

    console.log(emailValue, passwordValue); //can send make to backend

    //Reset Value
    // setEnteredValues({
    //   email: "",
    //   password: "",
    // });
    // setDidEdit({ email: true, password: true });

    // if (!validate()) {
    //   // Don't proceed if validation failed
    //   return;
    // }

    // Safe to submit form
    // console.log("Form submitted:", enteredValues);

    // Reset values
    // setEnteredValues({ email: "", password: "" });
    // setErrors({ email: null, password: null });
  }

  // function handleEmailChange(event) {
  //   setEnteredEmail(event.target.value);
  // }

  // function handlePassword(event) {
  //   setEnteredPassword(event.target.value);
  // }

  // function handleInputChange(identifier, value) {
  //   setEnteredValues((prevValues) => ({
  //     ...prevValues,
  //     [identifier]: value,
  //   }));
  //   setDidEdit((prevEdit) => ({
  //     ...prevEdit,
  //     [identifier]: false,
  //   }));
  // }

  // function handleInputBlur(identifier) {
  //   setDidEdit((prevEdit) => ({
  //     ...prevEdit,
  //     [identifier]: true,
  //   }));
  // }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          // onBlur={() => handleInputBlur("email")}
          onBlur={handleEmailBlur}
          // value={enteredValues.email}
          value={emailValue}
          // onChange={(event) => handleInputChange("email", event.target.value)}
          onChange={handleEmailChange}
          // error={emailIsInvalid && "Please enter a valid email!"}
          error={emailHasError && "Please enter a valid email!"}
        />
        {/* <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" />
          <div className="control-error">
            {/* {emailIsInvalid && <p>Please enter a valid email address</p>} */}
        {/* {didEdit.email && errors.email && <p>{errors.email}</p>} */}
        {/* </div> */}
        {/* </div>  */}

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          // value={enteredValues.password}
          value={passwordValue}
          // onChange={(event) =>
          //   handleInputChange("password", event.target.value)
          // }
          onChange={handlePasswordChange}
          // onBlur={() => handleInputBlur("password")}
          onBlur={handlePasswordBlur}
          // error={passwordIsInvalid && "Please enter a valid password!"}
          error={passwordHasError && "Please enter a valid password!"}
        />
        {/* 
        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
          <div className="control-error">
            {/* {emailIsInvalid && <p>Please enter a valid email address</p>} */}
        {/* {didEdit.password && errors.password && <p>{errors.password}</p>} */}
        {/* </div> */}
        {/* </div> */}
      </div>

      <p className="form-actions">
        <button
          className="button button-flat"
          type="button"
          onClick={() => {
            setEnteredValues({ email: "", password: "" });
            // setErrors({ email: null, password: null });
            setDidEdit({ email: false, password: false });
          }}
        >
          Reset
        </button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
