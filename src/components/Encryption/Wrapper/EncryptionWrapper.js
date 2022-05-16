import styled from "@emotion/styled";
import { Collapse } from "antd";
import variables from "assets/variables";
import FirstRoundResult from "./FirstRound/FirstRoundResult";
import KeyXOR from "./FirstRound/KeyXOR";
import PermutationBox from "./FirstRound/PermutationBox";
import SubstitutionBox from "./FirstRound/SubstitutionBox";

const {
  substitutionsTable,
  permutationBox,
} = require("assets/transitionArrays.json");
const { Panel } = Collapse;

const StyledCollapse = styled(Collapse)`
  background-color: ${variables.colors.mainBlueColor};

  div {
    color: ${variables.colors.encryptedBlueColor} !important;
    border-color: ${variables.colors.encryptedBlueColor} !important;
    background-color: ${variables.colors.mainBlueColor};
  }
`;

const handleXOR = (expensionPermutation, finalKeys) => {
  const firstRound = [];
  for (let i = 0; i < 48; i += 1) {
    firstRound.push(expensionPermutation[0][i] ^ finalKeys[0][i]);
  }
  return firstRound;
};

const handlesubstitution = (xor) => {
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

const handlePermutationXor = (pBox, leftPermutations) => {
  const exclusiveOr = [];
  for (let i = 0; i < 32; i += 1) {
    exclusiveOr.push(pBox[i] ^ leftPermutations[0][i]);
  }
  return exclusiveOr;
};

const handlePermutationBox = (sBox) => {
  const pBox = [];
  for (let index of permutationBox) {
    pBox.push(sBox[index]);
  }

  return pBox;
};

const EncryptionWrapper = ({
  plainText: {
    expensionPermutation,
    dividedPermutation: { leftPermutations, rightPermutations },
  },
  keyValue: { finalKeys },
}) => {
  const xor = handleXOR(expensionPermutation, finalKeys);
  const sBox = handlesubstitution(xor);
  const pBox = handlePermutationBox(sBox);
  const firstRound = handlePermutationXor(pBox, leftPermutations);

  return (
    <StyledCollapse accordion bordered={false}>
      <Panel header="XOR First Round">
        <KeyXOR xor={xor} />
      </Panel>
      <Panel header="Substitution Box">
        <SubstitutionBox sBox={sBox} />
      </Panel>
      <Panel header="Permutation Box">
        <PermutationBox pBox={pBox} />
      </Panel>
      <Panel header="FirstRound Result">
        <FirstRoundResult firstRound={firstRound} />
      </Panel>
    </StyledCollapse>
  );
};

export default EncryptionWrapper;
