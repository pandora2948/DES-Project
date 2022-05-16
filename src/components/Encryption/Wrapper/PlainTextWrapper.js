import styled from "@emotion/styled";
import variables from "assets/variables";
import PlainTextInput from "./PlainText/Inputs/PlainTextInput";
import PlainTextResult from "./PlainText/Outputs/PlainTextResult";

const PlainTextWrapper = ({ plainText, setPlainText, visibility }) => {
  const Wrapper = styled.div`
    color: ${variables.colors.subWhiteColor};
    margin-top: 2rem;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    ${visibility};
  `;

  return (
    <Wrapper>
      <PlainTextInput setPlainText={setPlainText} />
      {plainText.isEmpty ? null : <PlainTextResult plainText={plainText} />}
    </Wrapper>
  );
};

export default PlainTextWrapper;
