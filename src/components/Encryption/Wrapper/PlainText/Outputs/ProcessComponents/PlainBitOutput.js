import styled from "@emotion/styled";
import mixins from "assets/mixins";

const Wrapper = styled.div`
  ${mixins.PlainTextBox}
  text-align: center;
  display: grid;
  grid: auto-flow / repeat(8, 1fr);
  row-gap: 0.5rem;
`;

const generateElement = (bitBlocks) => {
  const elements = [];
  for (let i = 0; i < bitBlocks.length; i += 1) {
    for (let j = 0; j < 8; j += 1) {
      elements.push(
        <div key={`bitBlock - ${Math.random().toString().slice(3)}`}>
          {bitBlocks[i][j]}
        </div>
      );
    }
  }
  return elements;
};

const PlainBitOutput = ({ codeBlocks }) => {
  const bitBlocks = codeBlocks.map((el) => {
    const chars = [];
    for (let i = 0; i < 8; i += 1) {
      chars.push(el.slice(i * 8, (i + 1) * 8).join(""));
    }
    return chars;
  });

  return <Wrapper>{generateElement(bitBlocks)}</Wrapper>;
};

export default PlainBitOutput;
