import styled from "@emotion/styled";
import mixins from "assets/mixins";
import variables from "assets/variables";

const Wrapper = styled.div`
  ${mixins.PlainTextBox}
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 2rem;
`;

const IpTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;

  td {
    text-align: center;
    font-weight: 700;
    padding: 1px 5px;
    border: 1px solid ${variables.colors.subColor};
  }
`;

const InitialPermutation = ({ ip }) => {
  const createCells = () => {
    const table = [];
    for (let k = 0; k < ip.length; k += 1) {
      const cells = [];
      for (let i = 0; i < 8; i += 1) {
        const rows = [];
        for (let j = 0; j < 8; j += 1) {
          const data = (
            <td key={`td - ${Math.random().toString().slice(3)}`}>
              {ip[k][i][j]}
            </td>
          );
          rows.push(data);
        }
        cells.push(
          <tr key={`tr - ${Math.random().toString().slice(3)}`}>{rows}</tr>
        );
      }

      table.push(
        <IpTable key={`table - ${Math.random().toString().slice(3)}`}>
          <tbody key={`tbody - ${Math.random().toString().slice(3)}`}>
            {cells}
          </tbody>
        </IpTable>
      );
    }
    return table;
  };

  return <Wrapper>{createCells()}</Wrapper>;
};

export default InitialPermutation;
