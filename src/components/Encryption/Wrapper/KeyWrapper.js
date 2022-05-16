import styled from "@emotion/styled";
import { useState } from "react";
import KeyInput from "./KeyValue/Inputs/KeyInput";
import KeyResult from "./KeyValue/Outputs/KeyResult";

const KeyWrapper = ({ visibility, setEncryptionValue }) => {
  const [keyValue, setKeyValue] = useState(() => {
    return {
      isEmpty: true,
    };
  });

  const handleRener = () => {
    setEncryptionValue(() => keyValue.finalKey);

    return <KeyResult keyValue={keyValue} />;
  };

  const Wrapper = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    width: 100%;
    position: absolute;
    ${visibility}
  `;

  return (
    <Wrapper>
      <KeyInput setKeyValue={setKeyValue} />
      {keyValue.isEmpty ? null : handleRener()}
    </Wrapper>
  );
};

export default KeyWrapper;
