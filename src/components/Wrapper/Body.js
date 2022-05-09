import styled from "@emotion/styled";
import KeyGenerator from "./KeyGenerator";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PlainTextWrapper from "./PlainTextWrapper";

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
  return (
    <TypeSlider {...settings}>
      <PlainTextWrapper />
      <KeyGenerator />
    </TypeSlider>
  );
};

export default Body;
