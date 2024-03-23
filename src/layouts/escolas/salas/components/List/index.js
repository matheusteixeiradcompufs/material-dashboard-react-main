import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import PropTypes from "prop-types";

function List({ salas, handleOnView, handleExcluir }) {
  const columns = [
    { Header: "numero", accessor: "numero", align: "left" },
    { Header: "quantidade de alunos", accessor: "quantidade", align: "center" },
    { Header: "opcoes", accessor: "opcoes", align: "right" },
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
          Salas da Escola
        </MDTypography>
      </MDBox>
      <MDBox pt={3} px={2}>
        <DataTable
          table={{
            columns,
            rows: salas.map((sala) => ({
              numero: String(sala.numero).padStart(3, "0"),
              quantidade: sala.quantidade_alunos,
              opcoes: (
                <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                  <Grid item xs={12} sm={6} container>
                    <MDButton
                      variant="gradient"
                      color="info"
                      size="small"
                      onClick={() => handleOnView(sala.id)}
                    >
                      Visualizar
                    </MDButton>
                  </Grid>
                  <Grid item xs={12} sm={6} container>
                    <MDButton
                      variant="gradient"
                      color="error"
                      size="small"
                      onClick={() => handleExcluir(sala.id)}
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
  salas: PropTypes.array.isRequired,
  handleOnView: PropTypes.func.isRequired,
  handleExcluir: PropTypes.func.isRequired,
};

export default List;
