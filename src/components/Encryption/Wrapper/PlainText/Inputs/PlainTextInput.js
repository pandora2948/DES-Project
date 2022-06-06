import styled from "@emotion/styled/macro";
import mixins from "assets/mixins";
import variables from "assets/variables";
import { useCallback } from "react";

const { IP, EP } = require("assets/transitionArrays.json");

const InputWrapper = styled.div`
  ${mixins.PlainTextBox}
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .header {
    margin: 0 0 2rem 0;
    font-size: 1.5rem;
    align-self: flex-start;
  }

  textarea {
    ${mixins.TextBoxStyle}
    color: ${variables.colors.subWhiteColor};
    border-color: ${variables.colors.subWhiteColor};
  }
`;

const initialPermutationHandler = (charactorsCodes, length) => {
  const initialPermutations = [];
  const codeBlocks = [];

  for (let i = 0; i < length; i += 1) {
    const codeBlock = charactorsCodes.splice(0, 64);
    const ipTable = [];
    for (let index of IP) {
      ipTable.push(codeBlock[index]);
    }
    codeBlocks.push(codeBlock);
    initialPermutations.push(ipTable);
  }
  return { initialPermutations, codeBlocks };
};

const permutationDivideHandler = (initialPermutations, length) => {
  const leftPermutations = [];
  const rightPermutations = [];

  for (let i = 0; i < length; i += 1) {
    const leftPermutation = [];
    const rightPermutation = [];

    for (let j = 0; j < 32; j += 1) {
      const leftData = initialPermutations[i][j];
      const rightData = initialPermutations[i][j + 32];
      leftPermutation.push(leftData);
      rightPermutation.push(rightData);
    }

    leftPermutations.push(leftPermutation);
    rightPermutations.push(rightPermutation);
  }

  return { leftPermutations, rightPermutations };
};

const expensionPermutationHandler = (rightPermutations, length) => {
  const expensionPermutations = [];

  for (let i = 0; i < length; i += 1) {
    const page = [];
    for (let index of EP) {
      page.push(rightPermutations[i][index]);
    }
    expensionPermutations.push(page);
  }
  return expensionPermutations;
};

const toCodes = (input, isEncryption) => {
  let { value } = input;
  let length = value.length;
  let numberOfTable = length / 8;
  const charactorsCodes = [];
  if (value === "") {
    const isEmpty = true;
    return { isEmpty };
  }
  if (isEncryption) {
    for (let char of value) {
      const code = char.charCodeAt().toString(2).padStart(8, "0").split("");
      charactorsCodes.push(...code);
    }

    while (length % 8 !== 0) {
      const code = Math.floor(Math.random() * 256)
        .toString(2)
        .padStart(8, "0")
        .split("");
      charactorsCodes.push(...code);
      length += 1;
    }
    numberOfTable = length / 8;
  } else {
    const decryptionRegExp = /[[0-9]{64}]*/g;
    const isvalid = decryptionRegExp.exec(value);
    if (isvalid) {
      const codes = value.split("");
      codes.forEach((el) => {
        charactorsCodes.push(el);
      });
      numberOfTable = length / 64;
    } else {
      const isEmpty = true;
      return { isEmpty };
    }
  }

  const { initialPermutations, codeBlocks } = initialPermutationHandler(
    charactorsCodes,
    numberOfTable
  );

  const dividedPermutations = permutationDivideHandler(
    initialPermutations,
    numberOfTable
  );

  const expensionPermutations = expensionPermutationHandler(
    dividedPermutations.rightPermutations,
    numberOfTable
  );

  const isEmpty = false;

  return {
    isEmpty,
    codeBlocks,
    initialPermutations,
    dividedPermutations,
    expensionPermutations,
  };
};

const PlainTextInput = ({ setPlainText, isEncryption }) => {
  const handleInputText = useCallback(
    (e) => {
      if (e.keyCode !== 13) return;

      e.preventDefault();
      const { target } = e;

      const data = toCodes(target, isEncryption);
      setPlainText(() => {
        return { ...data };
      });
    },
    [isEncryption, setPlainText]
  );

  return (
    <InputWrapper>
      <div className="header">PLAIN TEXT INPUT</div>
      <textarea id="plainTextInput" onKeyDown={handleInputText}></textarea>
    </InputWrapper>
  );
};

export default PlainTextInput;
