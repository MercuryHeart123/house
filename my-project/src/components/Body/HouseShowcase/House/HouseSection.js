import classes from "./HouseSection.module.css";
import House from "./House";
import { connect } from "react-redux";
import { useEffect } from "react";
const HouseSection = (props) => {
  const createHouse = () => {
    if (props.list) {
      return props.list.map((item, index) => {
        return <House data={item} key={index} />
      })
    }
  }
  return (
    <div className={classes.container}>
      {createHouse()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    list: state.list,
  };
};

export default connect(mapStateToProps)(HouseSection);

