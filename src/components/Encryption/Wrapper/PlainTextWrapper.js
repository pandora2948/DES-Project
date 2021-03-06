import styled from "@emotion/styled";
import variables from "assets/variables";
import PlainTextInput from "./PlainText/Inputs/PlainTextInput";
import PlainTextResult from "./PlainText/Outputs/PlainTextResult";

const Wrapper = styled.div`
  color: ${variables.colors.subWhiteColor};
  margin-top: 2rem;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  ${({ visibility }) => visibility};
`;

const PlainTextWrapper = ({
  plainText,
  setPlainText,
  isEncryption,
  visibility,
}) => {
  return (
    <Wrapper visibility={visibility}>
      <PlainTextInput setPlainText={setPlainText} isEncryption={isEncryption} />
      {!plainText.isEmpty && <PlainTextResult plainText={plainText} />}
    </Wrapper>
  );
};

export default PlainTextWrapper;
