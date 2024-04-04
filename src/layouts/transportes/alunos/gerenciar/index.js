import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { api } from "services/apiClient";
import Transfer from "./components/Transfer";
import MDButton from "components/MDButton";
import { AuthContext } from "context/AuthContext";

function GerenciarTransporteAlunos() {
  const { refreshToken } = useContext(AuthContext);
  const { transporteid } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [right, setRight] = useState([]);
  const [left, setLeft] = useState([]);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const res = await api.get(`/pessoas/transporte/api/v1/${transporteid}/`);
        setRight(res.data.objetos_alunos);
        const response = await api.get("/pessoas/aluno/api/v1/");
        setLeft(
          response.data.filter(
            (item) => !res.data.objetos_alunos.some((element) => element.id === item.id)
          )
        );
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchDados();
        } else {
          toast.error("Erro ao carregar os dados!");
          console.log("Erro ao carregar os dados!", error);
        }
        setLoading(false);
      }
    };
    fetchDados();
  }, []);

  const handleCancelar = () => {
    setLoading(true);
    navigate(`/transportes/${transporteid}/alunos`);
  };

  const handleSalvar = async () => {
    setLoading(true);
    try {
      await api.patch(`/pessoas/transporte/api/v1/${transporteid}/`, {
        alunos: right.map((item) => item.id),
      });
      navigate(`/transportes/${transporteid}/alunos`);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleSalvar();
      } else {
        toast.error("Erro ao salvar alunos do transporte!");
        console.log("Erro ao salvar alunos do transporte!", error);
      }
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
                  Gerenciar Alunos do Transporte
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <Transfer left={left} setLeft={setLeft} right={right} setRight={setRight} />
              </MDBox>
              <MDBox display="flex" flexDirection="row" justifyContent="center" mt={2} mb={2}>
                <MDBox mr={1}>
                  <MDButton variant="gradient" color="success" onClick={handleSalvar}>
                    Salvar
                  </MDButton>
                </MDBox>
                <MDBox mr={1}>
                  <MDButton variant="gradient" color="error" onClick={handleCancelar}>
                    Cancelar
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default GerenciarTransporteAlunos;
