import styled from "@emotion/styled";
import mixins from "../../assets/mixins";

const Wrapper = styled.div`
  ${mixins.KeyBox}
  margin: 5rem 0 0 0;
  padding: 0.5rem;
  text-align: center;
  display: grid;
  grid: auto-flow / repeat(8, 1fr);
  row-gap: 0.5rem;
`;

const KeyBits = (props) => {
  const { keyValue } = props;
  const components = keyValue.map((el) => {
    return (
      <div key={`key_bit - ${Math.random().toString().slice(3)}`}>{el}</div>
    );
  });
  return <Wrapper>{components}</Wrapper>;
};

export default KeyBits;
