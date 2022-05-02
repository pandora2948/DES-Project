import styled from "@emotion/styled";
import mixins from "../../assets/mixins";
import variables from "../../assets/variables";

const Wrapper = styled.div`
  ${mixins.displayBox}
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 5rem;
  margin-top: 8rem;
`;

const IpTable = styled.table`
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
    border: 1px solid ${variables.colors.subColor};
  }
`;

const InitialPermutation = (props) => {
  const { ip } = props;
  const createCells = () => {
    console.log(ip.length);
    const table = [];
    for (let k = 0; k < ip.length; k += 1) {
      const cells = [];
      for (let i = 0; i < 8; i += 1) {
        const rows = [];
        for (let j = 0; j < 8; j += 1) {
          const data = (
            <td key={Math.random().toString().slice(3)}>{ip[k][i][j]}</td>
          );
          rows.push(data);
        }
        cells.push(<tr key={Math.random().toString().slice(3)}>{rows}</tr>);
      }
      table.push(
        <IpTable>
          <tbody key={Math.random().toString().slice(3)}>{cells}</tbody>
        </IpTable>
      );
    }
    return table;
  };

  return <Wrapper>{createCells()}</Wrapper>;
};

export default InitialPermutation;
