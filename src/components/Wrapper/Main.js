import styled from "@emotion/styled";
import variables from "../../assets/variables";
import Body from "./Body";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 5rem;
  color: ${variables.colors.subColor};

  header {
    width: 100%;
    font-size: 2.5rem;
    padding: 1.5rem 0 1.5rem 1rem;
    display: block;
    border-bottom: 2px solid ${variables.colors.subColor};
    margin-bottom: 9rem;
    background-color: ${variables.colors.mainBlueColor};
  }
`;

const Main = () => {
  return (
    <Wrapper>
      <header>DES</header>
      <Body></Body>
    </Wrapper>
  );
};

export default Main;
