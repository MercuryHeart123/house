import classes from "./FilterSet.module.css";

import Filter from "./Filter";

const Location = ["นครปฐม", "ปทุมธานี", "นนทบุรี", "กรุงเทพ"];
const Price = ["ไม่เกิน 5 ล้าน", "ไม่เกิน 8 ล้าน", "ไม่เกิน 10 ล้าน"];
const Category = ["บ้าน", "คอนโด", "รีสอร์ท"];

const FilterSet = () => {
  return (
    <div className={classes.container}>
      <Filter data={Category} topic={"ประเภทโครงการ"} />
      <Filter data={Price} topic={"ราคา"} />
      <Filter data={Location} topic={"สถานที่"} />
    </div>
  );
};

export default FilterSet;
