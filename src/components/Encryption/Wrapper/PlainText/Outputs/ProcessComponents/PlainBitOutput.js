import styled from "@emotion/styled";
import mixins from "assets/mixins";

const Output = styled.div`
  ${mixins.PlainTextBox}
  padding: 0.5rem;
  text-align: center;
  display: grid;
  grid: auto-flow / repeat(8, 1fr);
  row-gap: 0.5rem;
`;

const PlainBitOutput = ({ plainBit }) => {
  const components = plainBit.map((el) => {
    return (
      <div key={`plain_bit - ${Math.random().toString().slice(3)}`}>{el}</div>
    );
  });

  return <Output>{components}</Output>;
};

export default PlainBitOutput;
