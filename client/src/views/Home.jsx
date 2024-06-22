import PropTypes from "prop-types";

const Home = ({ username }) => {
  return <h1>Hello {username}</h1>;
};

Home.propTypes = {
  username: PropTypes.string,
};

export default Home;
