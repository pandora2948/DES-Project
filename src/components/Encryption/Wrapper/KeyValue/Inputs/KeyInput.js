import styled from "@emotion/styled";
import { useCallback } from "react";
import mixins from "assets/mixins";
import variables from "assets/variables";
const { firstCP, secondCP } = require("assets/transitionArrays.json");

const Wrapper = styled.div`
  ${mixins.KeyBox}
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .header {
    color: ${variables.colors.keyColorRed};
    margin: 0 0 2rem 0;
    font-size: 1.5rem;
    align-self: flex-start;
  }

  textarea {
    ${mixins.TextBoxStyle}
    color: ${variables.colors.keyColorBrightRed};
    border-color: ${variables.colors.keyColorRed};
  }
`;

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
