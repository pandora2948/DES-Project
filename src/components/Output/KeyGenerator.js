import styled from "@emotion/styled";
import mixins from "../../assets/mixins";
import variables from "../../assets/variables";

const Wrapper = styled.div`
  ${mixins.displayBox}
  border-color: ${variables.colors.keyColorRed};
  box-shadow: 15px 5px 50px -5px ${variables.colors.keyColorRed};
`;

const KeyGenerator = (props) => {
  return <Wrapper>{props.keyValue}</Wrapper>;
};

export default KeyGenerator;
