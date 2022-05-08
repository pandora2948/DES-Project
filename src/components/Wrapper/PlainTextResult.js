import styled from "@emotion/styled";
import InitialPermutation from "../Output/InitialPermutation";
import IpDivide from "../Output/IpDivide";
import PlainBitOutput from "../Output/PlainBitOutput";

const Wrapper = styled.div``;
const PlainTextResult = (props) => {
  const { plainText } = props;

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

    return { initialPermutation, codes };
  };

  const { initialPermutation, codes: plainBit } = toPlainBit(plainText);

  return (
    <Wrapper>
      <PlainBitOutput plainBit={plainBit} />
      <InitialPermutation ip={initialPermutation} />
      <IpDivide ip={initialPermutation} />
    </Wrapper>
  );
};

export default PlainTextResult;
