import styled from "@emotion/styled";
import { Collapse } from "antd";
import variables from "assets/variables";
import EachRoundResult from "./Rounds/EachRoundResult";
import EncryptedValue from "./Rounds/EncryptedValue";
import KeyXOR from "./Rounds/KeyXOR";
import PermutationBox from "./Rounds/PermutationBox";
import SubstitutionBox from "./Rounds/SubstitutionBox";

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

const handleXOR = (expensionPermutation, finalKeys) => {
  const exclusiveRound = [];

  for (let i = 0; i < 48; i += 1) {
    exclusiveRound.push(expensionPermutation[i] ^ finalKeys[i]);
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
    exclusiveOr.push(pBox[i] ^ leftPermutations[i]);
  }
  return exclusiveOr;
};

const roundHandler = (leftBlock, rightBlock, finalKeys) => {
  const blocks = { leftBlock: [leftBlock], rightBlock: [rightBlock] };
  const xorRounds = [];
  const sBoxRounds = [];
  const pBoxRounds = [];

  for (let i = 0; i < 16; i += 1) {
    const expensionPermutation = [];

    for (let index of EP) {
      expensionPermutation.push(blocks.rightBlock[i][index]);
    }

    const xor = handleXOR(expensionPermutation, finalKeys[i]);
    const sBox = handleSubstitution(xor);
    const pBox = handlePermutationBox(sBox);
    const roundResult = handlePermutationXor(pBox, blocks.leftBlock[i]);
    xorRounds.push(xor);
    sBoxRounds.push(sBox);
    pBoxRounds.push(pBox);
    if (i === 15) {
      blocks.leftBlock.push(roundResult);
      blocks.rightBlock.push(blocks.rightBlock[i]);
    } else {
      blocks.leftBlock.push(blocks.rightBlock[i]);
      blocks.rightBlock.push(roundResult);
    }
  }
  const eachResult = {
    xor: xorRounds[0],
    sBox: sBoxRounds[0],
    pBox: pBoxRounds[0],
  };

  return { eachResult, ...blocks };
};

const handleFinalPermutation = (leftBlock, rightBlock) => {
  const preFinalPermutation = [...leftBlock, ...rightBlock];
  const FP = [];

  for (let index of finalPermutationTable) {
    FP.push(preFinalPermutation[index]);
  }

  return FP;
};

const EncryptionWrapper = ({
  plainText: {
    dividedPermutation: { leftPermutations, rightPermutations },
  },
  keyValue: { finalKeys },
}) => {
  const {
    eachResult: { xor, sBox, pBox },
    leftBlock,
    rightBlock,
  } = roundHandler(leftPermutations[0], rightPermutations[0], finalKeys);

  const FPResult = handleFinalPermutation(leftBlock[16], rightBlock[16]);

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
        <Panel header="Each Round Result" key="first_round_result">
          <EachRoundResult firstRound={(leftBlock[1], rightBlock[1])} />
        </Panel>
        <Panel header="LastRound Result" key="last_round_result">
          <EncryptedValue FPResult={FPResult} />
        </Panel>
      </StyledCollapse>
    </Wrapper>
  );
};

export default EncryptionWrapper;
