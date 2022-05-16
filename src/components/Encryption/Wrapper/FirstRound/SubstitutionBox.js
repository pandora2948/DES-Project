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

const SboxTable = styled.table`
  ${mixins.TableStyle}

  td {
    color: ${variables.colors.encryptedBlueColor};
    border-color: ${variables.colors.encryptedBlueColor};
  }
`;

const createCells = (sBox) => {
  const table = [];
  let count = 0;

  for (let i = 0; i < 8; i += 1) {
    const rows = [];

    for (let j = 0; j < 4; j += 1) {
      const data = (
        <td key={`Sbox - td - ${Math.random().toString().slice(3)}`}>
          {sBox[count]}
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
    <SboxTable key={`Sbox - table - ${Math.random().toString().slice(3)}`}>
      <tbody key={`Sbox - tbody - ${Math.random().toString().slice(3)}`}>
        {table}
      </tbody>
    </SboxTable>
  );

  return element;
};

const SubstitutionBox = ({ sBox }) => {
  return <Wrapper>{createCells(sBox)}</Wrapper>;
};

export default SubstitutionBox;
