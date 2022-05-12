import styled from "@emotion/styled";
import CompressionPermutation from "./CompressionPermutation";
import CPDivide from "./CPDivide";
import CPShift from "./CPShift";
import FinalCPKeys from "./FinalCPKeys";

const Wrapper = styled.div``;

const KeyOutput = ({
  keyValue: {
    keyBits,
    compressionPermutation,
    leftCP,
    rightCP,
    leftShiftedRounds,
    rightShiftedRounds,
    finalKeys,
  },
}) => {
  return (
    <Wrapper>
      <keyBits keyBits={keyBits} />
      <CompressionPermutation compressionPermutation={compressionPermutation} />
      <CPDivide CPDivided={{ leftCP, rightCP }} />
      <CPShift CPShifted={{ leftShiftedRounds, rightShiftedRounds }} />
      <FinalCPKeys finalKeys={finalKeys} />
    </Wrapper>
  );
};

export default KeyOutput;
