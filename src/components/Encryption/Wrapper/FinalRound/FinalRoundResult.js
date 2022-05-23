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

const FinalRoundResult = ({ FPResult }) => {
  const createCells = () => {
    let count = 0;
    const table = [];
    for (let j = 0; j < 8; j += 1) {
      const rows = [];

      for (let k = 0; k < 8; k += 1) {
        const data = (
          <td key={`td - ${Math.random().toString().slice(3)}`}>
            {FPResult[count]}
          </td>
        );
        rows.push(data);
        count += 1;
      }

      table.push(
        <tr key={`tr - ${Math.random().toString().slice(3)}`}>{rows}</tr>
      );
    }

    const Element = (
      <FinalRoundTable key={`table - ${Math.random().toString().slice(3)}`}>
        <tbody key={`tbody - ${Math.random().toString().slice(3)}`}>
          {table}
        </tbody>
      </FinalRoundTable>
    );

    return Element;
  };

  return <Wrapper>{createCells()}</Wrapper>;
};

export default FinalRoundResult;
