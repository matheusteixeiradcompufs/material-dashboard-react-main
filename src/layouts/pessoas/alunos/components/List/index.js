import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import PropTypes from "prop-types";
import Aluno from "../Aluno";
import MDButton from "components/MDButton";

function List({ alunos, handleOnViewAluno, handleExcluir }) {
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
          Alunos
        </MDTypography>
      </MDBox>
      <MDBox pt={3} px={2}>
        <DataTable
          table={{
            columns: [
              { Header: "aluno", accessor: "aluno", width: "45%", align: "left" },
              { Header: "matrícula", accessor: "matricula", align: "center" },
              { Header: "usuário", accessor: "usuario", align: "center" },
              { Header: "opções", accessor: "opcoes", align: "center" },
            ],
            rows: [
              ...alunos?.map((aluno) => ({
                aluno: (
                  <Aluno
                    image={aluno.retrato}
                    name={`${aluno.objeto_usuario.first_name} ${aluno.objeto_usuario.last_name}`}
                  />
                ),
                matricula: aluno.matricula,
                usuario: aluno.objeto_usuario.username,
                opcoes: (
                  <MDBox display="flex" flexDirection="row">
                    <MDBox mr={1}>
                      <MDButton
                        variant="gradient"
                        color="info"
                        size="small"
                        onClick={() => handleOnViewAluno(aluno.id)}
                      >
                        Visualizar
                      </MDButton>
                    </MDBox>
                    <MDBox ml={1}>
                      <MDButton
                        variant="gradient"
                        color="error"
                        size="small"
                        onClick={() => handleExcluir(aluno.id)}
                      >
                        Excluir
                      </MDButton>
                    </MDBox>
                  </MDBox>
                ),
              })),
            ],
          }}
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
  alunos: PropTypes.object.isRequired,
  handleOnViewAluno: PropTypes.func.isRequired,
  handleExcluir: PropTypes.func.isRequired,
};

export default List;
