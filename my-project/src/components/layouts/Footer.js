import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={classes.container}>
      <div className={classes.linkContent}>
        <a href="">รับข่าวสาร</a>
        <a href="">ร่วมงานกับเรา</a>
        <a href="">เสนอขายที่ดิน</a>
        <a href="">ติดต่อเรา</a>
      </div>
      <div className={classes.socialmediaContent}>
        <a href="">Facebook</a>
        <a href="">Instagram</a>
        <a href="">Pinterest</a>
      </div>
    </div>
  );
};

export default Footer;
