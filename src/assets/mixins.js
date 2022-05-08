import { css } from "@emotion/react";
import variables from "./variables";

const mixins = {
  PlainTextBox: css`
    border: 2px solid ${variables.colors.subColor};
    border-radius: 15px;
    background-color: ${variables.colors.mainBlueColor};
    box-shadow: 15px 5px 50px -5px ${variables.colors.subColor};
  `,
  KeyBox: css`
    border: 2px solid ${variables.colors.keyColorRed};
    border-radius: 15px;
    background-color: ${variables.colors.mainBlueColor};
    box-shadow: 15px 5px 50px -5px ${variables.colors.keyColorRed};
  `,
};

export default mixins;
