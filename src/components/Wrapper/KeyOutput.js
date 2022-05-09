import styled from "@emotion/styled";
import CompressionPermutation from "../Output/CompressionPermutation";
import CPDivide from "../Output/CPDivide";
import CPShift from "../Output/CPShift";
import KeyBits from "../Output/KeyBits";

const Wrapper = styled.div``;

const KeyOutput = ({
  keyValue: {
    keyBits,
    compressionPermutation,
    leftCP,
    rightCP,
    leftShiftedRounds,
    rightShiftedRounds,
  },
}) => {
  return (
    <Wrapper>
      <KeyBits keyBits={keyBits} />
      <CompressionPermutation compressionPermutation={compressionPermutation} />
      <CPDivide CPDivided={{ leftCP, rightCP }} />
      <CPShift CPShifted={{ leftShiftedRounds, rightShiftedRounds }} />
    </Wrapper>
  );
};

export default KeyOutput;
