import { useState } from "react";

import FilterSet from "./Filter/FilterSet";
import HouseSection from "./House/HouseSection";

import classes from "./HouseShowcase.module.css";

const HouseShowcase = () => {
  return (
    <div className={classes.wraper}>
      <div className={classes.container}>
        <FilterSet />
        <HouseSection />
      </div>
    </div>
  );
};

export default HouseShowcase;
