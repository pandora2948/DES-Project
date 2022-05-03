import { css } from "@emotion/react";
import variables from "./variables";

const mixins = {
  displayBox: css`
    border: 2px solid ${variables.colors.subColor};
    border-radius: 15px;
    background-color: ${variables.colors.mainBlueColor};
    box-shadow: 15px 5px 50px -5px ${variables.colors.subColor};
  `,
};

export default mixins;
