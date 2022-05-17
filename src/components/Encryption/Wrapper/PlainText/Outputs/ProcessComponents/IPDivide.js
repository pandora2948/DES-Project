import styled from "@emotion/styled";
import mixins from "assets/mixins";
import variables from "assets/variables";
import { useCallback, useMemo } from 'react';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div`
  ${mixins.PlainTextBox}
  width: 45%;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const DivTable = styled.table`
  ${mixins.TableStyle};

  td {
    border-color: ${variables.colors.subWhiteColor};
  }
`;

const IPDivide = ({
  dividedPermutation: { leftPermutations, rightPermutations },
}) => {
  const divideTable = useCallback(() => {
    const leftElement = [];
    const rightElement = [];

    for (let i = 0; i < leftPermutations.length; i += 1) {
      let count = 0;
      const leftTable = [];
      const rightTable = [];

      for (let j = 0; j < 4; j += 1) {
        const leftRow = [];
        const rightRow = [];

        for (let k = 0; k < 8; k += 1) {
          const leftData = (
            <td key={`IP - D - td - ${Math.random().toString().slice(3)}`}>
              {leftPermutations[i][count]}
            </td>
          );

          const rightData = (
            <td key={`IP - D - td - ${Math.random().toString().slice(3)}`}>
              {rightPermutations[i][count]}
            </td>
          );

          leftRow.push(leftData);
          rightRow.push(rightData);
          count += 1;
        }

        leftTable.push(
          <tr key={`IP - tr - ${Math.random().toString().slice(3)}`}>
            {leftRow}
          </tr>
        );

        rightTable.push(
          <tr key={`IP - tr - ${Math.random().toString().slice(3)}`}>
            {rightRow}
          </tr>
        );
      }

      leftElement.push(
        <DivTable key={`IP - D - table - ${Math.random().toString().slice(3)}`}>
          <tbody key={`IP - D -  tbody - ${Math.random().toString().slice(3)}`}>
            {leftTable}
          </tbody>
        </DivTable>
      );

      rightElement.push(
        <DivTable key={`IP - D - table - ${Math.random().toString().slice(3)}`}>
          <tbody key={`IP - D -  tbody - ${Math.random().toString().slice(3)}`}>
            {rightTable}
          </tbody>
        </DivTable>
      );
    }

    return { leftElement, rightElement };
  }, [leftPermutations, rightPermutations]);

  const { leftElement, rightElement } = useMemo(() => divideTable(), [divideTable()]);

  return (
    <Wrapper>
      <Container>{leftElement}</Container>
      <Container>{rightElement}</Container>
    </Wrapper>
  );
};

export default IPDivide;
