import styled from "@emotion/styled";
import mixins from "assets/mixins";
import variables from "assets/variables";
import { useMemo } from "react";

const Wrapper = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Container = styled.div`
  ${mixins.PlainTextBox}
  width: 45%;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const RoundTable = styled.table`
  ${mixins.TableStyle};

  td {
    border-color: ${variables.colors.encryptedBlueColor};
  }
`;

const generateTables = (eachRounds) => {
  const { leftSide, rightSide } = eachRounds;

  const leftElement = [];
  const rightElement = [];

  for (let i = 1; i < 17; i += 1) {
    let count = 0;
    const leftTable = [];
    const rightTable = [];

    for (let j = 0; j < 4; j += 1) {
      const leftRow = [];
      const rightRow = [];

      for (let k = 0; k < 8; k += 1) {
        const leftData = (
          <td key={`round-table - td - ${Math.random().toString().slice(3)}`}>
            {leftSide[0][i][count]}
          </td>
        );

        const rightData = (
          <td key={`round-table - td - ${Math.random().toString().slice(3)}`}>
            {rightSide[0][i][count]}
          </td>
        );

        leftRow.push(leftData);
        rightRow.push(rightData);
        count += 1;
      }

      leftTable.push(
        <tr key={`round-table - tr - ${Math.random().toString().slice(3)}`}>
          {leftRow}
        </tr>
      );

      rightTable.push(
        <tr key={`round-table - tr - ${Math.random().toString().slice(3)}`}>
          {rightRow}
        </tr>
      );
    }

    leftElement.push(
      <RoundTable
        key={`round-table - table - ${Math.random().toString().slice(3)}`}
      >
        <tbody
          key={`round-table -  tbody - ${Math.random().toString().slice(3)}`}
        >
          {leftTable}
        </tbody>
      </RoundTable>
    );

    rightElement.push(
      <RoundTable
        key={`round-table - table - ${Math.random().toString().slice(3)}`}
      >
        <tbody
          key={`round-table - tbody - ${Math.random().toString().slice(3)}`}
        >
          {rightTable}
        </tbody>
      </RoundTable>
    );
  }

  return { leftElement, rightElement };
};

const EachRoundResult = ({ eachRounds }) => {
  const { leftElement, rightElement } = useMemo(
    () => generateTables(eachRounds),
    [eachRounds]
  );

  return (
    <Wrapper>
      <Container>{leftElement}</Container>
      <Container>{rightElement}</Container>
    </Wrapper>
  );
};

export default EachRoundResult;
