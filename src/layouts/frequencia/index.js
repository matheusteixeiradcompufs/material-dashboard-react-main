import React, { useEffect, useState } from "react";
import { Card, Grid, Select, Switch, MenuItem } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DataTable from "examples/Tables/DataTable";
import frequenciaTableData from "layouts/frequencia/data/frequenciaTableData";
import frequenciaAlunoTableData from "layouts/frequencia/data/frequenciaAlunoTableData";
import { useParams } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { api } from "services/apiClient";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Audio } from "react-loader-spinner";

function Frequencia() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState("Selecione uma turma");
  const [turmas, setTurmas] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTurmas = async () => {
      setLoading(true);
      try {
        const username = "professor1";
        const response = await api.post("/pessoas/me/", { username });
        const { objetos_turmas } = await response.data;
        setTurmas(objetos_turmas);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar turmas");
        console.error("Erro ao carregar turmas:", error);
        setLoading(false);
        // Lidar com erros, se necessário
      }
    };
    fetchTurmas();
  }, []);

  const handleTurmaChange = (event) => {
    setSelectedTurma(event.target.value);
  };

  const handleCarregarFrequencias = async () => {
    setLoading(true);
    try {
      const { colunas, linhas } = turmas
        ? await frequenciaTableData(selectedTurma)
        : await frequenciaTableData();
      setColumns(colunas);
      setRows(linhas);
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao carregar frequências");
      console.error("Erro ao carregar frequências:", error);
      setLoading(false);
      // Lidar com erros, se necessário
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Audio
            height="80"
            width="80"
            radius="9"
            color="#3089ec"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
          />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ToastContainer />
      <MDBox pt={6} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
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
                  Frequências da Turma
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <Select value={selectedTurma} onChange={handleTurmaChange} fullWidth>
                      <MenuItem value="Selecione uma turma">Selecione uma turma</MenuItem>
                      {turmas &&
                        turmas.map((turma, index) => (
                          <MenuItem key={index} value={turma}>
                            {turma.nome} em {turma.ano}
                          </MenuItem>
                        ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6} container justifyContent="flex-end">
                    <MDButton
                      variant="gradient"
                      color="secondary"
                      size="small"
                      onClick={handleCarregarFrequencias}
                    >
                      Carregar
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

function FrequenciaAluno() {
  const { id } = useParams(); // Obtendo o ID do aluno da URL

  const [selectedDate, setSelectedDate] = useState(null);
  const [switchChecked, setSwitchChecked] = useState(false);

  const [frequencia, setFrequencia] = useState(null);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);

  const loadBoletim = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/pessoas/aluno/boletim/api/v1/${id}/`);
      const { objeto_frequencia } = response.data;

      setFrequencia(objeto_frequencia);
      const { colunas, linhas } = objeto_frequencia
        ? await frequenciaAlunoTableData(objeto_frequencia.objetos_diasletivos, loadBoletim)
        : await frequenciaAlunoTableData(undefined, loadBoletim);
      setColumns(colunas);
      setRows(linhas);
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao carregar boletim");
      console.error("Erro ao carregar boletim:", error);
      setLoading(false);
      // Lidar com erros, se necessário
    }
  };

  useEffect(() => {
    setLoading(true);
    loadBoletim();
    setLoading(false);
  }, [id]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSwitchChange = () => {
    setSwitchChecked(!switchChecked);
  };

  const handleAddButtonClick = async () => {
    setLoading(true);
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    try {
      await api.post("/pessoas/aluno/frequencia/dialetivo/api/v1/", {
        data: formattedDate,
        presenca: switchChecked,
        frequencia: frequencia.id,
      });
      loadBoletim();
      toast.success("Presença cadastrada com sucesso!");
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao incluir presença!");
      console.error("Erro ao incluir dia letivo:", error);
      setLoading(false);
      // logout();
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Audio
            height="80"
            width="80"
            radius="9"
            color="#3089ec"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
          />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ToastContainer />
      <MDBox pt={6} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card mb={5}>
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
                  Lista de Presenças do Aluno
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
            <MDBox mt={2} />
            <Card>
              <Grid
                container
                justifyContent="center"
                paddingLeft={3}
                paddingRight={2}
                paddingTop={1}
              >
                <Grid item xs={12} sm={7.2} container justifyContent="flex-start">
                  <MDTypography variant="h6" align="left"></MDTypography>
                </Grid>
                <Grid item xs={12} sm={2.4} container justifyContent="center">
                  <MDTypography variant="h6" align="center">
                    Presente
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={2.4} container justifyContent="center">
                  <MDTypography variant="h6" align="center"></MDTypography>
                </Grid>
              </Grid>
              <Grid
                container
                justifyContent="space-between"
                paddingLeft={3}
                paddingRight={2}
                paddingBottom={2}
              >
                <Grid item xs={12} sm={7.2} container justifyContent="flex-start">
                  <DatePicker
                    label="Data"
                    value={selectedDate}
                    onChange={handleDateChange}
                    align="left"
                    renderInput={(params) => <MDInput {...params} />}
                  />
                </Grid>
                <Grid item xs={12} sm={2.4} container justifyContent="center">
                  <Switch checked={switchChecked} onChange={handleSwitchChange} />
                </Grid>
                <Grid item xs={12} sm={2.4} container justifyContent="center">
                  <MDButton
                    variant="gradient"
                    color="success"
                    size="small"
                    onClick={handleAddButtonClick}
                  >
                    Add
                  </MDButton>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export { Frequencia, FrequenciaAluno };
