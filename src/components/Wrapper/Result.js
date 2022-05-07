import styled from "@emotion/styled";
import InitialPermutation from "../Output/InitialPermutation";
import IpDivide from "../Output/IpDivide";
import PlainBitOutput from "../Output/PlainBitOutput";

const Wrapper = styled.div``;
const Result = (props) => {
  const { plainBit, initialPermutation } = props;
  return (
    <Wrapper>
      <PlainBitOutput plainBit={plainBit} />
      <InitialPermutation ip={initialPermutation} />
      <IpDivide ip={initialPermutation} />
    </Wrapper>
  );
};

export default Result;
