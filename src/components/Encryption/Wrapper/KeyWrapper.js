import styled from "@emotion/styled";
import { useState } from "react";
import KeyInput from "./KeyValue/Inputs/KeyInput";
import KeyResult from "./KeyValue/Outputs/KeyResult";

const Wrapper = styled.div`
  padding: 5rem;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
`;

const KeyWrapper = ({ setFinalKey }) => {
  const [keyValue, setKeyValue] = useState(() => {
    return {
      isEmpty: true,
    };
  });

  const handleRener = () => {
    setFinalKey(() => keyValue.finalKey);

    return <KeyResult keyValue={keyValue} />;
  };

  return (
    <Wrapper>
      <KeyInput setKeyValue={setKeyValue} setFinalKey={setFinalKey} />
      {keyValue.isEmpty ? null : handleRener()}
    </Wrapper>
  );
};

export default KeyWrapper;
