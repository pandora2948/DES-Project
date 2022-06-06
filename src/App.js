import styled from "@emotion/styled";
import { Switch } from "antd";
import variables from "assets/variables";
import Body from "components/Encryption/Body";
import { useState } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 5rem;
  color: ${variables.colors.subWhiteColor};

  header {
    width: 100%;
    font-size: 2.5rem;
    padding: 1.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid ${variables.colors.subWhiteColor};
    background-color: ${variables.colors.mainBlueColor};
  }
`;

const EncryptionSwitch = styled(Switch)`
  span.ant-switch-inner {
    font-weight: 500;
    letter-spacing: 2px;
    font-size: 1.15rem;
  }
`;

const App = () => {
  const [isEncryption, changeIsEncryption] = useState(true);
  return (
    <Wrapper>
      <header>
        <span>DES</span>
        <EncryptionSwitch
          unCheckedChildren="encryption"
          checkedChildren="decryption"
          onChange={(checked) => {
            changeIsEncryption(!checked);
          }}
        />
      </header>
      <Body isEncryption={isEncryption}></Body>
    </Wrapper>
  );
};

export default App;
