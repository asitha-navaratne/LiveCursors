import { useState } from "react";
import PropTypes from "prop-types";

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
        />
        <input type="submit" />
      </form>
    </>
  );
};

Login.propTypes = {
  onSubmit: PropTypes.func,
};

export default Login;
