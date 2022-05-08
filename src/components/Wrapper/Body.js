import styled from "@emotion/styled";
import PlainTextInput from "../Input/PlainTextInput";
import KeyGenerator from "./KeyGenerator";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PlainTextResult from "./PlainTextResult";
import KeyInput from "../Input/KeyInput";

const Wrapper = styled.div`
  padding: 5rem;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
`;

const TypeSlider = styled(Slider)`
  width: 90%;

  .slick-dots button {
    &::before {
      color: white !important ;
    }
  }
`;

const Body = () => {
  const [plainText, setPlainText] = useState("");
  const [keyValue, setKeyValue] = useState("");

  const settings = {
    dots: true,
    infinite: true,
    swipe: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleEmptyInput = (element, value) => {
    if (value === "") {
      return;
    } else {
      return element;
    }
  };

  return (
    <TypeSlider {...settings}>
      <Wrapper>
        <PlainTextInput setPlainText={setPlainText} />
        {handleEmptyInput(<PlainTextResult plainText={plainText} />, plainText)}
      </Wrapper>
      <Wrapper>
        <KeyInput setKeyValue={setKeyValue}></KeyInput>
        {handleEmptyInput(<KeyGenerator keyValue={keyValue} />, keyValue)}
      </Wrapper>
    </TypeSlider>
  );
};

export default Body;
