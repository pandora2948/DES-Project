import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import PlainTextWrapper from "./Wrapper/PlainTextWrapper";
import KeyWrapper from "./Wrapper/KeyWrapper";

const TypeSlider = styled(Slider)`
  width: 90%;

  .slick-dots button {
    &::before {
      color: white !important ;
    }
  }
`;

const settings = {
  dots: true,
  infinite: true,
  swipe: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Body = () => {
  const [finalKey, setFinalKey] = useState("");
  return (
    <TypeSlider {...settings}>
      <PlainTextWrapper finalKey={finalKey} />
      <KeyWrapper setFinalKey={setFinalKey} />
    </TypeSlider>
  );
};

export default Body;
