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

const parseKeyBit = (StrKey) => {
  const keyBits = [];
  for (const char of StrKey) {
    keyBits.push(char.charCodeAt().toString(2).padStart(8, "0"));
  }
  return keyBits;
};

const convertCompressionPermutation = (keyBits) => {
  const splittedCode = keyBits.map((el) => el.split(""));
  const codePage = splittedCode.flatMap((el) => el);
  const compressionPermutation = [];

  const leftCP = [];
  const rightCP = [];

  let number = 56;

  for (let i = 0; i < 4; i += 1) {
    const rows = [];
    for (let j = 0; j < 7; j += 1) {
      rows.push(codePage[number]);
      number = (number - 8 + 65) % 65;
    }
    leftCP.push(rows);
  }

  number = 62;

  for (let i = 0; i < 3; i += 1) {
    const rows = [];
    for (let j = 0; j < 7; j += 1) {
      rows.push(codePage[number]);
      number = (number - 8 + 63) % 63;
    }
    rightCP.push(rows);
  }

  number = 20;
  const rows = [];

  for (let i = 0; i < 7; i += 1) {
    rows.push(codePage[number]);
    number = (number - 8 + 31) % 31;
  }
  rightCP.push(rows);
  compressionPermutation.push(...leftCP, ...rightCP);

  return { leftCP, rightCP, compressionPermutation };
};

const shiftCP = (leftCP, rightCP) => {
  const leftShiftedRounds = [];
  const rightShiftedRounds = [];
  let shiftCount = 0;

  for (let i = 0; i < 16; i += 1) {
    const flatLeftCP = leftCP.flatMap((el) => el);
    const flatRightCP = rightCP.flatMap((el) => el);
    const leftShift = [];
    const rightShift = [];
    let numberOfElement = 0;
    if ([0, 1, 8, 15].includes(i)) {
      shiftCount += 1;
    } else {
      shiftCount += 2;
    }

    for (let j = 0; j < 4; j += 1) {
      const leftRow = [];
      const rightRow = [];
      for (let k = 0; k < 7; k += 1) {
        leftRow.push(flatLeftCP[(numberOfElement + shiftCount) % 28]);
        rightRow.push(flatRightCP[(numberOfElement + shiftCount) % 28]);
        numberOfElement += 1;
      }
      leftShift.push(leftRow);
      rightShift.push(rightRow);
    }
    leftShiftedRounds.push(leftShift);
    rightShiftedRounds.push(rightShift);
  }
  return { leftShiftedRounds, rightShiftedRounds };
};

const generateFinalKeys = (lShifted, rShifted) => {
  const CP = [
    13, 16, 10, 23, 0, 4, 2, 27, 14, 5, 20, 9, 22, 18, 11, 3, 25, 7, 15, 6, 26,
    19, 12, 1, 40, 51, 30, 36, 46, 54, 29, 39, 50, 44, 32, 47, 43, 48, 38, 55,
    33, 52, 45, 41, 49, 35, 28, 31,
  ];

  const concatShiftedKeys = [];
  for (let i = 0; i < 16; i += 1) {
    concatShiftedKeys.push([...lShifted[i], ...rShifted[i]]);
  }
  const flatShiftedKeys = concatShiftedKeys.map((el) => el.flatMap((el) => el));

  const finalKeys = [];

  for (let i = 0; i < 16; i += 1) {
    const round = [];
    let index = 0;

    for (let j = 0; j < 8; j += 1) {
      const rows = [];

      for (let k = 0; k < 6; k += 1) {
        rows.push(flatShiftedKeys[i][CP[index]]);
        index += 1;
      }
      round.push(rows);
    }
    finalKeys.push(round);
  }

  return { finalKeys };
};

const setKeyValues = (StrKey, setKeyValue) => {
  const keyBits = parseKeyBit(StrKey);
  const { leftCP, rightCP, compressionPermutation } =
    convertCompressionPermutation(keyBits);
  const { leftShiftedRounds, rightShiftedRounds } = shiftCP(leftCP, rightCP);
  const { finalKeys } = generateFinalKeys(
    leftShiftedRounds,
    rightShiftedRounds
  );

  let isEmpty;

  if (StrKey === "") {
    isEmpty = true;
  } else {
    isEmpty = false;
  }

  setKeyValue((prv) => {
    return {
      isEmpty,
      ...prv,
      keyBits,
      compressionPermutation,
      leftCP,
      rightCP,
      leftShiftedRounds,
      rightShiftedRounds,
      finalKeys,
    };
  });
};

const KeyInput = ({ keyValue, setKeyValue }) => {
  const handleInputKey = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      keyGenerate(e.target);
      setKeyValues(e.target.value, setKeyValue);
    }
  };

  const keyGenerate = useCallback(
    (target) => {
      let { value: StrKey } = target;
      let length = StrKey.length;

      while (length % 8 !== 0) {
        StrKey += String.fromCharCode(Math.floor(Math.random() * 256));
        length += 1;
      }
      target.value = StrKey;
      setKeyValue({ StrKey });
    },
    [setKeyValue]
  );

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
