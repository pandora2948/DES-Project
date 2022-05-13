import styled from "@emotion/styled";
import variables from "assets/variables";
import { useState } from "react";
import PlainTextInput from "./PlainText/Inputs/PlainTextInput";
import PlainTextResult from "./PlainText/Outputs/PlainTextResult";

const Wrapper = styled.div`
  color: ${variables.colors.subWhiteColor};
  padding: 3rem;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
`;

const handleEmptyInput = (element, value) => {
  if (value === "") {
    return;
  } else {
    return element;
  }
};

const PlainTextWrapper = () => {
  const [plainText, setPlainText] = useState("");

  return (
    <Wrapper>
      <PlainTextInput setPlainText={setPlainText} />
      {handleEmptyInput(<PlainTextResult plainText={plainText} />, plainText)}
    </Wrapper>
  );
};

export default PlainTextWrapper;
