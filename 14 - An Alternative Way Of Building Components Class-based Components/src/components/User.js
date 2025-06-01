import classes from "./User.module.css";

function User(props) {
  return <li className={classes.user}>{props.name}</li>;
}

export default User;
