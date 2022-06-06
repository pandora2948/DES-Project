import styled from "@emotion/styled";
import mixins from "assets/mixins";
import variables from "assets/variables";

const Wrapper = styled.div`
  ${mixins.PlainTextBox}
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
`;

const EpTable = styled.table`
  ${mixins.TableStyle}

  td {
    border-color: ${variables.colors.subWhiteColor};
  }
`;

const generateElement = (expensionPermutations) => {
  const table = [];

  for (let i = 0; i < expensionPermutations.length; i += 1) {
    const cells = [];
    let count = 0;
    for (let j = 0; j < 8; j += 1) {
      const rows = [];

      for (let k = 0; k < 6; k += 1) {
        const data = (
          <td key={`EP - td - ${Math.random().toString().slice(3)}`}>
            {expensionPermutations[i][count]}
          </td>
        );
        rows.push(data);
        count += 1;
      }
      cells.push(
        <tr key={`EP - tr - ${Math.random().toString().slice(3)}`}>{rows}</tr>
      );
    }

    table.push(
      <EpTable key={`EP - table - ${Math.random().toString().slice(3)}`}>
        <tbody key={`EP - tbody - ${Math.random().toString().slice(3)}`}>
          {cells}
        </tbody>
      </EpTable>
    );
  }

  return table;
};

const ExpensionPermutation = ({ expensionPermutations }) => {
  return <Wrapper>{generateElement(expensionPermutations)}</Wrapper>;
};

export default ExpensionPermutation;
