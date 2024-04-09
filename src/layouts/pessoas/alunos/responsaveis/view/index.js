import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import { AuthContext } from "context/AuthContext";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";

function ViewAlunoResponsavel() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { alunoid, responsavelid } = useParams();
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [observacao, setObservacao] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponsavel = async () => {
      try {
        const response = await api.get(`/pessoas/aluno/responsavel/api/v1/${responsavelid}/`);
        setCpf(response.data.cpf);
        setNome(response.data.nome);
        setObservacao(response.data.observacao);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchResponsavel();
        } else {
          toast.error("Erro ao carregar os dados do responsável do aluno!");
          console.error("Erro ao carregar os dados do responsável do aluno!", error);
        }
        setLoading(false);
      }
    };
    fetchResponsavel();
  }, []);

  const handleOnEditar = () => {
    setLoading(true);
    navigate(`/pessoas/aluno/${alunoid}/responsavel/${responsavelid}/editar`);
  };

  const handleVoltar = () => {
    setLoading(true);
    navigate(`/pessoas/aluno/${alunoid}/responsaveis`);
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
      <DashboardNavbar />
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
                  Visualizar Email
                </MDTypography>
              </MDBox>
              <Grid container spacing={3} mb={2}>
                <Grid item xs={12} sm={12}>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <MDInput
                      type="text"
                      variant="outlined"
                      label="CPF"
                      value={cpf}
                      fullWidth
                      disabled
                    />
                  </MDBox>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <MDInput
                      type="text"
                      variant="outlined"
                      label="Nome"
                      value={nome}
                      fullWidth
                      disabled
                    />
                  </MDBox>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <MDInput
                      type="text"
                      variant="outlined"
                      label="Observação"
                      multiline
                      rows={3}
                      value={observacao}
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
    </DashboardLayout>
  );
}

export default ViewAlunoResponsavel;
