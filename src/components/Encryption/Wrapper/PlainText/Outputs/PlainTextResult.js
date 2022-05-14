import styled from "@emotion/styled";
import ExpensionPermutation from "./ProcessComponents/ExpensionPermutation";
import InitialPermutation from "./ProcessComponents/InitialPermutation";
import IPDivide from "./ProcessComponents/IPDivide";
import PlainBitOutput from "./ProcessComponents/PlainBitOutput";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  > div {
    margin: 2rem 0;
  }
`;

const PlainTextResult = ({
  plainText: { codeBlocks, initialPermutation, dividedPermutation },
}) => {
  return (
    <Wrapper>
      <PlainBitOutput codeBlocks={codeBlocks} />
      <InitialPermutation initialPermutation={initialPermutation} />
      <IPDivide dividedPermutation={dividedPermutation} />
      <ExpensionPermutation initialPermutation={initialPermutation} />
    </Wrapper>
  );
};

export default PlainTextResult;
