import styled from "@emotion/styled";
import mixins from "assets/mixins";
import variables from "assets/variables";

const Wrapper = styled.div`
  ${mixins.KeyBox}
  color: ${variables.colors.keyColorBrightRed};
  margin: 5rem 0 0 0;
  padding: 0.5rem;
  text-align: center;
  display: grid;
  grid: auto-flow / repeat(8, 1fr);
  row-gap: 0.5rem;
`;

const KeyBits = ({ keyBits }) => {
  const components = keyBits.map((el) => {
    return (
      <div key={`key_bit - ${Math.random().toString().slice(3)}`}>{el}</div>
    );
  });
  return <Wrapper>{components}</Wrapper>;
};

export default KeyBits;
