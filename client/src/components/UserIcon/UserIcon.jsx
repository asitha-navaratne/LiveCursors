import { useState } from "react";
import PropTypes from "prop-types";

import styles from "./UserIcon.module.css";

import getTextColorForBackgroundColor from "../../helpers/getTextColorForBackgroundColor";

const UserIcon = ({ user }) => {
  const [isUserDetailsShown, setIsUserDetailsShown] = useState(false);

  const handleShowUserDetails = function () {
    setIsUserDetailsShown(true);
  };

  const handleHideUserDetails = function () {
    setIsUserDetailsShown(false);
  };

  return (
    <div className={styles["user-icon-section"]}>
      <div
        style={{
          backgroundColor: user.color,
          color: getTextColorForBackgroundColor(user.color),
        }}
        className={styles["user-icon"]}
        onMouseEnter={handleShowUserDetails}
        onMouseLeave={handleHideUserDetails}
      >
        {user.username[0]}
      </div>
      <div
        style={{
          visibility: isUserDetailsShown ? "visible" : "hidden",
        }}
        className={styles["user-details"]}
      >
        {user.username}
      </div>
    </div>
  );
};

UserIcon.propTypes = {
  user: PropTypes.object,
};

export default UserIcon;
