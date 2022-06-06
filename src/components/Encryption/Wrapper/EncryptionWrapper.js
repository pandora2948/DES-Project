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

const handleXOR = (expensionPermutation, finalKeys, rounds, isEncryption) => {
  const exclusiveRound = [];
  const currentRoundKey = [];
  if (isEncryption) {
    currentRoundKey.push(...finalKeys[rounds]);
  } else {
    const decryptionRound = 15 - rounds;
    currentRoundKey.push(...finalKeys[decryptionRound]);
  }

  for (let i = 0; i < 48; i += 1) {
    exclusiveRound.push(expensionPermutation[i] ^ currentRoundKey[i]);
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

const roundHandler = (leftBlocks, rightBlocks, finalKeys, isEncryption) => {
  const leftSide = leftBlocks.map((el) => [[...el]]);
  const rightSide = rightBlocks.map((el) => [[...el]]);
  const blocks = { leftSide: leftSide, rightSide: rightSide };
  const xorRounds = [];
  const sBoxRounds = [];
  const pBoxRounds = [];

  for (let i = 0; i < blocks.leftSide.length; i += 1) {
    for (let j = 0; j < 16; j += 1) {
      const expensionPermutation = [];

      for (let index of EP) {
        expensionPermutation.push(blocks.rightSide[i][j][index]);
      }

      const xor = handleXOR(expensionPermutation, finalKeys, j, isEncryption);
      const sBox = handleSubstitution(xor);
      const pBox = handlePermutationBox(sBox);
      const roundResult = handlePermutationXor(pBox, blocks.leftSide[i][j]);
      xorRounds.push(xor);
      sBoxRounds.push(sBox);
      pBoxRounds.push(pBox);
      if (j === 15) {
        blocks.leftSide[i].push(roundResult);
        blocks.rightSide[i].push(blocks.rightSide[i][j]);
      } else {
        blocks.leftSide[i].push(blocks.rightSide[i][j]);
        blocks.rightSide[i].push(roundResult);
      }
    }
  }

  const eachResult = {
    xor: xorRounds[0],
    sBox: sBoxRounds[0],
    pBox: pBoxRounds[0],
  };

  return { ...eachResult, ...blocks };
};

const handleFinalPermutation = (leftBlock, rightBlock) => {
  const FP = [];

  for (let i = 0; i < rightBlock.length; i += 1) {
    const blocks = [];
    const preFinalPermutation = [...leftBlock[i][16], ...rightBlock[i][16]];

    for (let index of finalPermutationTable) {
      blocks.push(preFinalPermutation[index]);
    }
    FP.push(blocks);
  }

  return FP;
};

const encryptedCharactorHandler = (encryptedArray) => {
  const resultCharactor = [];
  for (let i = 0; i < encryptedArray.length; i += 1) {
    const resultCopy = encryptedArray[i].map((el) => el.toString());

    for (let j = 0; j < 8; j += 1) {
      const codes = resultCopy.splice(0, 8).reduce((prv, cur) => {
        return prv + cur;
      });
      const char = String.fromCharCode(parseInt(codes, 2));
      resultCharactor.push(char);
    }
  }

  return resultCharactor;
};

const EncryptionWrapper = ({
  plainText: {
    dividedPermutations: { leftPermutations, rightPermutations },
  },
  keyValue: { finalKeys },
  isEncryption,
}) => {
  const { xor, sBox, pBox, leftSide, rightSide } = roundHandler(
    leftPermutations,
    rightPermutations,
    finalKeys,
    isEncryption
  );
  const FPResults = handleFinalPermutation(leftSide, rightSide);
  const resultCharactor = encryptedCharactorHandler(FPResults);
  if (isEncryption) {
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
            <EachRoundResult eachRounds={{ leftSide, rightSide }} />
          </Panel>
          <Panel header="LastRound Result" key="last_round_result">
            <EncryptedValue FPResult={FPResults} resultChar={resultCharactor} />
          </Panel>
        </StyledCollapse>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <StyledCollapse accordion bordered={false}>
          <Panel header="LastRound Result" key="last_round_result">
            <EncryptedValue FPResult={FPResults} resultChar={resultCharactor} />
          </Panel>
        </StyledCollapse>
      </Wrapper>
    );
  }
};

export default EncryptionWrapper;
