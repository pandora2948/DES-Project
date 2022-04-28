import styled from "@emotion/styled";
import * as variables from "../../assets/variables";

const Output = styled.div`
  width: 60%;
  height: 2rem;
  border: 1px solid ${variables.colors.subColor};
`;

const PlainBitOutput = (props) => {
  const bit = props.text;
  return <Output>{bit}</Output>;
};

export default PlainBitOutput;
