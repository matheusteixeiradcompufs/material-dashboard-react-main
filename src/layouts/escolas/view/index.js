import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { api } from "services/apiClient";
import Menu from "../components/Menu";
import { AuthContext } from "context/AuthContext";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";

/**
 * Componente para visualizar os detalhes de uma escola.
 * @module escolas
 * @returns {JSX.Element} Componente ViewEscola.
 */
function ViewEscola() {
  const { user, refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { escolaid } = useParams();
  const [loading, setLoading] = useState(true);
  const [cnpj, setCnpj] = useState("");
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    /**
     * Função assíncrona para buscar os detalhes da escola.
     */
    const fetchEscola = async () => {
      try {
        const response = await api.get(`/escolas/api/v1/${escolaid}/`);
        setCnpj(response.data.cnpj);
        setNome(response.data.nome);
        setEndereco(response.data.endereco);
        setDescricao(response.data.descricao);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchEscola();
        } else {
          toast.error("Erro ao carregar escolas");
          console.error("Erro ao carregar escolas:", error);
        }
        setLoading(false);
      }
    };
    fetchEscola();
  }, []);

  /**
   * Manipulador para redirecionar para a página de edição da escola.
   */
  const handleOnEditar = () => {
    setLoading(true);
    navigate(`/escola/${escolaid}/editar`);
  };

  /**
   * Manipulador para voltar para a página anterior.
   */
  const handleVoltar = () => {
    setLoading(true);
    navigate(`/escolas`);
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
                  Visualizar Escola
                </MDTypography>
              </MDBox>
              <Grid container spacing={3} mb={2}>
                <Grid item xs={12} sm={12}>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <MDInput
                      type="number"
                      variant="outlined"
                      label="CNPJ"
                      value={cnpj}
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
                      label="Endereço"
                      value={endereco}
                      fullWidth
                      disabled
                    />
                  </MDBox>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <MDInput
                      type="text"
                      variant="outlined"
                      label="Descrição"
                      value={descricao}
                      multiline
                      rows={3}
                      fullWidth
                      disabled
                    />
                  </MDBox>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <MDBox mr={1}>
                      <MDButton
                        variant="contained"
                        color="warning"
                        onClick={handleOnEditar}
                        disabled={!user.is_superuser}
                      >
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
      <MDBox pt={2} mb={3} mt={3}>
        <Menu escolaid={escolaid} />
      </MDBox>
    </DashboardLayout>
  );
}

export default ViewEscola;
