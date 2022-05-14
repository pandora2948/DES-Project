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
  ${mixins.TableStyle}
  margin: 1rem 0;

  td {
    border-color: ${variables.colors.subWhiteColor};
  }
`;

const InitialPermutation = ({ initialPermutation }) => {
  const createCells = () => {
    const table = [];
    for (let i = 0; i < initialPermutation.length; i += 1) {
      const cells = [];
      let count = 0;
      for (let j = 0; j < 8; j += 1) {
        const rows = [];
        for (let k = 0; k < 8; k += 1) {
          const data = (
            <td key={`IP - td - ${Math.random().toString().slice(3)}`}>
              {initialPermutation[i][count]}
            </td>
          );
          rows.push(data);
          count += 1;
        }
        cells.push(
          <tr key={`IP - tr - ${Math.random().toString().slice(3)}`}>{rows}</tr>
        );
      }

      table.push(
        <IpTable key={`IP - table - ${Math.random().toString().slice(3)}`}>
          <tbody key={`IP - tbody - ${Math.random().toString().slice(3)}`}>
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
