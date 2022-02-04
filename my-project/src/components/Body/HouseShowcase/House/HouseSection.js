import classes from "./HouseSection.module.css";
import House from "./House";

const HouseSection = (props) => {
  return (
    <div className={classes.container}>
      <House />
      <House />
      <House />
      <House />
      <House />
      <House />
      <House />
    </div>
  );
};

export default HouseSection;
