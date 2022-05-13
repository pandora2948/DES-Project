import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import PlainTextWrapper from "./Wrapper/PlainTextWrapper";
import KeyWrapper from "./Wrapper/KeyWrapper";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

const TypeSlider = styled(Slider)`
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
  const [encryptionValue, setEncryptionValue] = useState("");

  return (
    <Wrapper>
      <TypeSlider {...settings}>
        <PlainTextWrapper />
        <KeyWrapper setEncryptionValue={setEncryptionValue} />
      </TypeSlider>
    </Wrapper>
  );
};

export default Body;
