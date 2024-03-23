import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { format } from "date-fns";
import DataTable from "examples/Tables/DataTable";
import PropTypes from "prop-types";

function List({ avisos, handleOnViewAvisos, handleExcluir }) {
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
          Avisos do Mural
        </MDTypography>
      </MDBox>
      <MDBox pt={3} px={2}>
        <DataTable
          table={{
            columns: [
              { Header: "data", accessor: "data", width: "30%", align: "left" },
              { Header: "titulo", accessor: "titulo", width: "40%", align: "left" },
              { Header: "", accessor: "opcoes", align: "center" },
            ],
            rows: [
              ...avisos
                .sort((a, b) => new Date(b.publicado_em) - new Date(a.publicado_em))
                .map((objeto) => ({
                  data: format(new Date(objeto.publicado_em), "dd/MM/yyyy 'às' HH:mm 'horas'"),
                  titulo: objeto.titulo,
                  opcoes: (
                    <MDBox display="flex" flexDirection="row">
                      <MDBox mr={1}>
                        <MDButton
                          variant="gradient"
                          color="info"
                          size="small"
                          onClick={() => handleOnViewAvisos(objeto.id)}
                        >
                          Visualizar
                        </MDButton>
                      </MDBox>
                      <MDBox ml={1}>
                        <MDButton
                          variant="gradient"
                          color="error"
                          size="small"
                          onClick={() => handleExcluir(objeto.id)}
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
  avisos: PropTypes.array.isRequired,
  handleOnViewAvisos: PropTypes.func.isRequired,
  handleExcluir: PropTypes.func.isRequired,
};

export default List;
