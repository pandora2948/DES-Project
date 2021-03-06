import styled from "@emotion/styled";
import { useCallback } from "react";
import mixins from "assets/mixins";
import variables from "assets/variables";

const Wrapper = styled.div`
  ${mixins.KeyBox}
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CpTable = styled.table`
  ${mixins.TableStyle}

  td {
    color: ${variables.colors.keyColorBrightRed};
    border-color: ${variables.colors.keyColorRed};
  }
`;

const CompressionPermutation = ({ compressionPermutation }) => {
  const createCells = useCallback(() => {
    const table = [];
    let count = 0;
    for (let i = 0; i < 8; i += 1) {
      const rows = [];

      for (let j = 0; j < 7; j += 1) {
        const data = (
          <td key={`td - ${Math.random().toString().slice(3)}`}>
            {compressionPermutation[count]}
          </td>
        );
        rows.push(data);
        count += 1;
      }
      table.push(
        <tr key={`tr - ${Math.random().toString().slice(3)}`}>{rows}</tr>
      );
    }

    const element = (
      <CpTable key={`table - ${Math.random().toString().slice(3)}`}>
        <tbody key={`tbody - ${Math.random().toString().slice(3)}`}>
          {table}
        </tbody>
      </CpTable>
    );

    return element;
  }, [compressionPermutation]);

  return <Wrapper>{createCells()}</Wrapper>;
};

export default CompressionPermutation;
