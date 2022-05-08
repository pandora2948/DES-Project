import styled from "@emotion/styled";
import mixins from "../../assets/mixins";

const Output = styled.div`
  ${mixins.PlainTextBox}
  margin: 5rem 0 0 0;
  padding: 0.5rem;
  text-align: center;
  display: grid;
  grid: auto-flow / repeat(8, 1fr);
  row-gap: 0.5rem;
`;

const PlainBitOutput = (props) => {
  const { plainBit } = props;
  const components = plainBit.map((el) => {
    return (
      <div key={`plain_bit - ${Math.random().toString().slice(3)}`}>{el}</div>
    );
  });

  return <Output>{components}</Output>;
};

export default PlainBitOutput;
