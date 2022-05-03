import styled from "@emotion/styled";
import InitialPermutation from "../Output/InitialPermutation";
import IpDivide from "../Output/IpDivide";
import PlainBitOutput from "../Output/PlainBitOutput";

const Wrapper = styled.div``;
const Result = (props) => {
  return (
    <Wrapper>
      <PlainBitOutput plainBit={props.plainBit}></PlainBitOutput>
      <InitialPermutation ip={props.initialPermutation}></InitialPermutation>
      <IpDivide ip={props.initialPermutation}></IpDivide>
    </Wrapper>
  );
};

export default Result;
