import styled from "@emotion/styled";
import mixins from "../../assets/mixins";
import variables from "../../assets/variables";

const Wrapper = styled.div`
  ${mixins.KeyBox}
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .header {
    color: ${variables.colors.keyColorBrightRed};
    margin: 0 0 2rem 0;
    font-size: 1.5rem;
    align-self: flex-start;
  }

  textarea {
    ${mixins.KeyBox}
    border-radius: 15px;
    font-family: inherit;
    background-color: ${variables.colors.mainBlackColor};
    padding: 0.5rem;
    outline: none;
    width: 90%;
    min-height: 6rem;
    color: ${variables.colors.keyColorBrightRed};
    font-size: 1.5rem;
    line-height: 2rem;
    overflow: hidden;
    resize: none;
  }
`;

const KeyInput = (props) => {
  const { setKeyValue } = props;

  const handleInputKey = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      keyGenerate(e.target.value);
    }
  };

  const keyGenerate = (keyValue) => {
    let length = keyValue.length;
    const codes = [];

    for (const char of keyValue) {
      codes.push(char.charCodeAt().toString(2).padStart(8, "0"));
    }

    while (length % 8 !== 0) {
      codes.push(
        Math.floor(Math.random() * 256)
          .toString(2)
          .padStart(8, "0")
      );
      length += 1;
    }
    setKeyValue(codes);
  };

  return (
    <Wrapper>
      <div className="header">KEY VALUE INPUT</div>
      <textarea id="keyInput" onKeyDown={handleInputKey}></textarea>
    </Wrapper>
  );
};

export default KeyInput;
