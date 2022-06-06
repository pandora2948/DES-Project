import styled from "@emotion/styled";
import ExpensionPermutation from "./ProcessComponents/ExpensionPermutation";
import InitialPermutation from "./ProcessComponents/InitialPermutation";
import IPDivide from "./ProcessComponents/IPDivide";
import PlainBitOutput from "./ProcessComponents/PlainBitOutput";
import { Collapse } from "antd";
import variables from "assets/variables";

const { Panel } = Collapse;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4rem 0;
`;

const StyledCollapse = styled(Collapse)`
  background-color: ${variables.colors.mainBlueColor};
  color: ${variables.colors.subWhiteColor};

  div {
    border-color: ${variables.colors.subWhiteColor} !important;
    background-color: ${variables.colors.mainBlueColor} !important;
    color: ${variables.colors.subWhiteColor} !important;
  }
`;

const PlainTextResult = ({
  plainText: {
    codeBlocks,
    initialPermutations,
    dividedPermutations,
    expensionPermutations,
  },
}) => {
  return (
    <Wrapper>
      <StyledCollapse bordered={false} accordion>
        <Panel header="Plain Bit Output">
          <PlainBitOutput codeBlocks={codeBlocks} />
        </Panel>
        <Panel header="Initial Permutation">
          <InitialPermutation initialPermutations={initialPermutations} />
        </Panel>
        <Panel header="Initial permutation Divided">
          <IPDivide dividedPermutations={dividedPermutations} />
        </Panel>
        <Panel header="Expension Permutation">
          <ExpensionPermutation expensionPermutations={expensionPermutations} />
        </Panel>
      </StyledCollapse>
    </Wrapper>
  );
};

export default PlainTextResult;
