import styled from "@emotion/styled";
import { useState } from "react";
import PlainTextInput from "../Input/PlainTextInput";
import PlainTextResult from "./PlainTextResult";

const Wrapper = styled.div`
  padding: 5rem;
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
      {" "}
      <PlainTextInput setPlainText={setPlainText} />
      {handleEmptyInput(<PlainTextResult plainText={plainText} />, plainText)}
    </Wrapper>
  );
};

export default PlainTextWrapper;
