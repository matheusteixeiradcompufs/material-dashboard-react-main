import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import PropTypes from "prop-types";

function List({ itens, handleOnViewItens }) {
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
          Itens do Cardápio
        </MDTypography>
      </MDBox>
      <MDBox pt={3} px={2}>
        <DataTable
          table={{
            columns: [
              { Header: "ítem", accessor: "item", width: "85%", align: "left" },
              { Header: "", accessor: "opcoes", align: "center" },
            ],
            rows: [
              ...itens?.map((objeto) => ({
                item: objeto.nome,
                opcoes: (
                  <MDBox display="flex" flexDirection="row">
                    <MDButton
                      variant="gradient"
                      color="info"
                      size="small"
                      onClick={() => handleOnViewItens(objeto.id)}
                    >
                      Visualizar
                    </MDButton>
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
  itens: PropTypes.array.isRequired,
  handleOnViewItens: PropTypes.func.isRequired,
};

export default List;
