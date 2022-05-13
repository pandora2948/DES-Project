import styled from "@emotion/styled/macro";
import mixins from "assets/mixins";
import variables from "assets/variables";

const InputWrapper = styled.div`
  ${mixins.PlainTextBox}
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .header {
    margin: 0 0 2rem 0;
    font-size: 1.5rem;
    align-self: flex-start;
  }

  textarea {
    ${mixins.TextBoxStyle}
    color: ${variables.colors.subWhiteColor};
    border-color: ${variables.colors.subWhiteColor};
  }
`;

const PlainTextInput = ({ setPlainText }) => {
  const handleInputText = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setPlainText(e.target.value);
    }
  };

  return (
    <InputWrapper>
      <div className="header">PLAIN TEXT INPUT</div>
      <textarea id="plainTextInput" onKeyDown={handleInputText}></textarea>
    </InputWrapper>
  );
};

export default PlainTextInput;
