import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import PropTypes from "prop-types";

function List({ escolas, handleOnViewEscolas, handleExcluir }) {
  const columns = [
    { Header: "cnpj", accessor: "cnpj", align: "left" },
    { Header: "nome", accessor: "nome", align: "left" },
    { Header: "num_salas", accessor: "num_salas", align: "center" },
    { Header: "quantidade_alunos", accessor: "quantidade_alunos", align: "center" },
    { Header: "opcoes", accessor: "opcoes", align: "center" },
  ];
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
          Lista de Escolas
        </MDTypography>
      </MDBox>
      <MDBox pt={3} px={2}>
        <DataTable
          table={{
            columns,
            rows: escolas.map((escola) => ({
              cnpj: escola.cnpj,
              nome: escola.nome,
              num_salas: escola.num_salas,
              quantidade_alunos: escola.quantidade_alunos,
              opcoes: (
                <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                  <Grid item xs={12} sm={6} container>
                    <MDButton
                      variant="gradient"
                      color="info"
                      size="small"
                      onClick={() => handleOnViewEscolas(escola.id)}
                    >
                      Visualizar
                    </MDButton>
                  </Grid>
                  <Grid item xs={12} sm={6} container>
                    <MDButton
                      variant="gradient"
                      color="error"
                      size="small"
                      onClick={() => handleExcluir(escola.id)}
                    >
                      Excluir
                    </MDButton>
                  </Grid>
                </Grid>
              ),
            })),
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
  escolas: PropTypes.array.isRequired,
  handleOnViewEscolas: PropTypes.func.isRequired,
  handleExcluir: PropTypes.func.isRequired,
};

export default List;
