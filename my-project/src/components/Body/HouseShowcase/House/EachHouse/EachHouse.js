import DetailBox from "./DetailBox/DetailBox";
import Slider from "./Slider/Slider";
import HouseSection from "../HouseSection";
import { useEffect, useState } from "react";
import imageRunner from "../../../../imageRunner";

const EachHouse = (props) => {
  const [arrImg, setArrImg] = useState([])
  var { data } = props
  useEffect(async () => {
    let tmpArr = []
    for (let i = 0; i < data.path.length; i++) {
      let tmpImg = await imageRunner(data.path[i])
      tmpArr.push(tmpImg)
    }
    setArrImg(tmpArr)
  }, [])
  return (
    <div>
      <Slider />
      <DetailBox />
      {console.log(arrImg)}
      <h2>โครงการอื่นๆ</h2>
      <HouseSection />
    </div>
  );
};

export default EachHouse;
