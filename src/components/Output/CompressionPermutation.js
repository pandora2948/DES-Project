import styled from "@emotion/styled";
import mixins from "../../assets/mixins";
import variables from "../../assets/variables";

const Wrapper = styled.div`
  ${mixins.KeyBox}
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 5rem;
  margin-top: 8rem;
`;

const CpTable = styled.table`
  width: 100%;
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
    color: ${variables.colors.keyColorBrightRed};
    border: 1px solid ${variables.colors.keyColorRed};
  }
`;

const CompressionPermutation = (props) => {
  const { compressionPermutation } = props;

  const createCells = () => {
    const table = [];

    for (let i = 0; i < 8; i += 1) {
      const rows = [];

      for (let j = 0; j < 7; j += 1) {
        const data = (
          <td key={`td - ${Math.random().toString().slice(3)}`}>
            {compressionPermutation[i][j]}
          </td>
        );
        rows.push(data);
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
  };

  return <Wrapper>{createCells()}</Wrapper>;
};

export default CompressionPermutation;
