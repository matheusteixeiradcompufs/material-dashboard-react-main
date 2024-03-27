import { Switch } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { format } from "date-fns";
import DataTable from "examples/Tables/DataTable";
import PropTypes from "prop-types";

function List({ boletim, handleOnEdit, handleExcluir }) {
  return (
    <DataTable
      table={{
        columns: [
          { Header: "data", accessor: "data", align: "left" },
          { Header: "presença", accessor: "presenca", align: "center" },
          { Header: "", accessor: "opcoes", align: "right" },
        ],
        rows: boletim?.objeto_frequencia.objetos_diasletivos
          .sort((a, b) => new Date(b.data) - new Date(a.data))
          .map((dialetivo) => ({
            data: format(new Date(dialetivo.data), "dd/MM/yyyy"),
            presenca: <Switch size="small" checked={dialetivo.presenca} />,
            opcoes: (
              <MDBox display="flex" flexDirection="row">
                <MDBox mr={1}>
                  <MDButton
                    variant="gradient"
                    color="info"
                    size="small"
                    onClick={() => handleOnEdit(dialetivo.id)}
                  >
                    Modificar
                  </MDButton>
                </MDBox>
                <MDBox ml={1}>
                  <MDButton
                    variant="gradient"
                    color="error"
                    size="small"
                    onClick={() => handleExcluir(dialetivo.id)}
                  >
                    Excluir
                  </MDButton>
                </MDBox>
              </MDBox>
            ),
          })),
      }}
      isSorted={false}
      entriesPerPage={false}
      showTotalEntries={false}
      noEndBorder
    />
  );
}

List.propTypes = {
  boletim: PropTypes.object,
  handleOnEdit: PropTypes.func.isRequired,
  handleExcluir: PropTypes.func.isRequired,
};

export default List;
