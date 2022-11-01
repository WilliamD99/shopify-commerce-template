import React, { useContext } from "react";
import deviceContext from "../../../utils/deviceContext";
import Product from "./relatedProduct";

import Slider from "react-slick";
import CustomSlider from "../../common/Slider";

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
    centerMode: true,
    centerPadding: "60px",
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
    <div id="related">
      <CustomSlider data={data} title="Related Products" />
      {/* {handleDisplay()} */}
    </div>
  );
}
