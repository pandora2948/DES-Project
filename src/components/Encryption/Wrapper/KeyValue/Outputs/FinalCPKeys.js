import styled from "@emotion/styled";
import { useCallback } from "react";
import variables from "assets/variables";

const Wrapper = styled.div``;

const CpTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 4rem 0;

  td {
    text-align: center;
    font-weight: 700;
    padding: 1px 5px;
    color: ${variables.colors.keyColorBrightRed};
    border: 1px solid ${variables.colors.keyColorRed};
  }
`;

const FinalCPKeys = ({ finalKeys }) => {
  const createCells = useCallback(() => {
    const tables = [];

    for (let i = 0; i < 16; i += 1) {
      const round = [];

      for (let j = 0; j < 8; j += 1) {
        const rows = [];

        for (let k = 0; k < 6; k += 1) {
          const data = (
            <td key={`td - ${Math.random().toString().slice(3)}`}>
              {finalKeys[i][j][k]}
            </td>
          );
          rows.push(data);
        }
        round.push(
          <tr key={`tr - ${Math.random().toString().slice(3)}`}>{rows}</tr>
        );
      }

      tables.push(
        <CpTable key={`table - ${Math.random().toString().slice(3)}`}>
          <tbody key={`tbody - ${Math.random().toString().slice(3)}`}>
            {round}
          </tbody>
        </CpTable>
      );
    }

    return tables;
  }, [finalKeys]);

  return <Wrapper>{createCells()}</Wrapper>;
};

export default FinalCPKeys;