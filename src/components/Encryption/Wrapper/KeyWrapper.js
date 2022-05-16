import styled from "@emotion/styled";
import KeyInput from "./KeyValue/Inputs/KeyInput";
import KeyResult from "./KeyValue/Outputs/KeyResult";

const KeyWrapper = ({ keyValue, setKeyValue, visibility }) => {
  const handleRener = () => {
    return <KeyResult keyValue={keyValue} />;
  };

  const Wrapper = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
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
