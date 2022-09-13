import React from "react";
import Product from "./relatedProduct";

import Slider from 'react-slick'

export default function Related({ data }) {
  data = JSON.parse(data.value);

  const settings = {
    // infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true
  }

  return (
    <>
      <Slider {...settings} className="mt-5">
        {data.map((e) => (
          <Product key={e} data={e} />
        ))}
      </Slider>
    </>
  );
}
