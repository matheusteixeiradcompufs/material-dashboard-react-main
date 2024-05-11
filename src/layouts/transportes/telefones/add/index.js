import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Audio } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { api } from "services/apiClient";
import { AuthContext } from "context/AuthContext";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";

/**
 * Componente para adicionar um novo telefone associado a um transporte.
 * @module transportes/telefones
 * @returns {JSX.Element} Componente para adicionar telefone.
 */
function AddTransporteTelefone() {
  const { refreshToken } = useContext(AuthContext);
  const { transporteid } = useParams();
  const [loading, setLoading] = useState(false);
  const [numero, setNumero] = useState("");
  const navigate = useNavigate();

  /**
   * Manipulador de evento para alterar o valor do número do telefone.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de mudança.
   */
  const handleChangeNumero = (e) => {
    setNumero(e.target.value);
  };

  /**
   * Manipulador de evento para adicionar um novo telefone.
   */
  const handleAdd = async () => {
    setLoading(true);
    try {
      await api.post("/pessoas/transporte/telefone/api/v1/", {
        numero: numero,
        transporte: transporteid,
      });
      navigate(`/transportes/${transporteid}/telefones`);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleAdd();
      } else {
        toast.error("Erro ao cadastrar telefone");
        console.log("Erro ao cadastrar telefone", error);
      }
      setLoading(false);
    }
  };

  /**
   * Manipulador de evento para cancelar a adição de telefone e voltar à página anterior.
   */
  const handleCancelar = () => {
    setLoading(true);
    navigate(`/transportes/${transporteid}/telefones`);
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
                bgColor="success"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Cadastrar Novo Telefone
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
                      <MDButton variant="contained" color="success" onClick={handleAdd}>
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

export default AddTransporteTelefone;
