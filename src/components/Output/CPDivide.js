import styled from "@emotion/styled";
import mixins from "../../assets/mixins";
import variables from "../../assets/variables";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10rem;
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

const CPDivide = ({ CPDivided }) => {
  const { leftCP, rightCP } = CPDivided;

  const dividTable = () => {
    const leftCells = [];
    const rightCells = [];

    for (let i = 0; i < 4; i += 1) {
      const leftRows = [];
      const rightRows = [];

      for (let j = 0; j < 7; j += 1) {
        leftRows.push(
          <td key={`CP-D - td - ${Math.random().toString().slice(3)}`}>
            {leftCP[i][j]}
          </td>
        );
        rightRows.push(
          <td key={`CP-D - td - ${Math.random().toString().slice(3)}`}>
            {rightCP[i][j]}
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
    const leftTable = (
      <DivTable key={`CP-D - table - ${Math.random().toString().slice(3)}`}>
        <tbody key={`CP-D -  tbody - ${Math.random().toString().slice(3)}`}>
          {leftCells}
        </tbody>
      </DivTable>
    );
    const rightTable = (
      <DivTable key={`CP-D - table - ${Math.random().toString().slice(3)}`}>
        <tbody key={`CP-D -  tbody - ${Math.random().toString().slice(3)}`}>
          {rightCells}
        </tbody>
      </DivTable>
    );

    return { leftTable, rightTable };
  };

  const { leftTable, rightTable } = dividTable();

  return (
    <Wrapper>
      <Container>{leftTable}</Container>
      <Container>{rightTable}</Container>
    </Wrapper>
  );
};

export default CPDivide;
