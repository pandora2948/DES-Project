import styled from "@emotion/styled";
import PlainTextInput from "../Input/PlainTextInput";
import { useState } from "react";
import Result from "./Result";

const Wrapper = styled.div`
  width: 60%;
  display: flex;
  flex-flow: column wrap;
`;

const Body = () => {
  const [plainText, setPlainText] = useState("");
  const [plainBit, setPlainBit] = useState("");
  const [initialPermutation, setInitialPermutation] = useState("");
  return (
    <Wrapper>
      <PlainTextInput
        inputValue={plainText}
        modifyPlainBit={setPlainBit}
        modifyInputValue={setPlainText}
        modifyInitialPermutation={setInitialPermutation}
      ></PlainTextInput>
      {plainText !== "" ? (
        <Result
          plainBit={plainBit}
          initialPermutation={initialPermutation}
        ></Result>
      ) : null}
    </Wrapper>
  );
};

export default Body;
