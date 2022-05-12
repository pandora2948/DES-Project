import styled from "@emotion/styled";
import CompressionPermutation from "./ProcessComponents/CompressionPermutation";
import CPDivide from "./ProcessComponents/CPDivide";
import CPShift from "./ProcessComponents/CPShift";
import FinalCPKeys from "./ProcessComponents/FinalCPKeys";
import KeyBits from "./ProcessComponents/KeyBits";

const Wrapper = styled.div``;

const KeyResult = ({
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
      <KeyBits keyBits={keyBits} />
      <CompressionPermutation compressionPermutation={compressionPermutation} />
      <CPDivide CPDivided={{ leftCP, rightCP }} />
      <CPShift CPShifted={{ leftShiftedRounds, rightShiftedRounds }} />
      <FinalCPKeys finalKeys={finalKeys} />
    </Wrapper>
  );
};

export default KeyResult;
