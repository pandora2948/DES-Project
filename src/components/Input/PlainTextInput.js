import styled from "@emotion/styled/macro";
import * as variables from "../../assets/variables";

const InputWrapper = styled.div`
  width: 60%;
  border: 2px solid ${variables.colors.subColor};
  border-radius: 15px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${variables.colors.mainBlueColor};
  box-shadow: 10px 10px 30px 5px ${variables.colors.subColor};

  .header {
    margin: 0 0 2rem 0;
    font-size: 1.5rem;
    align-self: flex-start;
  }

  textarea {
    border-radius: 15px;
    background-color: ${variables.colors.mainBlackColor};
    padding: 0.5rem;
    outline: none;
    border: 2px solid ${variables.colors.subColor};
    box-shadow: 10px 10px 10px 5px #222a38;
    width: 80%;
    min-height: 6rem;
    color: ${variables.colors.subColor};
    font-size: 1.5rem;
    line-height: 2rem;
    overflow: hidden;
    resize: none;
  }
`;

const PlainTextInput = () => {
  return (
    <InputWrapper>
      <div className="header">PLAIN TEXT INPUT</div>
      <textarea></textarea>
    </InputWrapper>
  );
};

export default PlainTextInput;
