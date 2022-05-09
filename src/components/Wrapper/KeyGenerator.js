import styled from "@emotion/styled";
import { useState } from "react";
import KeyInput from "../Input/KeyInput";
import KeyOutput from "./KeyOutput";

const Wrapper = styled.div`
  padding: 5rem;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
`;

const KeyGenerator = () => {
  const [keyValue, setKeyValue] = useState({ isEmpty: true });

  return (
    <Wrapper>
      <KeyInput keyValue={keyValue} setKeyValue={setKeyValue} />
      {keyValue.isEmpty ? null : <KeyOutput keyValue={keyValue} />}
    </Wrapper>
  );
};

export default KeyGenerator;
