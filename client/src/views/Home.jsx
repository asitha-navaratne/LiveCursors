import { useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";
import throttle from "lodash.throttle";

import PropTypes from "prop-types";

const Home = ({ username }) => {
  const WS_URL = "ws://127.0.0.1:8000";
  const THROTTLE = 50;

  const { sendJsonMessage } = useWebSocket(WS_URL, {
    queryParams: { username },
  });

  const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE));

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      sendJsonMessageThrottled.current({
        x: e.clientX,
        y: e.clientY,
      });
    });
  }, []);

  return <h1>Hello {username}</h1>;
};

Home.propTypes = {
  username: PropTypes.string,
};

export default Home;
