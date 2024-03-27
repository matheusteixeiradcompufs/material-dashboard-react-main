import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import PropTypes from "prop-types";

function List({ boletins, getTurno, handleOnView, handleExcluir }) {
  const columns = [
    { Header: "nome", accessor: "nome", align: "left" },
    { Header: "ano", accessor: "ano", align: "center" },
    { Header: "turno", accessor: "turno", align: "center" },
    { Header: "status", accessor: "status", align: "center" },
    { Header: "", accessor: "opcoes", align: "right" },
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
          Matrículas do Aluno
        </MDTypography>
      </MDBox>
      <MDBox pt={3} px={2}>
        <DataTable
          table={{
            columns,
            rows: boletins.map((boletim) => ({
              nome: boletim.objeto_turma.nome,
              ano: boletim.objeto_turma.ano,
              turno: getTurno(boletim.objeto_turma.turno),
              status: boletim.status,
              opcoes: (
                <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                  <Grid item xs={12} sm={6} container>
                    <MDButton
                      variant="gradient"
                      color="info"
                      size="small"
                      onClick={() => handleOnView(boletim.id)}
                    >
                      Visualizar
                    </MDButton>
                  </Grid>
                  <Grid item xs={12} sm={6} container>
                    <MDButton
                      variant="gradient"
                      color="error"
                      size="small"
                      onClick={() => handleExcluir(boletim.id)}
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
  boletins: PropTypes.array.isRequired,
  getTurno: PropTypes.func.isRequired,
  handleOnView: PropTypes.func.isRequired,
  handleExcluir: PropTypes.func.isRequired,
};

export default List;
