import styled from "@emotion/styled";
import { useState } from "react";
import KeyInput from "./KeyValue/Inputs/KeyInput";
import KeyOutput from "./KeyValue/Outputs/KeyResult";

const Wrapper = styled.div`
  padding: 5rem;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
`;

const KeyWrapper = ({ setFinalKey }) => {
  const [keyValue, setKeyValue] = useState({ isEmpty: true });
  if (!keyValue.isEmpty) {
    setFinalKey(keyValue.finalKeys);
  }

  return (
    <Wrapper>
      <KeyInput keyValue={keyValue} setKeyValue={setKeyValue} />
      {keyValue.isEmpty ? null : <KeyOutput keyValue={keyValue} />}
    </Wrapper>
  );
};

export default KeyWrapper;
