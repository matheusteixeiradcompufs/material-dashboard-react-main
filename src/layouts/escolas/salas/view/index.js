import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Menu from "../components/Menu";

function ViewEscolaSala() {
  const navigate = useNavigate();
  const { escolaid, salaid } = useParams();
  const [numero, setNumero] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSala = async () => {
      try {
        const response = await api.get(`/escolas/sala/api/v1/${salaid}/`);
        setNumero(response.data.numero);
        setQuantidade(response.data.quantidade_alunos);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar escola");
        console.error("Erro ao carregar escola:", error);
        setLoading(false);
      }
    };
    fetchSala();
  }, []);
  const handleChangeNumero = (e) => {
    setNumero(e.target.value);
  };
  const handleChangeQuantidade = (e) => {
    setQuantidade(e.target.value);
  };
  const handleOnEditar = () => {
    setLoading(true);
    navigate(`/escola/${escolaid}/sala/${salaid}/editar`);
  };
  const handleVoltar = () => {
    setLoading(true);
    navigate(`/escola/${escolaid}/salas`);
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
                  Visualizar Sala da Escola
                </MDTypography>
              </MDBox>
              <Grid container spacing={3} mb={2}>
                <Grid item xs={12} sm={12}>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <MDInput
                      type="number"
                      variant="outlined"
                      label="Número da Sala"
                      value={numero}
                      onChange={handleChangeNumero}
                      fullWidth
                      disabled
                    />
                  </MDBox>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <MDInput
                      type="number"
                      variant="outlined"
                      label="Quantidade de Alunos da Sala"
                      value={quantidade}
                      onChange={handleChangeQuantidade}
                      fullWidth
                      disabled
                    />
                  </MDBox>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <MDBox mr={1}>
                      <MDButton variant="contained" color="warning" onClick={handleOnEditar}>
                        Modificar
                      </MDButton>
                    </MDBox>
                    <MDBox ml={1}>
                      <MDButton variant="contained" color="error" onClick={handleVoltar}>
                        Voltar
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox pt={2} mb={3}>
        <Menu escolaid={escolaid} salaid={salaid} />
      </MDBox>
    </DashboardLayout>
  );
}

export default ViewEscolaSala;
