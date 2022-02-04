import React from "react";

import classes from "./Introduction.module.css";

function Introduction() {
  return (
    <div className={classes.container}>
      <div
        className={classes.imageBox}
        style={{
          backgroundImage: `url(https://images.all-free-download.com/images/graphiclarge/holding_house_picture_167874.jpg)`,
        }}
      ></div>
      <div className={classes.textBox}>
        <h1>LOGO</h1>
        <h2 className="header">Work from heart 💖</h2>
        <p className="paragraph">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro vel,
          maxime, sit similique natus id optio dolorem culpa rem nulla qui
          sapiente corrupti iusto dignissimos sed aperiam molestias ex
          recusandae.
        </p>
      </div>
    </div>
  );
}

export default Introduction;
