import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import useWebSocket from "react-use-websocket";
import throttle from "lodash.throttle";

import Cursor from "../components/Cursor/Cursor";
import UserIcon from "../components/UserIcon/UserIcon";

import styles from "./Home.module.css";

const renderCursors = function (users, currentUserId) {
  return Object.keys(users)
    .filter((uuid) => uuid !== currentUserId)
    .map((uuid) => {
      const user = users[uuid];

      return (
        <Cursor
          key={uuid}
          point={[user.state.x, user.state.y]}
          username={user.username}
          color={user.color}
        />
      );
    });
};

const renderUsersList = function (users) {
  return (
    <div className={styles["user-list"]}>
      {Object.keys(users).map((uuid) => (
        <UserIcon key={uuid} user={users[uuid]} />
      ))}
    </div>
  );
};

const Home = ({ id, username }) => {
  const WS_URL = "ws://127.0.0.1:8000";
  const THROTTLE = 50;

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    queryParams: { id, username },
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
    return (
      <>
        {renderCursors(lastJsonMessage, id)}
        {renderUsersList(lastJsonMessage)}
      </>
    );
  }

  return <h1>Hello {username}</h1>;
};

Home.propTypes = {
  id: PropTypes.string,
  username: PropTypes.string,
};

export default Home;
