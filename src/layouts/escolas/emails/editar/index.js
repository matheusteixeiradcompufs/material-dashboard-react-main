import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { AuthContext } from "context/AuthContext";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { api } from "services/apiClient";

/**
 * Componente para edição de um email da escola.
 * @module escolas/emails
 * @returns {JSX.Element} - Componente de edição de emails da escola.
 */
function EditarEscolaEmail() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { escolaid, emailid } = useParams();
  const [endereco, setEndereco] = useState("");
  const [loading, setLoading] = useState(true);

  /**
   * Efeito para carregar os dados do email da escola.
   */
  useEffect(() => {
    const fetchEscola = async () => {
      try {
        const response = await api.get(`/escolas/email/api/v1/${emailid}/`);
        setEndereco(response.data.endereco);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchEscola();
        } else {
          toast.error("Erro ao carregar dados da escola!");
          console.log("Erro ao carregar dados da escola!");
        }
        setLoading(false);
      }
    };
    fetchEscola();
  }, []);

  /**
   * Manipulador de eventos para alterações no campo de endereço do email.
   * @param {Object} e - O evento de alteração.
   */
  const handleChangeEndereco = (e) => {
    setEndereco(e.target.value);
  };

  /**
   * Função para lidar com a edição do email.
   */
  const handleEditar = async () => {
    setLoading(true);
    try {
      await api.patch(`/escolas/email/api/v1/${emailid}/`, {
        endereco: endereco,
      });
      navigate(`/escola/${escolaid}/email/${emailid}/view`);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleEditar();
      } else {
        toast.error("Erro ao cadastrar escola");
        console.log("Erro ao cadastrar escola", error);
      }
      setLoading(false);
    }
  };

  /**
   * Função para lidar com o cancelamento da edição do email.
   */
  const handleCancelar = () => {
    setLoading(true);
    navigate(`/escola/${escolaid}/email/${emailid}/view`);
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
                bgColor="warning"
                borderRadius="lg"
                coloredShadow="warning"
              >
                <MDTypography variant="h6" color="white">
                  Modificar Email da Escola
                </MDTypography>
              </MDBox>
              <Grid container spacing={3} mb={2}>
                <Grid item xs={12} sm={12}>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <MDInput
                      type="text"
                      variant="outlined"
                      label="Endereço"
                      value={endereco}
                      onChange={handleChangeEndereco}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <MDBox mr={1}>
                      <MDButton variant="contained" color="success" onClick={handleEditar}>
                        Salvar
                      </MDButton>
                    </MDBox>
                    <MDBox ml={1}>
                      <MDButton variant="contained" color="error" onClick={handleCancelar}>
                        Cancelar
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

export default EditarEscolaEmail;
