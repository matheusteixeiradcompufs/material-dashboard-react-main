import { Grid, Icon, MenuItem, Select, Tooltip } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { format } from "date-fns";
import DataTable from "examples/Tables/DataTable";
import PropTypes from "prop-types";
import Add from "./components/Add";
import View from "./components/View";
import Edit from "./components/Edit";

function Tarefas({
  diaAgenda,
  handleOnViewTarefa,
  handleExcluirTarefa,
  addTarefa,
  handleOnAddTarefa,
  nome,
  handleSetNome,
  descricao,
  handleSetDescricao,
  tipo,
  handleSetTipo,
  dataEntrega,
  handleSetDataEntrega,
  handleAddTarefa,
  handleOffAdd,
  viewTarefa,
  handleOnEditTarefa,
  editTarefa,
  tarefa,
  handleEditarTarefa,
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
          Tarefas do dia
        </MDTypography>
        {diaAgenda && !addTarefa ? (
          <Tooltip onClick={handleOnAddTarefa} title="Add Tarefa" placement="top">
            <Icon sx={{ color: "#fff", fontSize: 60 }}>add</Icon>
          </Tooltip>
        ) : (
          <></>
        )}
      </MDBox>
      <DataTable
        table={{
          columns: [
            { Header: "Tarefas", accessor: "tarefa", align: "left" },
            { Header: "Tipo", accessor: "tipo", align: "center" },
            { Header: "Data de Entrega", accessor: "entrega", align: "center" },
            { Header: "", accessor: "opcoes", align: "right" },
          ],
          rows: diaAgenda
            ? diaAgenda.objetos_tarefas.map((objeto) => ({
                tarefa: objeto.nome,
                tipo: objeto.tipo === "C" ? "Casa" : "Escola",
                entrega: format(new Date(objeto.entrega), "dd/MM/yyyy"),
                opcoes: (
                  <MDBox display="flex" flexDirection="row">
                    <MDBox mr={1}>
                      <MDButton
                        variant="gradient"
                        color="info"
                        size="small"
                        onClick={() => handleOnViewTarefa(objeto.id)}
                      >
                        Visualizar
                      </MDButton>
                    </MDBox>
                    <MDBox mr={1}>
                      <MDButton
                        variant="gradient"
                        color="error"
                        size="small"
                        onClick={() => handleExcluirTarefa(objeto.id)}
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
      {addTarefa ? (
        <Add
          nome={nome}
          handleSetNome={handleSetNome}
          descricao={descricao}
          handleSetDescricao={handleSetDescricao}
          tipo={tipo}
          handleSetTipo={handleSetTipo}
          dataEntrega={dataEntrega}
          handleSetDataEntrega={handleSetDataEntrega}
          handleAddTarefa={handleAddTarefa}
          handleOffAdd={handleOffAdd}
        />
      ) : (
        <></>
      )}
      {viewTarefa ? (
        <View
          nome={nome}
          handleSetNome={handleSetNome}
          descricao={descricao}
          handleSetDescricao={handleSetDescricao}
          tipo={tipo}
          handleSetTipo={handleSetTipo}
          dataEntrega={dataEntrega}
          handleSetDataEntrega={handleSetDataEntrega}
          handleOnEditTarefa={handleOnEditTarefa}
          handleOffAdd={handleOffAdd}
        />
      ) : (
        <></>
      )}
      {editTarefa ? (
        <Edit
          nome={nome}
          handleSetNome={handleSetNome}
          descricao={descricao}
          handleSetDescricao={handleSetDescricao}
          tipo={tipo}
          handleSetTipo={handleSetTipo}
          dataEntrega={dataEntrega}
          handleSetDataEntrega={handleSetDataEntrega}
          tarefa={tarefa}
          handleEditarTarefa={handleEditarTarefa}
          handleOnViewTarefa={handleOnViewTarefa}
        />
      ) : (
        <></>
      )}
    </MDBox>
  );
}

Tarefas.propTypes = {
  diaAgenda: PropTypes.object,
  handleOnViewTarefa: PropTypes.func.isRequired,
  handleExcluirTarefa: PropTypes.func.isRequired,
  addTarefa: PropTypes.bool.isRequired,
  handleOnAddTarefa: PropTypes.func.isRequired,
  nome: PropTypes.string.isRequired,
  handleSetNome: PropTypes.func.isRequired,
  descricao: PropTypes.string.isRequired,
  handleSetDescricao: PropTypes.func.isRequired,
  tipo: PropTypes.string.isRequired,
  handleSetTipo: PropTypes.func.isRequired,
  dataEntrega: PropTypes.object,
  handleSetDataEntrega: PropTypes.func.isRequired,
  handleAddTarefa: PropTypes.func.isRequired,
  handleOffAdd: PropTypes.func.isRequired,
  viewTarefa: PropTypes.bool.isRequired,
  handleOnEditTarefa: PropTypes.func.isRequired,
  editTarefa: PropTypes.bool.isRequired,
  tarefa: PropTypes.object,
  handleEditarTarefa: PropTypes.func.isRequired,
};

export default Tarefas;
