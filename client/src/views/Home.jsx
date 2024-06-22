import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import useWebSocket from "react-use-websocket";
import throttle from "lodash.throttle";

import Cursor from "../components/Cursor";

const renderCursors = function (users) {
  return Object.keys(users).map((uuid) => {
    const user = users[uuid];

    return <Cursor key={uuid} point={[user.state.x, user.state.y]} />;
  });
};

const Home = ({ username }) => {
  const WS_URL = "ws://127.0.0.1:8000";
  const THROTTLE = 50;

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    queryParams: { username },
  });

  const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE));

  useEffect(() => {
    sendJsonMessage({
      x: 0,
      y: 0,
    });

    window.addEventListener("mousemove", (e) => {
      sendJsonMessageThrottled.current({
        x: e.clientX,
        y: e.clientY,
      });
    });
  }, [sendJsonMessage]);

  if (lastJsonMessage) {
    return <>{renderCursors(lastJsonMessage)}</>;
  }

  return <h1>Hello {username}</h1>;
};

Home.propTypes = {
  username: PropTypes.string,
};

export default Home;
