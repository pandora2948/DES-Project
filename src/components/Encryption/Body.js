import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Radio } from "antd";
import variables from "assets/variables";
import { useState } from "react";
import EncryptionWrapper from "./Wrapper/EncryptionWrapper";
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
  margin-top: 2rem;
  position: relative;
`;

const buttonStyle = css`
  background-color: ${variables.colors.mainBlueColor};
`;

const plainTextButtonStyle = css`
  ${buttonStyle}
  color: ${variables.colors.subWhiteColor};
`;

const keyValueButtonStyle = css`
  ${buttonStyle}
  color: ${variables.colors.keyColorRed};
`;

const visibleStyle = css`
  display: initial;
`;

const invisibleStyle = css`
  display: none;
`;

const Body = ({ isEncryption }) => {
  const [inputType, setInputType] = useState();
  const [plainText, setPlainText] = useState({ isEmpty: true });
  const [keyValue, setKeyValue] = useState({ isEmpty: true });

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
        <Radio.Button css={plainTextButtonStyle} value="plainText">
          Plain Text
        </Radio.Button>
        <Radio.Button css={keyValueButtonStyle} value="keyValue">
          Key Value
        </Radio.Button>
      </Radio.Group>
      <Container>
        <PlainTextWrapper
          plainText={plainText}
          setPlainText={setPlainText}
          isEncryption={isEncryption}
          visibility={inputType === "plainText" ? visibleStyle : invisibleStyle}
        />
        <KeyWrapper
          keyValue={keyValue}
          setKeyValue={setKeyValue}
          visibility={inputType === "keyValue" ? visibleStyle : invisibleStyle}
        />
      </Container>
      {!plainText.isEmpty && !keyValue.isEmpty && (
        <EncryptionWrapper
          keyValue={keyValue}
          plainText={plainText}
          isEncryption={isEncryption}
        />
      )}
    </Wrapper>
  );
};

export default Body;
