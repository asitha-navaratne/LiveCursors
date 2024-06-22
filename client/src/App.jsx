import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Login from "./components/Login/Login";
import Home from "./views/Home";

function App() {
  const [username, setUsername] = useState("");

  const uuid = uuidv4();

  return username ? (
    <Home id={uuid} username={username} />
  ) : (
    <Login onSubmit={setUsername} />
  );
}

export default App;
