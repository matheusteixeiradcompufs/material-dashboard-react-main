import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { AuthContext } from "context/AuthContext";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { api } from "services/apiClient";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";

/**
 * Componente para editar o telefone associado a um transporte.
 * @module transportes/telefones
 * @returns {JSX.Element} Componente de edição de telefone do transporte.
 */
function EditarTransporteTelefone() {
  const { refreshToken } = useContext(AuthContext);
  const { transporteid, telefoneid } = useParams();
  const [loading, setLoading] = useState(true);
  const [numero, setNumero] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTelefone = async () => {
      try {
        const response = await api.get(`/pessoas/transporte/telefone/api/v1/${telefoneid}/`);
        setNumero(response.data.numero);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchTelefone();
        } else {
          toast.error("Erro ao carregar telefone!");
          console.log("Erro ao carregar telefone!", error);
        }
        setLoading(false);
      }
    };
    fetchTelefone();
  }, []);

  /**
   * Manipulador de evento para alterar o valor do número do telefone.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de mudança.
   */
  const handleChangeNumero = (e) => {
    setNumero(e.target.value);
  };

  /**
   * Manipulador de evento para salvar as modificações no telefone.
   */
  const handleEditar = async () => {
    setLoading(true);
    try {
      await api.patch(`/pessoas/transporte/telefone/api/v1/${telefoneid}/`, {
        numero: numero,
      });
      navigate(`/transportes/${transporteid}/telefone/${telefoneid}/view`);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleEditar();
      } else {
        toast.error("Erro ao modificar telefone");
        console.log("Erro ao modificar telefone", error);
      }
      setLoading(false);
    }
  };

  /**
   * Manipulador de evento para cancelar a edição do telefone.
   */
  const handleCancelar = () => {
    setLoading(true);
    navigate(`/transportes/${transporteid}/telefone/${telefoneid}/view`);
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
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Modificar Telefone do Transporte
                </MDTypography>
              </MDBox>
              <Grid container spacing={3} mb={2}>
                <Grid item xs={12} sm={12}>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <MDInput
                      type="number"
                      variant="outlined"
                      label="Número"
                      value={numero}
                      onChange={handleChangeNumero}
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

export default EditarTransporteTelefone;
