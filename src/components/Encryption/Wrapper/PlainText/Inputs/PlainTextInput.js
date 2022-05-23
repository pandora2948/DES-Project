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

const toCodes = (input) => {
  let { value } = input;
  let length = value.length;
  const charactorsCodes = [];
  if (value === "") {
    const isEmpty = true;
    return { isEmpty };
  } else {
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

    const initialPermutation = [];
    const codeBlocks = [];
    const numberOfTable = length / 8;
    for (let i = 0; i < numberOfTable; i += 1) {
      const codeBlock = charactorsCodes.splice(0, 64);
      const ipTable = [];
      for (let index of IP) {
        ipTable.push(codeBlock[index]);
      }
      codeBlocks.push(codeBlock);
      initialPermutation.push(ipTable);
    }

    const leftPermutations = [];
    const rightPermutations = [];

    for (let i = 0; i < numberOfTable; i += 1) {
      const leftPermutation = [];
      const rightPermutation = [];

      for (let j = 0; j < 32; j += 1) {
        const leftData = initialPermutation[i][j];
        const rightData = initialPermutation[i][j + 32];
        leftPermutation.push(leftData);
        rightPermutation.push(rightData);
      }
      leftPermutations.push(leftPermutation);
      rightPermutations.push(rightPermutation);
    }
    const dividedPermutation = { leftPermutations, rightPermutations };

    const expensionPermutation = [];
    for (let i = 0; i < numberOfTable; i += 1) {
      const page = [];
      for (let index of EP) {
        page.push(rightPermutations[i][index]);
      }
      expensionPermutation.push(page);
    }

    const isEmpty = false;

    return {
      isEmpty,
      codeBlocks,
      initialPermutation,
      dividedPermutation,
      expensionPermutation,
    };
  }
};

const PlainTextInput = ({ setPlainText }) => {
  const handleInputText = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        const { target } = e;
        const data = toCodes(target);
        setPlainText(() => {
          return { ...data };
        });
      }
    },
    [setPlainText]
  );

  return (
    <InputWrapper>
      <div className="header">PLAIN TEXT INPUT</div>
      <textarea
        id="plainTextInput"
        onKeyDown={handleInputText}
        maxLength={8}
      ></textarea>
    </InputWrapper>
  );
};

export default PlainTextInput;
