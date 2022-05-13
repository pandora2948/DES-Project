import styled from "@emotion/styled";
import mixins from "assets/mixins";
import variables from "assets/variables";

const Wrapper = styled.div`
  display: flex;
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

const DivTable = styled.table`
  width: 100%;
  margin: 1rem 0;
  border-collapse: collapse;

  td {
    text-align: center;
    font-weight: 700;
    padding: 1px 5px;
    border: 1px solid ${variables.colors.subColor};
  }
`;

const IPDivide = ({ ip }) => {
  const divideTable = () => {
    const leftSideTable = [];
    const rightSideTable = [];

    for (let k = 0; k < ip.length; k += 1) {
      const leftCells = [];
      const rightCells = [];
      for (let i = 0; i < 8; i += 1) {
        const rows = [];
        for (let j = 0; j < 8; j += 1) {
          const data = (
            <td key={`IP-D - td - ${Math.random().toString().slice(3)}`}>
              {ip[k][i][j]}
            </td>
          );
          rows.push(data);
        }

        if (i < 4) {
          leftCells.push(
            <tr key={`IP-D - tr - ${Math.random().toString().slice(3)}`}>
              {rows}
            </tr>
          );
        } else {
          rightCells.push(
            <tr key={`IP-d - tr - ${Math.random().toString().slice(3)}`}>
              {rows}
            </tr>
          );
        }
      }

      leftSideTable.push(
        <DivTable key={`IP-D - table - ${Math.random().toString().slice(3)}`}>
          <tbody key={`IP-D -  tbody - ${Math.random().toString().slice(3)}`}>
            {leftCells}
          </tbody>
        </DivTable>
      );

      rightSideTable.push(
        <DivTable key={`IP-D - table - ${Math.random().toString().slice(3)}`}>
          <tbody key={`IP-D -  tbody - ${Math.random().toString().slice(3)}`}>
            {rightCells}
          </tbody>
        </DivTable>
      );
    }

    return { leftSideTable, rightSideTable };
  };

  const { leftSideTable, rightSideTable } = divideTable();

  return (
    <Wrapper>
      <Container>{leftSideTable}</Container>
      <Container>{rightSideTable}</Container>
    </Wrapper>
  );
};

export default IPDivide;
