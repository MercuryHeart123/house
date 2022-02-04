import { useState } from "react";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import HomeIcon from "@mui/icons-material/Home";
import classes from "./Filter.module.css";

const FilterTwo = (props) => {
  const [isActive, setIsActive] = useState(false);

  const whichIcon = (topic) => {
    if (topic === "ราคา") {
      return <LocalOfferIcon />;
    } else if (topic === "สถานที่") {
      return <LocationOnIcon />;
    } else {
      return <HomeIcon />;
    }
  };

  let selectedArray = [];

  const handleSelecting = (option) => {
    console.log(selectedArray.includes(option.target.value));

    if (selectedArray.includes(option.target.value)) {
      selectedArray = selectedArray.filter(
        (each) => each != option.target.value
      );
    } else {
      selectedArray.push(option.target.value);
    }
  };

  return (
    <div className={classes.dropdown}>
      <div
        className={classes.dropdownBtn}
        onClick={() => setIsActive(!isActive)}
      >
        {whichIcon(props.topic)}
        {props.topic}
        {isActive ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
      </div>
      <div
        className={`${
          !isActive
            ? " " + classes.dropdownContentDisappaer
            : classes.dropdownContent
        }`}
      >
        {props.data.map((d, i) => (
          <label
            key={i}
            className={`${classes.dropdownItem} ${classes.formControl409}`}
          >
            <input type="checkbox" value={d} onClick={handleSelecting} />
            {d}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterTwo;
