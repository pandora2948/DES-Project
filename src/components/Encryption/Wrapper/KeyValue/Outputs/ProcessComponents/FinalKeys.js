import styled from "@emotion/styled";
import { useCallback } from "react";
import variables from "assets/variables";
import mixins from "assets/mixins";

const Wrapper = styled.div`
  ${mixins.KeyBox}
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
`;

const CpTable = styled.table`
  ${mixins.TableStyle}

  td {
    color: ${variables.colors.keyColorBrightRed};
    border-color: ${variables.colors.keyColorRed};
  }
`;

const FinalKeys = ({ finalKeys }) => {
  const createCells = useCallback(() => {
    const tables = [];

    for (let i = 0; i < 16; i += 1) {
      let count = 0;
      const round = [];

      for (let j = 0; j < 8; j += 1) {
        const rows = [];

        for (let k = 0; k < 6; k += 1) {
          const data = (
            <td key={`td - ${Math.random().toString().slice(3)}`}>
              {finalKeys[i][count]}
            </td>
          );
          rows.push(data);
          count += 1;
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

export default FinalKeys;
