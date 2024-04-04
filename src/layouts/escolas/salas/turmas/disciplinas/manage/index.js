import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DataTable from "examples/Tables/DataTable";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import Transfer from "../components/Transfer";
import { AuthContext } from "context/AuthContext";

function ManageEscolaSalaTurmaDisciplinas() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { escolaid, salaid, turmaid } = useParams();
  const [loading, setLoading] = useState(true);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  useEffect(() => {
    const fetchTurma = async () => {
      try {
        const res = await api.get(`/escolas/sala/turma/api/v1/${turmaid}/`);
        setRight(res.data.objetos_disciplinas);
        const response = await api.get("/escolas/disciplina/api/v1/");
        setLeft(
          response.data.filter(
            (item) => !res.data.objetos_disciplinas.some((element) => element.id === item.id)
          )
        );
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

  const handleSalvar = async () => {
    setLoading(true);
    try {
      await api.patch(`/escolas/sala/turma/api/v1/${turmaid}/`, {
        disciplinas: right.map((item) => item.id),
      });
      navigate(`/escola/${escolaid}/sala/${salaid}/turma/${turmaid}/disciplinas`);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleSalvar();
      } else {
        toast.error("Erro ao salvar atualizar a turma");
        console.log("Erro ao salvar atualizar a turma");
      }
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    setLoading(true);
    navigate(`/escola/${escolaid}/sala/${salaid}/turma/${turmaid}/disciplinas`);
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
      <MDBox pt={2} mb={3}>
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
                  Gerenciar Disciplinas da Turma
                </MDTypography>
              </MDBox>
              <MDBox mt={2} px={2}>
                <Transfer left={left} setLeft={setLeft} right={right} setRight={setRight} />
                <MDBox mx={2} py={3} px={2} display="flex" justifyContent="center">
                  <MDBox mr={1}>
                    <MDButton variant="gradient" color="success" onClick={handleSalvar}>
                      Salvar
                    </MDButton>
                  </MDBox>
                  <MDBox ml={1}>
                    <MDButton variant="gradient" color="error" onClick={handleCancelar}>
                      Cancelar
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default ManageEscolaSalaTurmaDisciplinas;
