import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import Alunos from "./components/Alunos";
import { AuthContext } from "context/AuthContext";

function TurmaAlunos() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { turmaid } = useParams();
  const [loading, setLoading] = useState(true);
  const [turma, setTurma] = useState(null);

  useEffect(() => {
    const fetchTurma = async () => {
      try {
        let response = await api.get(`/escolas/sala/turma/api/v1/${turmaid}/`);
        setTurma(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchTurma();
        } else {
          toast.error("Erro ao carregar turma!");
          console.log("Erro ao carregar turma!", error);
        }
        setLoading(false);
      }
    };
    fetchTurma();
  }, []);

  const handleView = (alunoid) => {
    setLoading(true);
    navigate(
      `/escola/${turma.objeto_sala.escola}/sala/${turma.objeto_sala.id}/turma/${turma.id}/aluno/${alunoid}/view`
    );
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
            <Alunos turma={turma} handleView={handleView} />
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default TurmaAlunos;
