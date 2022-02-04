import React, { useState, useRef, useEffect } from "react";

import OverlayLinks from "./OverlayLinks";
import "./SuperNav.css";

const SuperNav = () => {
  const navCheck = useRef();
  const [isNavScroll, setNavScroll] = useState(false);
  const [isNavActive, setIsNavActive] = useState("nav");
  const [shouldShowLinks, setShouldShowLinks] = useState(0);

  const handleClick = () => {
    if (isNavActive === "nav nav-active") {
      setIsNavActive("nav");
    } else {
      setIsNavActive("nav nav-active");
    }
  };

  const navScrollingAdjustment = () => {
    if (window.scrollY > 0) {
      setNavScroll(true);
    } else {
      setNavScroll(false);
    }
  };

  window.addEventListener("scroll", navScrollingAdjustment);

  useEffect(() => {
    console.log(shouldShowLinks);
  }, [shouldShowLinks]);

  return (
    <React.Fragment>
      <div className={isNavScroll ? `${isNavActive} nav-scroll` : isNavActive}>
        <div className="nav-header">
          <div className={isNavScroll ? "nav-title title-scroll" : "nav-title"}>
            Brand
          </div>
        </div>
        <input type="checkbox" id="nav-check" ref={navCheck} />
        <div
          onClick={handleClick}
          className={`${isNavScroll ? "nav-btn btn-scroll" : "nav-btn"}`}
        >
          <label
            htmlFor="nav-check"
            onClick={() => {
              {
                navCheck.current.value == 0
                  ? (navCheck.current.value = 1)
                  : (navCheck.current.value = 1);
              }
              setShouldShowLinks(navCheck.current.value);
            }}
          >
            <span />
            <span />
            <span />
          </label>
        </div>
      </div>
      <OverlayLinks shouldShowLinks={shouldShowLinks} />
    </React.Fragment>
  );
};

export default SuperNav;
