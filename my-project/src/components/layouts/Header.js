import React, { useState } from "react";

import "./Header.css";

const Header = () => {
  const [isNavScroll, setNavScroll] = useState(false);
  const [isNavActive, setIsNavActive] = useState("nav");

  const navScrollingAdjustment = () => {
    if (window.scrollY > 0) {
      setNavScroll(true);
    } else {
      setNavScroll(false);
    }
  };

  window.addEventListener("scroll", navScrollingAdjustment);

  const handleClick = () => {
    if (isNavActive === "nav nav-active") {
      setIsNavActive("nav");
    } else {
      setIsNavActive("nav nav-active");
    }
  };
  return (
    <div className={isNavScroll ? `${isNavActive} nav-scroll` : isNavActive}>
      <input type="checkbox" id="nav-check" />
      <div className="nav-header">
        <div className={isNavScroll ? "nav-title title-scroll" : "nav-title"}>
          Brand
        </div>
      </div>
      <div
        onClick={handleClick}
        className={`${isNavScroll ? "nav-btn btn-scroll" : "nav-btn"}`}
      >
        <label htmlFor="nav-check">
          <span />
          <span />
          <span />
        </label>
      </div>

      <div className="nav-links">
        <div
          className={isNavScroll ? `${isNavActive} nav-scroll` : isNavActive}
        >
          <div className="nav-header">
            <div
              className={
                isNavScroll ? "nav-title titleScrollAndActive" : "nav-title"
              }
            >
              Brand
            </div>
          </div>
          <div
            onClick={handleClick}
            className={isNavScroll ? "nav-btn btnScrollAndActive" : "nav-btn"}
          >
            <label htmlFor="nav-check">
              <span />
              <span />
              <span />
            </label>
          </div>
        </div>
        <div className="linksContainer">
          <a href="" target="_blank">
            เสนอขายที่ดิน
          </a>
          <a href="" target="_blank">
            ดูโครงการ
          </a>
          <a href="" target="_blank">
            ติดตามข่าวสาร
          </a>
          <a href="" target="_blank">
            ติดต่อร่วมงาน
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
