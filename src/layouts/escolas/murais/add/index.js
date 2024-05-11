import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { AuthContext } from "context/AuthContext";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";
import { useContext, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { api } from "services/apiClient";

/**
 * Componente para adicionar murais de uma escola.
 * @module escolas/murais
 * @returns {JSX.Element} - Componente de adição de murais.
 */
function AddEscolaMurais() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { escolaid } = useParams();
  const [ano, setAno] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Manipulador de mudança para o ano do mural.
   * @param {React.ChangeEvent<HTMLInputElement>} e - O evento de mudança.
   */
  const handleChangeAno = (e) => {
    setAno(e.target.value);
  };

  /**
   * Manipulador de evento para adicionar um novo mural.
   */
  const handleAdd = async () => {
    setLoading(true);
    try {
      await api.post("/escolas/mural/api/v1/", {
        ano: ano,
        escola: escolaid,
      });
      navigate(`/escola/${escolaid}/murais`);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleAdd();
      } else {
        toast.error("Erro ao cadastrar mural");
        console.log("Erro ao cadastrar mural", error);
      }
      setLoading(false);
    }
  };

  /**
   * Manipulador de evento para cancelar a adição de mural.
   */
  const handleCancelar = () => {
    setLoading(true);
    navigate(`/escola/${escolaid}/murais`);
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
        <Grid container spacing={2}>
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
                  Cadastrar Novo Mural
                </MDTypography>
              </MDBox>
              <Grid container spacing={3} mb={2}>
                <Grid item xs={12} sm={12}>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <MDInput
                      type="number"
                      variant="outlined"
                      label="Informe o Ano do Mural"
                      value={ano}
                      onChange={handleChangeAno}
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

export default AddEscolaMurais;
