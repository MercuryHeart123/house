import classes from "./House.module.css";

import EachHouse from "./EachHouse/EachHouse";

const House = (props) => {
  const handleClick = (house) => {};

  return (
    <div className={classes.container} onClick={props.onClick}>
      <div
        className={classes.cover}
        style={{
          backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd01bKObdtTNm_h-DCHMlLeZVqSThHU2CK3IX3NFVBoiYfOpK0y4GT4x5Yvnb5bMMx428&usqp=CAU)`,
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
    </div>
  );
};

export default House;
