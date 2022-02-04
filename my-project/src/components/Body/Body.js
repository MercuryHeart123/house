import Introduction from "./Introduction/Introduction";
import HouseShowcase from "./HouseShowcase/HouseShowcase";

import "./Body.css";

function Body() {
  return (
    <div className="body-container">
      <Introduction />
      <HouseShowcase />
    </div>
  );
}

export default Body;
