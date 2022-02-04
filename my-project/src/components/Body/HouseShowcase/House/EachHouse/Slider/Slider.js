import React, { useState } from "react";
import "./Slider.css";
import BtnSlider from "./BtnSlider";
const dataSlider = [
  {
    id: 1,
    title: "Lorem ipsum",
    subTitle: "Lorem",
    imgUrl:
      "https://images.unsplash.com/photo-1556983852-43bf21186b2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    title: "Lorem ipsum",
    subTitle: "Lorem",
    imgUrl:
      "https://thumbs.dreamstime.com/b/classic-house-flower-garden-751996.jpg",
  },
  {
    id: 3,
    title: "Lorem ipsum",
    subTitle: "Lorem",
    imgUrl:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80",
  },
  {
    id: 4,
    title: "Lorem ipsum",
    subTitle: "Lorem",
    imgUrl:
      "https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041__340.jpg",
  },
  {
    id: 5,
    title: "Lorem ipsum",
    subTitle: "Lorem",
    imgUrl:
      "https://img.freepik.com/free-photo/house-isolated-field_1303-23773.jpg?size=626&ext=jpg",
  },
  {
    id: 6,
    title: "Lorem ipsum",
    subTitle: "Lorem",
    imgUrl:
      "https://thumbs.dreamstime.com/b/luxury-big-modern-house-electric-car-luxury-modern-house-electric-car-141295838.jpg",
  },
];

export default function Slider() {
  const [slideIndex, setSlideIndex] = useState(1);

  const nextSlide = () => {
    if (slideIndex !== dataSlider.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === dataSlider.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(dataSlider.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  return (
    <div className="container-slider">
      {dataSlider.map((obj, index) => {
        return (
          <div
            key={obj.id}
            className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
          >
            <img src={obj.imgUrl} />
          </div>
        );
      })}
      <BtnSlider
        style={{ backGroundColor: "green" }}
        moveSlide={nextSlide}
        direction={"next"}
      />
      <BtnSlider
        style={{ backGroundColor: "green" }}
        moveSlide={prevSlide}
        direction={"prev"}
      />

      <div className="container-dots">
        {Array.from({ length: 6 }).map((item, index) => (
          <div
            key={index}
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? "dot active" : "dot"}
          ></div>
        ))}
      </div>
    </div>
  );
}
