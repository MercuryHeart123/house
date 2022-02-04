import DetailBox from "./DetailBox/DetailBox";
import Slider from "./Slider/Slider";
import HouseSection from "../HouseSection";

const EachHouse = (props) => {
  return (
    <div>
      <Slider />
      <DetailBox />
      <h2>โครงการอื่นๆ</h2>
      <HouseSection />
    </div>
  );
};

export default EachHouse;
