import React from "react";
import Carousel from "react-material-ui-carousel";
import Item from "./Item";

function Slider() {
  var items = [
    {
      id: 1,
      image: "1.jpg",
    },
    {
      id: 2,
      image: "2.jpg",
    },
    {
      id: 3,
      image: "4.png",
    },
  ];

  return (
    <Carousel>
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </Carousel>
  );
}

export default Slider;
