import styled from "@emotion/styled/macro";
import mixins from "../../assets/mixins";
import variables from "../../assets/variables";

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
    border-radius: 15px;
    font-family: inherit;
    background-color: ${variables.colors.mainBlackColor};
    padding: 0.5rem;
    outline: none;
    border: 2px solid ${variables.colors.subColor};
    box-shadow: 10px 10px 10px 5px #222a38;
    width: 90%;
    min-height: 6rem;
    color: ${variables.colors.subColor};
    font-size: 1.5rem;
    line-height: 2rem;
    overflow: hidden;
    resize: none;
  }
`;

const PlainTextInput = (props) => {
  const { setPlainText } = props;

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
