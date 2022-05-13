import styled from "@emotion/styled";
import { useState } from "react";
import KeyInput from "./KeyValue/Inputs/KeyInput";
import KeyResult from "./KeyValue/Outputs/KeyResult";

const Wrapper = styled.div`
  padding: 3rem;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
`;

const KeyWrapper = ({ setEncryptionValue }) => {
  const [keyValue, setKeyValue] = useState(() => {
    return {
      isEmpty: true,
    };
  });

  const handleRener = () => {
    setEncryptionValue(() => keyValue.finalKey);

    return <KeyResult keyValue={keyValue} />;
  };

  return (
    <Wrapper>
      <KeyInput setKeyValue={setKeyValue} />
      {keyValue.isEmpty ? null : handleRener()}
    </Wrapper>
  );
};

export default KeyWrapper;
