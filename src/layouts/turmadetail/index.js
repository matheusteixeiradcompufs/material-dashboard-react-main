import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import Disciplinas from "layouts/turmadetail/components/Disciplinas";
import Alunos from "layouts/turmadetail/components/Alunos";
import Agenda from "layouts/turmadetail/components/Agenda";
import Detail from "layouts/turmadetail/components/Detail";

function TurmaDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [turma, setTurma] = useState(null);
  const [disciplinas, setDisciplinas] = useState([]);
  useEffect(() => {
    const fetchTurma = async () => {
      setLoading(true);
      try {
        let response = await api.get(`/escolas/sala/turma/api/v1/${id}/`);
        setTurma(response.data);
        response = await api.get("/escolas/disciplina/api/v1/");
        setDisciplinas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar turma!");
        console.log("Erro ao carregar turma!", error);
        setLoading(false);
      }
    };
    fetchTurma();
  }, []);
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
            <Detail turma={turma} />
          </Grid>
          <Grid item xs={12} mt={6}>
            <Alunos turma={turma} />
          </Grid>
          <Grid item xs={12} mt={6}>
            <Disciplinas
              turma={turma}
              setTurma={setTurma}
              setLoading={setLoading}
              disciplinas={disciplinas}
            />
          </Grid>
          <Grid item xs={12} mt={6}>
            <Agenda id={id} turma={turma} setTurma={setTurma} setLoading={setLoading} />
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default TurmaDetail;
