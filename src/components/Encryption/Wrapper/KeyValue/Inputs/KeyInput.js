import styled from "@emotion/styled";
import { useCallback } from "react";
import mixins from "assets/mixins";
import variables from "assets/variables";

const Wrapper = styled.div`
  ${mixins.KeyBox}
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .header {
    color: ${variables.colors.keyColorBrightRed};
    margin: 0 0 2rem 0;
    font-size: 1.5rem;
    align-self: flex-start;
  }

  textarea {
    ${mixins.KeyBox}
    border-radius: 15px;
    font-family: inherit;
    background-color: ${variables.colors.mainBlackColor};
    padding: 0.5rem;
    outline: none;
    width: 90%;
    min-height: 6rem;
    color: ${variables.colors.keyColorBrightRed};
    font-size: 1.5rem;
    line-height: 2rem;
    overflow: hidden;
    resize: none;
  }
`;

const permutationArray = {
  IP: [
    57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37,
    29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7, 56, 48, 40, 32, 24, 16, 8, 0,
    58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46,
    38, 30, 22, 14, 6,
  ],

  firstCP: [
    56, 48, 40, 32, 24, 16, 8, 0, 57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34,
    26, 18, 10, 2, 59, 51, 43, 35, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45,
    37, 29, 21, 13, 5, 60, 52, 44, 36, 28, 20, 12, 4, 27, 19, 11, 3,
  ],

  secondCP: [
    13, 16, 10, 23, 0, 4, 2, 27, 14, 5, 20, 9, 22, 18, 11, 3, 25, 7, 15, 6, 26,
    19, 12, 1, 40, 51, 30, 36, 46, 54, 29, 39, 50, 44, 32, 47, 43, 48, 38, 55,
    33, 52, 45, 41, 49, 35, 28, 31,
  ],

  EP: [
    31, 0, 1, 2, 3, 4, 3, 4, 5, 6, 7, 8, 7, 8, 9, 10, 11, 12, 11, 12, 13, 14,
    15, 16, 15, 16, 17, 18, 19, 20, 19, 20, 21, 22, 23, 24, 23, 24, 25, 26, 27,
    28, 27, 28, 29, 30, 31, 0,
  ],

  firstSubstitution: [
    14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7, 0, 15, 7, 4, 14, 2,
    13, 1, 10, 6, 12, 11, 9, 5, 3, 8, 4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7,
    3, 10, 5, 0, 15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13,
  ],

  secondSubstitution: [
    15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10, 3, 13, 4, 7, 15, 2, 8,
    14, 12, 0, 1, 10, 6, 9, 11, 5, 0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9,
    3, 2, 15, 13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9,
  ],

  thirdSubstitution: [
    10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8, 13, 7, 0, 9, 3, 4, 6,
    10, 2, 8, 5, 14, 12, 11, 15, 1, 13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5,
    10, 14, 7, 1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12,
  ],

  fourthSubstitution: [
    7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15, 13, 8, 11, 5, 6, 15,
    0, 3, 4, 7, 2, 12, 1, 10, 14, 9, 10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14,
    5, 2, 8, 4, 3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14,
  ],

  fifthSubstitution: [
    2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9, 14, 11, 2, 12, 4, 7,
    13, 1, 5, 0, 15, 10, 3, 9, 8, 6, 4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6,
    3, 0, 14, 11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3,
  ],

  sixthSubstitution: [
    12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11, 10, 15, 4, 2, 7, 12,
    9, 5, 6, 1, 13, 14, 0, 11, 3, 8, 9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1,
    13, 11, 6, 4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13,
  ],

  seventhSubstitution: [
    4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1, 13, 0, 11, 7, 4, 9, 1,
    10, 14, 3, 5, 12, 2, 15, 8, 6, 1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0,
    5, 9, 2, 6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12,
  ],

  eightSubstitution: [
    13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7, 1, 15, 13, 8, 10, 3,
    7, 4, 12, 5, 6, 11, 0, 14, 9, 2, 7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13,
    15, 3, 5, 8, 2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11,
  ],
};

const parseKeyBit = (StrKey) => {
  const keyBits = [];
  for (const char of StrKey) {
    keyBits.push(char.charCodeAt().toString(2).padStart(8, "0"));
  }
  return keyBits;
};

const HandleFirstCompressionPermutation = (keyBits) => {
  const splittedCode = keyBits.map((el) => el.split(""));
  const codePage = splittedCode.flatMap((el) => el);
  const { firstCP } = permutationArray;
  const compressionPermutation = [];

  for (let index of firstCP) {
    compressionPermutation.push(codePage[index]);
  }

  return compressionPermutation;
};

const shiftCP = (compressionPermutation) => {
  const CP = [...compressionPermutation];
  const leftCP = CP.splice(0, 28);
  const rightCP = CP.splice(0, 28);

  let shiftCount = 0;
  const leftShiftedRounds = [];
  const rightShiftedRounds = [];

  for (let i = 0; i < 16; i += 1) {
    const LshiftedRound = [];
    const RshiftedRound = [];

    if ([0, 1, 8, 15].includes(i)) {
      shiftCount += 1;
    } else {
      shiftCount += 2;
    }

    for (let j = 0; j < 28; j += 1) {
      const indexNumber = (j + shiftCount) % 28;
      LshiftedRound.push(leftCP[indexNumber]);
      RshiftedRound.push(rightCP[indexNumber]);
    }

    leftShiftedRounds.push(LshiftedRound);
    rightShiftedRounds.push(RshiftedRound);
  }

  const shiftedRounds = { leftShiftedRounds, rightShiftedRounds };

  return shiftedRounds;
};

const generateFinalKeys = ({ leftShiftedRounds, rightShiftedRounds }) => {
  const { secondCP } = permutationArray;
  const ShiftedKeys = [];

  for (let i = 0; i < 16; i += 1) {
    ShiftedKeys.push([...leftShiftedRounds[i], ...rightShiftedRounds[i]]);
  }

  const finalKeys = [];

  for (let i = 0; i < 16; i += 1) {
    const round = [];

    for (let index of secondCP) {
      round.push(ShiftedKeys[i][index]);
    }
    finalKeys.push(round);
  }

  return finalKeys;
};

const setKeyValues = (StrKey, setKeyValue) => {
  const keyBits = parseKeyBit(StrKey);
  const compressionPermutation = HandleFirstCompressionPermutation(keyBits);
  const shiftedRounds = shiftCP(compressionPermutation);
  const finalKeys = generateFinalKeys(shiftedRounds);

  let isEmpty;

  if (StrKey === "") {
    isEmpty = true;
  } else {
    isEmpty = false;
  }

  setKeyValue((prv) => {
    return {
      ...prv,
      isEmpty,
      keyBits,
      compressionPermutation,
      shiftedRounds,
      finalKeys,
    };
  });
};

const KeyInput = ({ setKeyValue }) => {
  const handleInputKey = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      keyGenerate(e.target);
      setKeyValues(e.target.value, setKeyValue);
    }
  };

  const keyGenerate = useCallback((target) => {
    let StrKey = target.value;
    let length = StrKey.length;

    while (length % 8 !== 0) {
      StrKey += String.fromCharCode(Math.floor(Math.random() * 256));
      length += 1;
    }

    target.value = StrKey;
  }, []);

  return (
    <Wrapper>
      <div className="header">KEY VALUE INPUT</div>
      <textarea
        id="keyInput"
        maxLength={8}
        onKeyDown={handleInputKey}
      ></textarea>
    </Wrapper>
  );
};

export default KeyInput;
