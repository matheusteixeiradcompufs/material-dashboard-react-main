import { Grid, Icon, Tooltip } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import PropTypes from "prop-types";
import Add from "./components/Add";
import View from "./components/View";
import Edit from "./components/Edit";

function Avisos({
  diaAgenda,
  handleOnViewAviso,
  handleExcluirAviso,
  addAviso,
  handleOnAddAviso,
  titulo,
  handleSetTitulo,
  texto,
  handleSetTexto,
  handleAddAviso,
  handleOffAdd,
  viewAviso,
  handleOnEditAviso,
  editAviso,
  aviso,
  handleEditarAviso,
}) {
  return (
    <MDBox pt={3} px={2} mb={2}>
      <MDBox
        mx={2}
        py={1}
        px={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <MDTypography variant="h6" color="white">
          Avisos do dia
        </MDTypography>
        {diaAgenda && !addAviso ? (
          <Tooltip onClick={handleOnAddAviso} title="Add Aviso" placement="top">
            <Icon sx={{ color: "#fff", fontSize: 60 }}>add</Icon>
          </Tooltip>
        ) : (
          <></>
        )}
      </MDBox>
      <DataTable
        table={{
          columns: [
            { Header: "Avisos", accessor: "aviso", width: "70%", align: "left" },
            { Header: "", accessor: "opcoes", align: "right" },
          ],
          rows: diaAgenda
            ? diaAgenda.objetos_avisos.map((objeto) => ({
                aviso: objeto.titulo,
                opcoes: (
                  <MDBox display="flex" flexDirection="row">
                    <MDBox mr={1}>
                      <MDButton
                        variant="gradient"
                        color="info"
                        size="small"
                        onClick={() => handleOnViewAviso(objeto.id)}
                      >
                        Visualizar
                      </MDButton>
                    </MDBox>
                    <MDBox mr={1}>
                      <MDButton
                        variant="gradient"
                        color="error"
                        size="small"
                        onClick={() => handleExcluirAviso(objeto.id)}
                      >
                        Excluir
                      </MDButton>
                    </MDBox>
                  </MDBox>
                ),
              }))
            : [],
        }}
        isSorted={false}
        entriesPerPage={false}
        showTotalEntries={false}
        noEndBorder
      />
      {addAviso ? (
        <Add
          titulo={titulo}
          handleSetTitulo={handleSetTitulo}
          texto={texto}
          handleSetTexto={handleSetTexto}
          handleAddAviso={handleAddAviso}
          handleOffAdd={handleOffAdd}
        />
      ) : (
        <></>
      )}
      {viewAviso ? (
        <View
          titulo={titulo}
          handleSetTitulo={handleSetTitulo}
          texto={texto}
          handleSetTexto={handleSetTexto}
          handleOnEditAviso={handleOnEditAviso}
          handleOffAdd={handleOffAdd}
        />
      ) : (
        <></>
      )}
      {editAviso ? (
        <Edit
          titulo={titulo}
          handleSetTitulo={handleSetTitulo}
          texto={texto}
          handleSetTexto={handleSetTexto}
          aviso={aviso}
          handleEditarAviso={handleEditarAviso}
          handleOnViewAviso={handleOnViewAviso}
        />
      ) : (
        <></>
      )}
    </MDBox>
  );
}

Avisos.propTypes = {
  diaAgenda: PropTypes.object,
  handleOnViewAviso: PropTypes.func.isRequired,
  handleExcluirAviso: PropTypes.func.isRequired,
  addAviso: PropTypes.bool.isRequired,
  handleOnAddAviso: PropTypes.func.isRequired,
  titulo: PropTypes.string.isRequired,
  handleSetTitulo: PropTypes.func.isRequired,
  texto: PropTypes.string.isRequired,
  handleSetTexto: PropTypes.func.isRequired,
  handleAddAviso: PropTypes.func.isRequired,
  handleOffAdd: PropTypes.func.isRequired,
  viewAviso: PropTypes.bool.isRequired,
  handleOnEditAviso: PropTypes.func.isRequired,
  editAviso: PropTypes.bool.isRequired,
  aviso: PropTypes.object,
  handleEditarAviso: PropTypes.func.isRequired,
};

export default Avisos;
