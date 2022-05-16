import styled from "@emotion/styled";
import { Collapse } from "antd";
import variables from "assets/variables";
import CompressionPermutation from "./ProcessComponents/CompressionPermutation";
import CPShift from "./ProcessComponents/CPShift";
import FinalKeys from "./ProcessComponents/FinalKeys";
import KeyBits from "./ProcessComponents/KeyBits";

const { Panel } = Collapse;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  > div {
    margin: 2rem 0;
  }
`;

const StyledCollapse = styled(Collapse)`
  background-color: ${variables.colors.mainBlueColor};
  color: ${variables.colors.keyColorBrightRed};

  div {
    border-color: ${variables.colors.keyColorRed} !important;
    background-color: ${variables.colors.mainBlueColor} !important;
    color: ${variables.colors.keyColorBrightRed} !important;
  }
`;

const KeyResult = ({
  keyValue: { keyBits, compressionPermutation, shiftedRounds, finalKeys },
}) => {
  return (
    <Wrapper>
      <StyledCollapse bordered={false} accordion>
        <Panel header="Key Bits" key="keyBits">
          <KeyBits keyBits={keyBits} />
        </Panel>
        <Panel header="Compression Permutation" key="cp">
          <CompressionPermutation
            compressionPermutation={compressionPermutation}
          />
        </Panel>
        <Panel header="CP Shift" key="cpShift">
          <CPShift shiftedRounds={shiftedRounds} />
        </Panel>
        <Panel header="Final Keys" key="finalKeys">
          <FinalKeys finalKeys={finalKeys} />
        </Panel>
      </StyledCollapse>
    </Wrapper>
  );
};

export default KeyResult;
