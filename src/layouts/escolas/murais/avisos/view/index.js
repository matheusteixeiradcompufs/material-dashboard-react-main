import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { AuthContext } from "context/AuthContext";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { api } from "services/apiClient";

function ViewEscolaMuralAviso() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { escolaid, muralid, avisoid } = useParams();
  const [loading, setLoading] = useState(true);
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");

  useEffect(() => {
    const fetchAviso = async () => {
      try {
        const response = await api.get(`/escolas/mural/aviso/api/v1/${avisoid}/`);
        setTitulo(response.data.titulo);
        setTexto(response.data.texto);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchAviso();
        } else {
          toast.error("Erro ao carregar os dados do aviso!");
          console.log("Erro ao carregar os dados do aviso!", error);
        }
        setLoading(false);
      }
    };
    fetchAviso();
  }, []);

  const handleChangeTitulo = (e) => {
    setTitulo(e.target.value);
  };

  const handleChangeTexto = (e) => {
    setTexto(e.target.value);
  };

  const handleOnEditar = () => {
    setLoading(true);
    navigate(`/escola/${escolaid}/mural/${muralid}/aviso/${avisoid}/editar`);
  };

  const handleVoltar = () => {
    setLoading(true);
    navigate(`/escola/${escolaid}/mural/${muralid}/avisos`);
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
                  Detalhes do Aviso
                </MDTypography>
              </MDBox>
              <Grid container>
                <Grid item xs={12} sm={12}>
                  <MDBox pt={3} px={2}>
                    <MDInput
                      variant="outlined"
                      label="Título"
                      value={titulo}
                      onChange={handleChangeTitulo}
                      fullWidth
                      disabled
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MDBox pt={3} px={2}>
                    <MDInput
                      variant="outlined"
                      label="Texto"
                      multiline
                      rows={5}
                      value={texto}
                      onChange={handleChangeTexto}
                      fullWidth
                      disabled
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MDBox pt={2} px={2} mb={2} display="flex" justifyContent="center">
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

export default ViewEscolaMuralAviso;
