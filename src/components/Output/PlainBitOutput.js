import styled from "@emotion/styled";
import mixins from "../../assets/mixins";

const Output = styled.div`
  ${mixins.displayBox}
  margin: 5rem 0 0 0;
  padding: 0.5rem;
  text-align: center;
  display: grid;
  grid: auto-flow / repeat(8, 1fr);
  row-gap: 0.5rem;
`;

const Bit = styled.div``;

const PlainBitOutput = (props) => {
  const codes = props.plainBit;
  const components = codes.map((el) => {
    const key = `${parseInt(el, 2)} - ${
      Math.random().toString().split(".")[1]
    }`;
    return <Bit key={key}>{el}</Bit>;
  });

  return <Output css={mixins.displayBox}>{components}</Output>;
};

export default PlainBitOutput;
