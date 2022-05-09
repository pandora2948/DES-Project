import styled from "@emotion/styled";
import mixins from "../../assets/mixins";
import variables from "../../assets/variables";

const Wrapper = styled.div`
  margin: 5rem 0 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Container = styled.div`
  ${mixins.KeyBox}
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const DivTable = styled.table`
  width: 80%;
  border-collapse: collapse;

  :nth-of-type(odd) {
    margin: 4rem 0;
  }

  :last-of-type {
    margin-bottom: 4rem;
  }

  td {
    text-align: center;
    font-weight: 700;
    padding: 1px 5px;
    border: 1px solid ${variables.colors.keyColorRed};
    color: ${variables.colors.keyColorBrightRed};
  }
`;

const createElement = (leftShiftedRounds, rightShiftedRounds) => {
  const leftElement = [];
  const rightElement = [];

  for (let i = 0; i < 16; i += 1) {
    const leftCells = [];
    const rightCells = [];
    for (let j = 0; j < 4; j += 1) {
      const leftRows = [];
      const rightRows = [];

      for (let k = 0; k < 7; k += 1) {
        leftRows.push(
          <td key={`CP-D - td - ${Math.random().toString().slice(3)}`}>
            {leftShiftedRounds[i][j][k]}
          </td>
        );
        rightRows.push(
          <td key={`CP-D - td - ${Math.random().toString().slice(3)}`}>
            {rightShiftedRounds[i][j][k]}
          </td>
        );
      }
      leftCells.push(
        <tr key={`CP-D - tr - ${Math.random().toString().slice(3)}`}>
          {leftRows}
        </tr>
      );
      rightCells.push(
        <tr key={`CP-D - tr - ${Math.random().toString().slice(3)}`}>
          {rightRows}
        </tr>
      );
    }

    leftElement.push(
      <DivTable key={`CP-D - table - ${Math.random().toString().slice(3)}`}>
        <tbody key={`CP-D -  tbody - ${Math.random().toString().slice(3)}`}>
          {leftCells}
        </tbody>
      </DivTable>
    );
    rightElement.push(
      <DivTable key={`CP-D - table - ${Math.random().toString().slice(3)}`}>
        <tbody key={`CP-D -  tbody - ${Math.random().toString().slice(3)}`}>
          {rightCells}
        </tbody>
      </DivTable>
    );
  }
  return { leftElement, rightElement };
};

const CPShift = ({ CPShifted: { leftShiftedRounds, rightShiftedRounds } }) => {
  const { leftElement, rightElement } = createElement(
    leftShiftedRounds,
    rightShiftedRounds
  );

  return (
    <Wrapper>
      <Container>{leftElement}</Container>
      <Container>{rightElement}</Container>
    </Wrapper>
  );
};

export default CPShift;
