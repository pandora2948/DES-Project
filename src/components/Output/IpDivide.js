import styled from "@emotion/styled";
import mixins from "../../assets/mixins";
import variables from "../../assets/variables";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10rem;
`;

const Container = styled.div`
  ${mixins.displayBox}
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
    border: 1px solid ${variables.colors.subColor};
  }
`;

const IpDivide = (props) => {
  const { ip } = props;

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
            <td key={`d - td - ${Math.random().toString().slice(3)}`}>
              {ip[k][i][j]}
            </td>
          );
          rows.push(data);
        }

        if (i < 4) {
          leftCells.push(
            <tr key={`d - tr - ${Math.random().toString().slice(3)}`}>
              {rows}
            </tr>
          );
        } else {
          rightCells.push(
            <tr key={`d - tr - ${Math.random().toString().slice(3)}`}>
              {rows}
            </tr>
          );
        }
      }

      leftSideTable.push(
        <DivTable key={`d - table - ${Math.random().toString().slice(3)}`}>
          <tbody key={`d -  tbody - ${Math.random().toString().slice(3)}`}>
            {leftCells}
          </tbody>
        </DivTable>
      );

      rightSideTable.push(
        <DivTable key={`d - table - ${Math.random().toString().slice(3)}`}>
          <tbody key={`d -  tbody - ${Math.random().toString().slice(3)}`}>
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

export default IpDivide;
