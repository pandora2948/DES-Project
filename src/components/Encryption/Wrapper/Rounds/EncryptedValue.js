import styled from "@emotion/styled";
import mixins from "assets/mixins";
import variables from "assets/variables";

const Wrapper = styled.div`
  ${mixins.EncryptedBox}
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FinalRoundTable = styled.table`
  ${mixins.TableStyle}

  td {
    color: ${variables.colors.encryptedBlueColor};
    border-color: ${variables.colors.encryptedBlueColor};
  }
`;

const CharactorGrid = styled.div`
  ${mixins.EncryptedBox}
  width: 100%;
  margin: 1rem 0;
  text-align: center;
  display: grid;
  grid: auto-flow / repeat(8, 1fr);
  row-gap: 0.5rem;
`;

const createCells = (resultBit) => {
  const tables = [];

  for (let i = 0; i < resultBit.length; i += 1) {
    let count = 0;
    const table = [];
    for (let j = 0; j < 8; j += 1) {
      const rows = [];

      for (let k = 0; k < 8; k += 1) {
        const data = (
          <td key={`td - ${Math.random().toString().slice(3)}`}>
            {resultBit[i][count]}
          </td>
        );
        rows.push(data);
        count += 1;
      }

      table.push(
        <tr key={`tr - ${Math.random().toString().slice(3)}`}>{rows}</tr>
      );
    }
    tables.push(
      <FinalRoundTable key={`table - ${Math.random().toString().slice(3)}`}>
        <tbody key={`tbody - ${Math.random().toString().slice(3)}`}>
          {table}
        </tbody>
      </FinalRoundTable>
    );
  }

  return tables;
};

const createGrid = (charactor) => {
  const chars = charactor.map((el) => {
    return (
      <div key={`charactor - ${Math.random().toString().slice(3)}`}>{el}</div>
    );
  });
  return <CharactorGrid>{chars}</CharactorGrid>;
};

const EncryptedValue = ({ FPResult, resultChar }) => {
  return (
    <Wrapper>
      {createCells(FPResult)}
      {createGrid(resultChar)}
    </Wrapper>
  );
};

export default EncryptedValue;
