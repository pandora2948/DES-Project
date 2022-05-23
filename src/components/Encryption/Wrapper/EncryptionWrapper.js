import styled from "@emotion/styled";
import { Collapse } from "antd";
import variables from "assets/variables";
import FinalRoundResult from "./FinalRound/FinalRoundResult";
import FirstRoundResult from "./FirstRound/FirstRoundResult";
import KeyXOR from "./FirstRound/KeyXOR";
import PermutationBox from "./FirstRound/PermutationBox";
import SubstitutionBox from "./FirstRound/SubstitutionBox";

const { EP, finalPermutationTable } = require("assets/transitionArrays.json");

const {
  substitutionsTable,
  permutationBox,
} = require("assets/transitionArrays.json");

const { Panel } = Collapse;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledCollapse = styled(Collapse)`
  background-color: ${variables.colors.mainBlueColor};

  div {
    color: ${variables.colors.encryptedBlueColor} !important;
    border-color: ${variables.colors.encryptedBlueColor} !important;
    background-color: ${variables.colors.mainBlueColor};
  }
`;

const handleXOR = (expensionPermutation, finalKeys, index = 0) => {
  const exclusiveRound = [];

  for (let i = 0; i < 48; i += 1) {
    exclusiveRound.push(expensionPermutation[i] ^ finalKeys[index][i]);
  }

  return exclusiveRound;
};

const handleSubstitution = (xor) => {
  const xorBits = [...xor];
  const substitution = [];

  for (let i = 0; i < 8; i += 1) {
    const frontIndex = parseInt(
      xorBits.splice(0, 2).reduce((acc, cur) => {
        return acc + cur;
      }, ""),
      2
    );

    const backIndex = parseInt(
      xorBits.splice(0, 4).reduce((acc, cur) => {
        return acc + cur;
      }, ""),
      2
    );

    substitution.push(
      substitutionsTable[i][frontIndex][backIndex].toString(2).padStart(4, "0")
    );
  }

  const sBox = substitution.map((el) => el.split("")).flatMap((el) => el);

  return sBox;
};

const handlePermutationBox = (sBox) => {
  const pBox = [];
  for (let index of permutationBox) {
    pBox.push(sBox[index]);
  }

  return pBox;
};

const handlePermutationXor = (pBox, leftPermutations) => {
  const exclusiveOr = [];
  for (let i = 0; i < 32; i += 1) {
    exclusiveOr.push(pBox[i] ^ leftPermutations[0][i]);
  }
  return exclusiveOr;
};

const resultRoundHandler = (leftBlock, rightBlock, finalKeys, round = 1) => {
  const prvBlocks = { leftBlock, rightBlock };
  const eachResult = {};

  for (let i = 0; i < round; i += 1) {
    const expensionPermutation = [];

    for (let index of EP) {
      expensionPermutation.push(prvBlocks.rightBlock[index]);
    }

    const xor = handleXOR(expensionPermutation, finalKeys, i);
    const sBox = handleSubstitution(xor);
    const pBox = handlePermutationBox(sBox);
    const roundResult = handlePermutationXor(pBox, prvBlocks.leftBlock);
    eachResult.xor = xor;
    eachResult.sBox = sBox;
    eachResult.pBox = pBox;
    prvBlocks.leftBlock = prvBlocks.rightBlock;
    prvBlocks.rightBlock = roundResult;
  }

  return { eachResult, prvBlocks };
};

const handleFinalPermutation = (finalBlock) => {
  const { leftBlock, rightBlock } = finalBlock;
  const preFinalPermutation = [...leftBlock, ...rightBlock];
  const FP = [];

  for (let index of finalPermutationTable) {
    FP.push(preFinalPermutation[index]);
  }

  return FP;
};

const EncryptionWrapper = ({
  plainText: {
    expensionPermutation,
    dividedPermutation: { leftPermutations, rightPermutations },
  },
  keyValue: { finalKeys },
}) => {
  const {
    eachResult: { xor, sBox, pBox },
    prvBlocks: { rightBlock: firstRound },
  } = resultRoundHandler(leftPermutations, rightPermutations, finalKeys);

  const { prvBlocks: finalRoundBlocks } = resultRoundHandler(
    leftPermutations,
    rightPermutations,
    finalKeys,
    16
  );

  const FPResult = handleFinalPermutation(finalRoundBlocks);

  return (
    <Wrapper>
      <StyledCollapse accordion bordered={false}>
        <Panel header="XOR KEY" key="xor_panel">
          <KeyXOR xor={xor} />
        </Panel>
        <Panel header="Substitution Box" key="sub_box">
          <SubstitutionBox sBox={sBox} />
        </Panel>
        <Panel header="Permutation Box" key="permutation_box">
          <PermutationBox pBox={pBox} />
        </Panel>
        <Panel header="FirstRound Result" key="first_round_result">
          <FirstRoundResult firstRound={firstRound} />
        </Panel>
        <Panel header="LastRound Result" key="last_round_result">
          <FinalRoundResult FPResult={FPResult} />
        </Panel>
      </StyledCollapse>
    </Wrapper>
  );
};

export default EncryptionWrapper;
