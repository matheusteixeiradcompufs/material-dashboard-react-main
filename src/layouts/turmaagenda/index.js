import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Turma from "./Turma";
import { useEffect, useState } from "react";
import { api } from "services/apiClient";
import { Audio } from "react-loader-spinner";
import Disciplinas from "./Disciplinas";
import { Aviso } from "./Aviso";
import { Tarefa } from "./Tarefa";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

function TurmaAgenda() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [turma, setTurma] = useState(null);
  const [agenda, setAgenda] = useState(null);
  const [diaAgenda, setDiaAgenda] = useState(null);
  const [disciplinas, setDisciplinas] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  useEffect(() => {
    const fetchTurma = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/escolas/sala/turma/api/v1/${id}/`);
        setTurma(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar a turma!");
        console.log("Erro ao carregar a turma!", error);
        setLoading(false);
      }
    };
    fetchTurma();
  }, []);
  const handleCarregar = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/escolas/sala/turma/agenda/api/v1/${turma?.objeto_agenda.id}/`
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
            <Turma
              turma={turma}
              date={selectedDate}
              setDate={setSelectedDate}
              handleCarregar={handleCarregar}
            />
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
                onCarregar={handleCarregar}
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
                onCarregar={handleCarregar}
                setLoadingVar={setLoading}
              />
            ) : (
              <MDBox pt={3}></MDBox>
            )}
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default TurmaAgenda;
