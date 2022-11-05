import React from "react";
import CustomSlider from "../../common/Slider";

export default function Related({ data }) {
  data = JSON.parse(data.value);

  return (
    <div id="related">
      <CustomSlider data={data} title="Related Products" type="id" />
    </div>
  );
}
