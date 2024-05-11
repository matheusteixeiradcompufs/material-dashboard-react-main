import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { AuthContext } from "context/AuthContext";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";

/**
 * Componente para editar um telefone de um aluno.
 * @module pessoas/alunos/telefones
 * @returns {JSX.Element} JSX para a página de edição de telefone do aluno.
 */
function EditarAlunoTelefone() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { alunoid, telefoneid } = useParams();
  const [numero, setNumero] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTelefone = async () => {
      try {
        const response = await api.get(`/pessoas/telefone/api/v1/${telefoneid}/`);
        setNumero(response.data.numero);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchTelefone();
        } else {
          toast.error("Erro ao carregar dados do telefone!");
          console.error("Erro ao carregar dados do telefone!:", error);
        }
        setLoading(false);
      }
    };
    fetchTelefone();
  }, []);

  /**
   * Define o número do telefone conforme o usuário digita.
   * @param {React.ChangeEvent<HTMLInputElement>} e - O evento de mudança.
   */
  const handleSetNumero = (e) => {
    setNumero(e.target.value);
  };

  /**
   * Envia uma requisição para editar o telefone do aluno.
   */
  const handleEditar = async () => {
    setLoading(true);
    try {
      await api.patch(`/pessoas/telefone/api/v1/${telefoneid}/`, {
        numero: numero,
      });
      navigate(`/pessoas/aluno/${alunoid}/telefone/${telefoneid}/view`);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleEditar();
      } else {
        toast.error("Erro ao modificar telefone do aluno");
        console.log("Erro ao modificar telefone do aluno", error);
      }
      setLoading(false);
    }
  };

  /**
   * Cancela a edição do telefone e redireciona para a página anterior.
   */
  const handleCancelar = () => {
    setLoading(true);
    navigate(`/pessoas/aluno/${alunoid}/telefone/${telefoneid}/view`);
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
                  Modificar Telefone
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
                      onChange={handleSetNumero}
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

export default EditarAlunoTelefone;
