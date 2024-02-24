import { Card, Grid, MenuItem, Select } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import { format } from "date-fns";
import { Aviso } from "./components/Aviso";
import { Tarefa } from "./components/Tarefa";
import Disciplinas from "./components/Disciplinas";
import Turma from "./components/Turma";

function AgendaEscolar() {
  const [selectedTurma, setSelectedTurma] = useState("Selecione uma turma");
  const [turma, setTurma] = useState(null);
  const [agenda, setAgenda] = useState(null);
  const [turmas, setTurmas] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [diaAgenda, setDiaAgenda] = useState(null);
  const [disciplinas, setDisciplinas] = useState([]);
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

  const handleCarregarTurma = () => {
    setTurma(null);
    setSelectedDate(null);
    setAgenda(null);
    setDiaAgenda(null);
    setDisciplinas([]);
    setTurma(selectedTurma);
    if (selectedTurma === "Selecione uma turma") {
      setTurma(null);
    }
  };

  const handleCarregarAgenda = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/escolas/sala/turma/agenda/api/v1/${selectedTurma.objeto_agenda.id}/`
      );
      const { objetos_dias } = await response.data;
      setAgenda(await response.data);
      setDiaAgenda(
        objetos_dias.filter((objeto) => objeto.data === format(selectedDate, "yyyy-MM-dd"))[0]
      );
      setDisciplinas(
        objetos_dias.filter((objeto) => objeto.data === format(selectedDate, "yyyy-MM-dd"))[0]
          .objetos_disciplinas
      );
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao carregar a agenda!");
      console.log("Erro ao carregar a agenda!", error);
      setLoading(false);
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
                  Agenda Escolar
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <Grid container spacing={2} mb={2} justifyContent="center">
                  <Grid item xs={12} sm={6}>
                    <Select
                      value={selectedTurma}
                      onChange={handleTurmaChange}
                      style={{ width: "100%", height: 45, alignSelf: "center" }}
                    >
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
                      color="info"
                      size="medium"
                      onClick={handleCarregarTurma}
                    >
                      Carregar
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
            <MDBox display="flex" mt={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {turma ? (
                    <Turma
                      turma={turma}
                      date={selectedDate}
                      setDate={setSelectedDate}
                      loadCarregar={handleCarregarAgenda}
                    />
                  ) : (
                    <MDBox pt={3} px={2}></MDBox>
                  )}
                </Grid>
              </Grid>
            </MDBox>
            <MDBox display="flex" mt={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {agenda != null ? (
                    <Disciplinas date={selectedDate} disciplinas={disciplinas} />
                  ) : (
                    <MDBox pt={3}></MDBox>
                  )}
                </Grid>
              </Grid>
            </MDBox>
            <MDBox display="flex" flexDirection="row" justifyContent="space-between" mt={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  {agenda != null ? (
                    <Aviso
                      date={selectedDate}
                      dia={diaAgenda}
                      onCarregar={handleCarregarAgenda}
                      setLoadingVar={setLoading}
                    />
                  ) : (
                    <MDBox pt={3}></MDBox>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  {agenda != null ? (
                    <Tarefa
                      date={selectedDate}
                      dia={diaAgenda}
                      onCarregar={handleCarregarAgenda}
                      setLoadingVar={setLoading}
                    />
                  ) : (
                    <MDBox pt={3}></MDBox>
                  )}
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export { AgendaEscolar };
