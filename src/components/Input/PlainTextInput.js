import styled from "@emotion/styled/macro";
import mixins from "../../assets/mixins";
import variables from "../../assets/variables";

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
    border-radius: 15px;
    font-family: inherit;
    background-color: ${variables.colors.mainBlackColor};
    padding: 0.5rem;
    outline: none;
    border: 2px solid ${variables.colors.subColor};
    box-shadow: 10px 10px 10px 5px #222a38;
    width: 90%;
    min-height: 6rem;
    color: ${variables.colors.subColor};
    font-size: 1.5rem;
    line-height: 2rem;
    overflow: hidden;
    resize: none;
  }
`;

const PlainTextInput = (props) => {
  const {
    setKeyValue,
    modifyInputValue,
    modifyInitialPermutation,
    modifyPlainBit,
  } = props;

  const handleInputText = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      const plainText = e.target.value;
      modifyInputValue(e.target.value);
      toPlainBit(plainText);
      keyGenerate();
    }
  };

  const keyGenerate = () => {
    const randoms = [];
    for (let i = 0; i < 8; i += 1) {
      const rand = Math.floor(Math.random() * 256)
        .toString(2)
        .padStart(8, "0");
      randoms.push(rand);
    }
    setKeyValue(randoms);
  };

  const toPlainBit = (plainText) => {
    let length = plainText.length;
    const codes = [];

    for (const char of plainText) {
      codes.push(char.charCodeAt().toString(2).padStart(8, "0"));
    }

    while (length % 8 !== 0) {
      codes.push(
        Math.floor(Math.random() * 256)
          .toString(2)
          .padStart(8, "0")
      );
      length += 1;
    }

    const ipLength = codes.length / 8;
    const preInitialPermutation = [];

    const splitedCodes = codes.map((el) => el.split(""));
    for (let i = 0; i < ipLength; i += 1) {
      const table = splitedCodes.splice(0, 8);
      preInitialPermutation.push(table);
    }
    const initialPermutation = [];
    for (let k = 0; k < ipLength; k += 1) {
      const table = [];
      for (let j = 1; j !== 8; j = (j + 2) % 9) {
        const row = [];
        for (let i = preInitialPermutation[k].length - 1; i >= 0; i -= 1) {
          row.push(preInitialPermutation[k][i][j]);
        }
        table.push(row);
      }
      initialPermutation.push(table);
    }
    modifyInitialPermutation(initialPermutation);
    modifyPlainBit(codes);
  };

  return (
    <InputWrapper>
      <div className="header">PLAIN TEXT INPUT</div>
      <textarea onKeyDown={handleInputText}></textarea>
    </InputWrapper>
  );
};

export default PlainTextInput;
