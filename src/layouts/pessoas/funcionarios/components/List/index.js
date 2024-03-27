import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import PropTypes from "prop-types";
import Funcionario from "../Funcionario";
import MDButton from "components/MDButton";

function List({ funcionarios, handleOnViewFuncionario, handleExcluir }) {
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
          Funcionarios
        </MDTypography>
      </MDBox>
      <MDBox pt={3} px={2}>
        <DataTable
          table={{
            columns: [
              { Header: "funcionario", accessor: "funcionario", width: "45%", align: "left" },
              { Header: "matrícula", accessor: "matricula", align: "center" },
              { Header: "usuário", accessor: "usuario", align: "center" },
              { Header: "opções", accessor: "opcoes", align: "center" },
            ],
            rows: [
              ...funcionarios?.map((funcionario) => ({
                funcionario: (
                  <Funcionario
                    image={funcionario.retrato}
                    name={`${funcionario.objeto_usuario.first_name} ${funcionario.objeto_usuario.last_name}`}
                  />
                ),
                matricula: funcionario.matricula,
                usuario: funcionario.objeto_usuario.username,
                opcoes: (
                  <MDBox display="flex" flexDirection="row">
                    <MDBox mr={1}>
                      <MDButton
                        variant="gradient"
                        color="info"
                        size="small"
                        onClick={() => handleOnViewFuncionario(funcionario.id)}
                      >
                        Visualizar
                      </MDButton>
                    </MDBox>
                    <MDBox ml={1}>
                      <MDButton
                        variant="gradient"
                        color="error"
                        size="small"
                        onClick={() => handleExcluir(funcionario.id)}
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
  funcionarios: PropTypes.object.isRequired,
  handleOnViewFuncionario: PropTypes.func.isRequired,
  handleExcluir: PropTypes.func.isRequired,
};

export default List;
