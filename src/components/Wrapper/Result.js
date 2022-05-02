import styled from "@emotion/styled";
import InitialPermutation from "../Output/InitialPermutation";
import PlainBitOutput from "../Output/PlainBitOutput";

const Wrapper = styled.div``;
const Result = (props) => {
  return (
    <Wrapper>
      <PlainBitOutput plainBit={props.plainBit}></PlainBitOutput>
      <InitialPermutation ip={props.initialPermutation}></InitialPermutation>
    </Wrapper>
  );
};

export default Result;
