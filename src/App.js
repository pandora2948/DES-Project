import styled from "@emotion/styled/macro";
import * as variables from "./assets/variables";
import PlainTextInput from "./components/Input/PlainTextInput";
import "./App.css";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${variables.colors.subColor};

  header {
    width: 100%;
    font-size: 2.5rem;
    padding: 1.5rem 0 1.5rem 1rem;
    display: block;
    border-bottom: 2px solid ${variables.colors.subColor};
    margin-bottom: 2rem;
    background-color: ${variables.colors.mainBlueColor};
  }
`;

const App = () => {
  return (
    <Main>
      <header>DES</header>
      <PlainTextInput></PlainTextInput>
    </Main>
  );
};

export default App;
