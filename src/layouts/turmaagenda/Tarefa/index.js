import {
  Divider,
  Grid,
  Icon,
  MenuItem,
  Select,
  TextareaAutosize,
  Card,
  Tooltip,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MDButton from "components/MDButton";
import { format } from "date-fns";
import { useState } from "react";
import theme from "assets/theme";
import { api } from "services/apiClient";
import { toast } from "react-toastify";

function Tarefa({ date, dia, onCarregar, setLoadingVar }) {
  const [textTarefa, setTextTarefa] = useState("");
  const [titleTarefa, setTitleTarefa] = useState("");
  const [tipoTarefa, setTipoTarefa] = useState("C");
  const [dataEntrega, setDataEntrega] = useState(null);

  const handleChangeTitleTarefa = (event) => {
    setTitleTarefa(event.target.value);
  };

  const handleChangeTextTarefa = (event) => {
    setTextTarefa(event.target.value);
  };

  const handleSetTipoTarefaChange = (event) => {
    setTipoTarefa(event.target.value);
  };

  const handleSetDataEntregaChange = (date) => {
    setDataEntrega(date);
  };

  const handleCarregar = async () => {
    onCarregar();
  };

  const setLoading = (value) => {
    setLoadingVar(value);
  };

  const handleAddTarefa = async () => {
    setLoading(true);
    try {
      await api.post("/escolas/sala/turma/agenda/dia/tarefa/api/v1/", {
        nome: titleTarefa,
        descricao: textTarefa,
        tipo: tipoTarefa,
        entrega: format(dataEntrega, "yyyy-MM-dd"),
        diaAgenda: dia.id,
      });
      await handleCarregar();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao inserir tarefa!");
      console.error("Erro ao inserir tarefa:", error);
      setLoading(false);
    }
  };

  const handleExcluirTarefa = async (tarefaid) => {
    setLoading(true);
    try {
      await api.delete(`/escolas/sala/turma/agenda/dia/tarefa/api/v1/${tarefaid}/`);
      await handleCarregar();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao excluir tarefa!");
      console.error("Erro ao excluir tarefa:", error);
      setLoading(false);
    }
  };

  return (
    <Card>
      <MDBox
        mx={2}
        mt={-3}
        py={3}
        px={2}
        variant="gradient"
        bgColor="primary"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography variant="h6" color="white">
          Tarefas do dia {format(date, "dd/MM/yyyy")}
        </MDTypography>
      </MDBox>
      {dia?.objetos_tarefas &&
        dia?.objetos_tarefas.map((objeto, index) => (
          <TarefaDetail
            key={index}
            title={objeto.nome}
            label="Excluir Tarefa"
            description={objeto.descricao}
            date={objeto.data ? format(objeto.data, "dd/MM/yyyy") : ""}
            type={objeto.tipo === "C" ? "Casa" : "Escola"}
            route=""
            onExcluirTarefa={() => handleExcluirTarefa(objeto.id)}
          />
        ))}
      <MDBox display="flex" flexDirection="column" pt={2} px={2}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
          <MDInput
            value={titleTarefa}
            onChange={handleChangeTitleTarefa}
            label="Nome da Tarefa"
            fullWidth
          />
        </MDBox>
        <MDBox p={2}>
          <MDBox mb={2} lineHeight={1}>
            <MDInput
              type="text"
              variant="outlined"
              label="Descrição da Tarefa"
              value={textTarefa}
              onChange={handleChangeTextTarefa}
              multiline
              rows={3}
              style={{ width: "100%" }}
            />
          </MDBox>
          <MDBox flexDirection="row" mb={2} lineHeight={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Select
                  value={tipoTarefa}
                  onChange={handleSetTipoTarefaChange}
                  style={{ width: "100%", height: 45, alignSelf: "center" }}
                >
                  <MenuItem value="C">Casa</MenuItem>
                  <MenuItem value="E">Escola</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Data"
                  value={dataEntrega}
                  onChange={handleSetDataEntregaChange}
                  align="left"
                  renderInput={(params) => <MDInput {...params} />}
                  style={{ width: "100%" }}
                />
              </Grid>
            </Grid>
          </MDBox>
          <MDBox>
            <MDButton
              onClick={handleAddTarefa}
              variant="gradient"
              color="success"
              size="medium"
              fullWidth
            >
              Adicionar Tarefa
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

function TarefaDetail({ title, label, description, date, type, route, onExcluirTarefa }) {
  const handleExcluir = () => {
    onExcluirTarefa();
  };
  return (
    <MDBox display="flex" flexDirection="column" pt={2} px={2}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
        <MDTypography component={Link} to={route} variant="body2" color="secondary">
          <Tooltip onClick={handleExcluir} title={label} placement="top">
            <Icon>delete_forever</Icon>
          </Tooltip>
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox lineHeight={1}>
          <MDTypography variant="button" color="text" fontWeight="light">
            {description}
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox display="flex" flexDirection="row" justifyContent="space-between" p={2}>
        <MDBox mb={2} lineHeight={1}>
          <MDTypography variant="button" color="text" fontWeight="light">
            Tipo: {type}
          </MDTypography>
        </MDBox>
        <MDBox mb={2} lineHeight={1}>
          <MDTypography variant="button" color="text" fontWeight="light">
            Entrega: {date}
          </MDTypography>
        </MDBox>
        <Divider />
        <MDBox opacity={0.3}>
          <Divider />
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

TarefaDetail.defaultProps = {
  date: "",
};

TarefaDetail.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  date: PropTypes.string,
  onExcluirTarefa: PropTypes.func.isRequired,
};

Tarefa.propTypes = {
  date: PropTypes.object.isRequired,
  dia: PropTypes.object.isRequired,
  onCarregar: PropTypes.func.isRequired,
  setLoadingVar: PropTypes.func.isRequired,
};

export { Tarefa, TarefaDetail };
