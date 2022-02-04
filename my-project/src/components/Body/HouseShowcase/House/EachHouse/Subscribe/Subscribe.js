import classes from "./Subscribe.module.css";

const subScribe = () => {
  return (
    <div className={classes.wraper}>
      <div id={classes.content}>
        <h1>รับแจ้งเตือนโครงการใหม่</h1>
        <p>ติดตามข่าวสารจากเรา โครงการใหม่ และ โปรโมชั่น</p>
        <input type="email" placeholder="Email"></input>
        <a href="#" id={classes.button}>
          รับข่าวสาร &raquo;
        </a>
      </div>
    </div>
  );
};

export default subScribe;
