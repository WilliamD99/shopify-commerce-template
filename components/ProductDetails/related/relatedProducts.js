import React from "react";
import Product from "./relatedProduct";

import Slider from "react-slick";

export default function Related({ data }) {
  data = JSON.parse(data.value);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    swipeToSlide: true,
  };
  console.log(data);
  return (
    <>
      {data.length > 3 ? (
        <Slider {...settings} className="mt-5 relative">
          {data.map((e) => (
            <Product key={`related-${e}`} data={e} />
          ))}
        </Slider>
      ) : (
        <div className="grid grid-cols-4 space-x-2">
          {data.map((e) => (
            <Product key={`related-${e}`} data={e} />
          ))}
        </div>
      )}
    </>
  );
}
