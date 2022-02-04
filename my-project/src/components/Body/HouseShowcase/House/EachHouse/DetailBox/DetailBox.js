import classes from "./DetailBox.module.css";

const DetailBox = () => {
  return (
    <div className={classes.wraper}>
      <div className={classes.container}>
        <div className={classes.locationSection}>
          <div className={classes.houseLocationDetails}>
            <h2>ที่อยู่</h2>
            <p>ถนนพุทธสาคร ซอยพุทธสาคร14 ตำบลอ้อมน้อย อำเภอกระทุ่มแบน</p>
          </div>
          <div className={classes.locationImgBox}>
            <div
              className={classes.locationImg}
              style={{
                backgroundImage:
                  "url(https://news.pdamobiz.com/wp-content/uploads/2017/12/2017-12-12_16-10-27_914356-google-maps.png)",
              }}
            ></div>
          </div>
        </div>
        <div className={classes.housePropertySection}>
          <h2>ข้อมูลโครงการ</h2>
          <p>
            พื้นที่บ้าน 60ตารางเมตร บ้าน2ชั้น 3ห้องนอน 2ห้องน้ำ พื้นที่บ้าน
            60ตารางเมตร บ้าน2ชั้น 3ห้องนอน 2ห้องน้ำพื้นที่บ้าน 60ตารางเมตร
            บ้าน2ชั้น 3ห้องนอน 2ห้องน้ำ
          </p>
        </div>
        <div className={classes.contactSection}>
          <h2>ติดต่อเรา</h2>
          <p style={{ fontWeight: "500" }}>โทรศัพท์: 085-777-7777</p>
          <p style={{ fontWeight: "500" }}>อีเมล: nhouse@gmail.com</p>
          <p style={{ fontWeight: "500" }}>Line: nhouse@official</p>
        </div>
      </div>
    </div>
  );
};

export default DetailBox;
