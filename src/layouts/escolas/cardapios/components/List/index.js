import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import PropTypes from "prop-types";

function List({ cardapios, handleOnView, handleExcluir }) {
  const columns = [
    { Header: "data", width: "35%", accessor: "data", align: "left" },
    { Header: "turno", width: "35%", accessor: "turno", align: "center" },
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
          Cardápios da Escola
        </MDTypography>
      </MDBox>
      <MDBox pt={3} px={2}>
        <DataTable
          table={{
            columns,
            rows: cardapios
              .sort((a, b) => new Date(b.data) - new Date(a.data))
              .map((cardapio) => ({
                data: cardapio.data,
                turno: cardapio.turno,
                opcoes: (
                  <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                    <Grid item xs={12} sm={6} container>
                      <MDButton
                        variant="gradient"
                        color="info"
                        size="small"
                        onClick={() => handleOnView(cardapio.id)}
                      >
                        Visualizar
                      </MDButton>
                    </Grid>
                    <Grid item xs={12} sm={6} container>
                      <MDButton
                        variant="gradient"
                        color="error"
                        size="small"
                        onClick={() => handleExcluir(cardapio.id)}
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
  cardapios: PropTypes.array.isRequired,
  handleOnView: PropTypes.func.isRequired,
  handleExcluir: PropTypes.func.isRequired,
};

export default List;
