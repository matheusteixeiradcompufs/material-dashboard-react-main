import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import PropTypes from "prop-types";

function List({ sala, handleOnView, handleExcluir }) {
  const columns = [
    { Header: "nome", accessor: "nome", align: "left" },
    { Header: "ano", accessor: "ano", align: "left" },
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
          Turmas da Sala {String(sala.numero).padStart(3, "0")}
        </MDTypography>
      </MDBox>
      <MDBox pt={3} px={2}>
        <DataTable
          table={{
            columns,
            rows: sala.objetos_turmas
              ? sala.objetos_turmas.map((turma) => ({
                  nome: turma.nome,
                  ano: turma.ano,
                  opcoes: (
                    <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                      <Grid item xs={12} sm={6} container>
                        <MDButton
                          variant="gradient"
                          color="info"
                          size="small"
                          onClick={() => handleOnView(turma.id)}
                        >
                          Visualizar
                        </MDButton>
                      </Grid>
                      <Grid item xs={12} sm={6} container>
                        <MDButton
                          variant="gradient"
                          color="error"
                          size="small"
                          onClick={() => handleExcluir(turma.id)}
                        >
                          Excluir
                        </MDButton>
                      </Grid>
                    </Grid>
                  ),
                }))
              : [],
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
  sala: PropTypes.object.isRequired,
  handleOnView: PropTypes.func.isRequired,
  handleExcluir: PropTypes.func.isRequired,
};

export default List;
