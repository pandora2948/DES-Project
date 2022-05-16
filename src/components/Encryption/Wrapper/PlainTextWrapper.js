import { css } from "@emotion/react";
import styled from "@emotion/styled";
import variables from "assets/variables";
import { useState } from "react";
import PlainTextInput from "./PlainText/Inputs/PlainTextInput";
import PlainTextResult from "./PlainText/Outputs/PlainTextResult";

const PlainTextWrapper = ({ visibility }) => {
  const [plainText, setPlainText] = useState({ isEmpty: true });

  const Wrapper = styled.div`
    color: ${variables.colors.subWhiteColor};
    margin-top: 2rem;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    position: absolute;
    width: 100%;
    ${visibility};
  `;

  console.log(plainText);

  return (
    <Wrapper>
      <PlainTextInput setPlainText={setPlainText} />
      {plainText.isEmpty ? null : <PlainTextResult plainText={plainText} />}
    </Wrapper>
  );
};

export default PlainTextWrapper;
