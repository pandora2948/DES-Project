import styled from "@emotion/styled";
import KeyInput from "./KeyValue/Inputs/KeyInput";
import KeyResult from "./KeyValue/Outputs/KeyResult";

const Wrapper = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    ${({ visibility }) => visibility};
  `;

const KeyWrapper = ({ keyValue, setKeyValue, visibility }) => {
  return (
    <Wrapper visibility={visibility}>
      <KeyInput setKeyValue={setKeyValue} />
      {keyValue.isEmpty && <KeyResult keyValue={keyValue} />}
    </Wrapper>
  );
};

export default KeyWrapper;
