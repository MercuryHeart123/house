import { useState } from "react";

import classes from "./Overlay.module.css";

const OverlayLinks = (props) => {
  return (
    <div
      className={
        props.shouldShowLinks == 1 ? classes.container : classes.hideContainer
      }
    >
      <div className="nav-links">
        <a href="" target="_blank">
          page1
        </a>
        <a href="" target="_blank">
          page2
        </a>
        <a href="" target="_blank">
          page3
        </a>
        <a href="" target="_blank">
          page4
        </a>
      </div>
    </div>
  );
};

export default OverlayLinks;
