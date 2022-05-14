import { css } from "@emotion/react";
import variables from "./variables";

const mixins = {
  PlainTextBox: css`
    border: 2px solid ${variables.colors.subWhiteColor};
    border-radius: 15px;
    background-color: ${variables.colors.mainBlueColor};
    box-shadow: 15px 5px 30px -20px ${variables.colors.subWhiteColor};
    padding: 1rem 0;
  `,

  KeyBox: css`
    border: 2px solid ${variables.colors.keyColorRed};
    border-radius: 15px;
    background-color: ${variables.colors.mainBlueColor};
    box-shadow: 10px 10px 20px -5px ${variables.colors.keyColorRed};
    padding: 1rem 0;
  `,

  TextBoxStyle: css`
    width: 90%;
    min-height: 6rem;
    line-height: 2rem;
    padding: 0.5rem;
    font-family: inherit;
    outline: none;
    border: 2px solid white;
    border-radius: 15px;
    background-color: ${variables.colors.mainBlackColor};
    box-shadow: 10px 10px 10px 5px #222a38;
    color: white;
    font-size: 1.5rem;
    overflow: hidden;
    resize: none;
  `,

  TableStyle: css`
    width: 100%;
    margin: 1rem 0;
    border-collapse: collapse;

    td {
      text-align: center;
      font-weight: 700;
      padding: 1px 5px;
      border: 1px solid white;
    }
  `,
};

export default mixins;
