import { forwardRef } from "react";
import Zoom from "@mui/material/Zoom";

const Transition = forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

export default Transition;
