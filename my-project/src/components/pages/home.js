import React from "react";
import HeroSection from "../Hero/HeroSection.js";
import Body from "../Body/Body";
import { connect } from "react-redux";
const Home = (props) => {
  return (
    <div>
      {console.log(props.list[0])}
      <HeroSection />
      <Body />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    list: state.list,
  };
};
export default connect(mapStateToProps)(Home);
