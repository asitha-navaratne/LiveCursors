import { useState } from "react";
import PropTypes from "prop-types";

import styles from "./Login.module.css";

const Login = ({ onSubmit }) => {
  const [username, setUsername] = useState("");

  return (
    <>
      <h1>Welcome!</h1>
      <p>What should people call you?</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(username);
        }}
      >
        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          className={styles["username-input"]}
        />
        <input type="submit" className={styles["submit-button"]} />
      </form>
    </>
  );
};

Login.propTypes = {
  onSubmit: PropTypes.func,
};

export default Login;
