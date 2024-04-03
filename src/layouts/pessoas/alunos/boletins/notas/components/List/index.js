import { Card, Icon } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import PropTypes from "prop-types";

function List({ avaliacoes, situacoes, medias, handleOnEdit, handleOnFinal }) {
  const columns = [
    { Header: "matéria", accessor: "materia", width: "20%", align: "left" },
    { Header: "a1", accessor: "a1", align: "center" },
    { Header: "a2", accessor: "a2", align: "center" },
    { Header: "r1", accessor: "r1", align: "center" },
    { Header: "m1", accessor: "m1", align: "center" },
    { Header: "a3", accessor: "a3", align: "center" },
    { Header: "a4", accessor: "a4", align: "center" },
    { Header: "r2", accessor: "r2", align: "center" },
    { Header: "m2", accessor: "m2", align: "center" },
    { Header: "mg", accessor: "mg", align: "center" },
    { Header: "situação", accessor: "situacao", align: "center" },
  ];

  const gerarLinhas = () => {
    const linhas = [];
    for (let i = 0; i < situacoes.length; i++) {
      const linha = {
        materia: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {avaliacoes[i * 6].objeto_disciplina.nome}
          </MDTypography>
        ),
        a1: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {avaliacoes[i * 6].nota.toFixed(1)}
          </MDTypography>
        ),
        a2: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {avaliacoes[i * 6 + 1].nota.toFixed(1)}
          </MDTypography>
        ),
        r1: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {avaliacoes[i * 6 + 2].nota.toFixed(1)}
          </MDTypography>
        ),
        m1: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {medias[(i * 6) / 2].valor.toFixed(1)}
          </MDTypography>
        ),
        a3: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {avaliacoes[i * 6 + 3].nota.toFixed(1)}
          </MDTypography>
        ),
        a4: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {avaliacoes[i * 6 + 4].nota.toFixed(1)}
          </MDTypography>
        ),
        r2: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {avaliacoes[i * 6 + 5].nota.toFixed(1)}
          </MDTypography>
        ),
        m2: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {medias[(i * 6) / 2 + 1].valor.toFixed(1)}
          </MDTypography>
        ),
        mg: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {medias[(i * 6) / 2 + 2].valor.toFixed(1)}
          </MDTypography>
        ),
        situacao: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {situacoes[i].situacao}
          </MDTypography>
        ),
      };
      linhas.push(linha);
    }
    linhas.push({
      materia: "",
      a1: (
        <MDButton
          variant="gradient"
          color="info"
          title="Editar 1ª Avaliação"
          size="small"
          onClick={() => handleOnEdit("A1")}
          iconOnly
        >
          <Icon>edit</Icon>
        </MDButton>
      ),
      a2: (
        <MDButton
          variant="gradient"
          color="info"
          title="Editar 2ª Avaliação"
          size="small"
          onClick={() => handleOnEdit("A2")}
          iconOnly
        >
          <Icon>edit</Icon>
        </MDButton>
      ),
      r1: (
        <MDButton
          variant="gradient"
          color="info"
          title="Editar 1ª Recuperação"
          size="small"
          onClick={() => handleOnEdit("R1")}
          iconOnly
        >
          <Icon>edit</Icon>
        </MDButton>
      ),
      m1: "",
      a3: (
        <MDButton
          variant="gradient"
          color="info"
          title="Editar 3ª Avaliação"
          size="small"
          onClick={() => handleOnEdit("A3")}
          iconOnly
        >
          <Icon>edit</Icon>
        </MDButton>
      ),
      a4: (
        <MDButton
          variant="gradient"
          color="info"
          title="Editar 4ª Avaliação"
          size="small"
          onClick={() => handleOnEdit("A4")}
          iconOnly
        >
          <Icon>edit</Icon>
        </MDButton>
      ),
      r2: (
        <MDButton
          variant="gradient"
          color="info"
          title="Editar 2ª Recuperação"
          size="small"
          onClick={() => handleOnEdit("R2")}
          iconOnly
        >
          <Icon>edit</Icon>
        </MDButton>
      ),
      m2: "",
      mg: "",
      situacao: (
        <MDButton
          variant="gradient"
          color="info"
          title="Finalizar Matérias"
          size="small"
          onClick={handleOnFinal}
          iconOnly
        >
          <Icon>edit</Icon>
        </MDButton>
      ),
    });
    return linhas;
  };
  return (
    <Card>
      <MDBox
        mx={2}
        mt={-3}
        py={3}
        px={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography variant="h6" color="white">
          Notas do Aluno
        </MDTypography>
      </MDBox>
      <MDBox pt={3}>
        <DataTable
          table={{ columns, rows: gerarLinhas() }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          noEndBorder
        />
      </MDBox>
    </Card>
  );
}

List.propTypes = {
  avaliacoes: PropTypes.array.isRequired,
  medias: PropTypes.array.isRequired,
  situacoes: PropTypes.array.isRequired,
  handleOnEdit: PropTypes.func.isRequired,
  handleOnFinal: PropTypes.func.isRequired,
};

export default List;
