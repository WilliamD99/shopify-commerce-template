import React, { useContext } from "react";
import deviceContext from "../../../utils/deviceContext";
import Product from "./relatedProduct";

import Slider from "react-slick";

export default function Related({ data }) {
  const { isMobile } = useContext(deviceContext);
  data = JSON.parse(data.value);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 4,
    slidesToScroll: isMobile ? 1 : 4,
    arrows: true,
    swipeToSlide: true,
  };

  const handleDisplay = () => {
    if (isMobile) {
      return (
        <Slider {...settings} className="mt-5 relative">
          {data.map((e) => (
            <Product key={`related-${e}`} data={e} />
          ))}
        </Slider>
      );
    } else {
      if (data.length > 3) {
        return (
          <Slider {...settings} className="mt-5 relative">
            {data.map((e) => (
              <Product key={`related-${e}`} data={e} />
            ))}
          </Slider>
        );
      } else {
        return (
          <div className={`grid grid-cols-4`}>
            {data.map((e) => (
              <Product key={`related-${e}`} data={e} />
            ))}
          </div>
        );
      }
    }
  };

  return (
    <>
      <p className="text-3xl font-semibold mb-8">Related Products</p>

      {handleDisplay()}
    </>
  );
}
