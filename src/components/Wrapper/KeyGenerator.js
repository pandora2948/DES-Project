import styled from "@emotion/styled";
import KeyBits from "../Output/KeyBits";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const KeyGenerator = (props) => {
  const { keyValue } = props;
  return (
    <Wrapper>
      <KeyBits keyValue={keyValue} />
    </Wrapper>
  );
};

export default KeyGenerator;
