import styled from "@emotion/styled";
import CompressionPermutation from "../Output/CompressionPermutation";
import CPDivide from "../Output/CPDivide";
import CPShift from "../Output/CPShift";
import KeyBits from "../Output/KeyBits";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const KeyGenerator = (props) => {
  const { keyValue } = props;

  const convertCompressionPermutation = () => {
    const length = keyValue.length / 8;
    const splittedCode = keyValue.map((el) => el.split(""));
    const codePages = [];
    const compressionPermutation = [];
    const leftCP = [];
    const rightCP = [];
    let number;

    for (let i = 0; i < length; i += 1) {
      codePages[i] = splittedCode.splice(0, 8);
      const flatPage = codePages[i].flatMap((el) => el);

      number = 56;
      const leftPages = [];
      const rightPages = [];

      for (let j = 0; j < 4; j += 1) {
        const rows = [];
        for (let k = 0; k < 7; k += 1) {
          rows.push(flatPage[number]);
          number = (number - 8 + 65) % 65;
        }
        leftPages.push(rows);
      }

      number = 62;

      for (let j = 0; j < 3; j += 1) {
        const rows = [];
        for (let k = 0; k < 7; k += 1) {
          rows.push(flatPage[number]);
          number = (number - 8 + 63) % 63;
        }
        rightPages.push(rows);
      }

      number = 20;
      const rows = [];

      for (let k = 0; k < 7; k += 1) {
        rows.push(flatPage[number]);
        number = (number - 8 + 31) % 31;
      }
      rightPages.push(rows);
      leftCP.push(leftPages);
      rightCP.push(rightPages);
      compressionPermutation.push([...leftPages, ...rightPages]);
    }
    return { leftCP, rightCP, compressionPermutation };
  };
  const { leftCP, rightCP, compressionPermutation } =
    convertCompressionPermutation();

  return (
    <Wrapper>
      <KeyBits keyValue={keyValue} />
      <CompressionPermutation compressionPermutation={compressionPermutation} />
      <CPDivide CPDivided={{ leftCP, rightCP }} />
      <CPShift CPDivided={{ leftCP, rightCP }} />
    </Wrapper>
  );
};

export default KeyGenerator;
