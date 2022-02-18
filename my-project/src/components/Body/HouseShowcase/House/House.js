import classes from "./House.module.css";

import EachHouse from "./EachHouse/EachHouse";
import { useEffect, useState } from "react";
import { NavLink as Link } from 'react-router-dom';
import imageRunner from "../../../imageRunner";
const House = (props) => {
  const handleClick = (house) => { };
  const [featureImg, setFeatureImg] = useState()
  var { data } = props
  useEffect(async () => {
    var tmpImg = await imageRunner(data.path[0])
    setFeatureImg(tmpImg)
  }, [])
  return (
    <Link className={classes.container} to={`/${data.name}`}>
      <div
        className={classes.cover}
        style={{
          backgroundImage: `url(${featureImg ? featureImg : null})`,
        }}
      >
        <div className={classes.tag}>
          <span>Coming Soon</span>
        </div>
      </div>
      <div className={classes.content}>
        <h3>บ้านเดี่ยว นครปฐม</h3>
        <p>ราคา 4.9 ล้านบาท</p>
      </div>
    </Link>
  );
};

export default House;
