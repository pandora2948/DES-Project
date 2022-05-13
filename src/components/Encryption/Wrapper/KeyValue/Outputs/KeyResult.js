import styled from "@emotion/styled";
import CompressionPermutation from "./ProcessComponents/CompressionPermutation";
import CPShift from "./ProcessComponents/CPShift";
import FinalKeys from "./ProcessComponents/FinalKeys";
import KeyBits from "./ProcessComponents/KeyBits";

const Wrapper = styled.div``;

const KeyResult = ({
  keyValue: { keyBits, compressionPermutation, shiftedRounds, finalKeys },
}) => {
  return (
    <Wrapper>
      <KeyBits keyBits={keyBits} />
      <CompressionPermutation compressionPermutation={compressionPermutation} />
      <CPShift shiftedRounds={shiftedRounds} />
      <FinalKeys finalKeys={finalKeys} />
    </Wrapper>
  );
};

export default KeyResult;
