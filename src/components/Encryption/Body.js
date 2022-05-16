import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Radio } from "antd";
import variables from "assets/variables";
import { useState } from "react";
import KeyWrapper from "./Wrapper/KeyWrapper";
import PlainTextWrapper from "./Wrapper/PlainTextWrapper";

const Wrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const buttonStyle = css`
  background-color: ${variables.colors.mainBlueColor};
  color: ${variables.colors.subWhiteColor};
`;

const visibleStyle = css`
  display: initial;
`;

const invisibleStyle = css`
  display: none;
`;

const Body = () => {
  const [encryptionValue, setEncryptionValue] = useState("");
  const [inputType, setInputType] = useState("");

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <Wrapper>
      <Radio.Group
        value={inputType}
        optionType="button"
        buttonStyle="solid"
        size="large"
        onChange={handleTypeChange}
      >
        <Radio.Button css={buttonStyle} value="plainText">
          Plain Text
        </Radio.Button>
        <Radio.Button css={buttonStyle} value="keyValue">
          Key Value
        </Radio.Button>
      </Radio.Group>
      <Container>
        <PlainTextWrapper
          visibility={inputType === "plainText" ? visibleStyle : invisibleStyle}
        />
        <KeyWrapper
          visibility={inputType === "keyValue" ? visibleStyle : invisibleStyle}
          setEncryptionValue={setEncryptionValue}
        />
      </Container>
    </Wrapper>
  );
};

export default Body;
