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
 * Componente para editar um mural de uma escola.
 * @module escolas/murais
 * @returns {JSX.Element} - Componente de edição de mural.
 */
function EditarEscolaMural() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { escolaid, muralid } = useParams();
  const [ano, setAno] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Função assíncrona para buscar os detalhes do mural.
     */
    const fetchMural = async () => {
      try {
        const response = await api.get(`/escolas/mural/api/v1/${muralid}/`);
        setAno(response.data.ano);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchMural();
        } else {
          toast.error("Erro ao acessar os dados do mural!");
          console.log("Erro ao acessar os dados do mural!", error);
        }
        setLoading(false);
      }
    };
    fetchMural();
  }, []);

  /**
   * Manipulador de mudança para o ano do mural.
   * @param {React.ChangeEvent<HTMLInputElement>} e - O evento de mudança.
   */
  const handleChangeAno = (e) => {
    setAno(e.target.value);
  };

  /**
   * Manipulador de evento para editar o mural.
   */
  const handleEditar = async () => {
    setLoading(true);
    try {
      await api.patch(`/escolas/mural/api/v1/${muralid}/`, {
        ano: ano,
      });
      navigate(`/escola/${escolaid}/mural/${muralid}/view`);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleEditar();
      } else {
        toast.error("Erro ao modificar escola");
        console.log("Erro ao modificar escola", error);
      }
      setLoading(false);
    }
  };

  /**
   * Manipulador de evento para cancelar a edição do mural.
   */
  const handleCancelar = () => {
    setLoading(true);
    navigate(`/escola/${escolaid}/mural/${muralid}/view`);
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
                  Modificar Mural da Escola
                </MDTypography>
              </MDBox>
              <Grid container spacing={3} mb={2}>
                <Grid item xs={12} sm={12}>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <MDInput
                      type="number"
                      variant="outlined"
                      label="Número"
                      value={ano}
                      onChange={handleChangeAno}
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

export default EditarEscolaMural;
