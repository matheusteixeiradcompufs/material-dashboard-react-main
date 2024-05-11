import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useContext, useState } from "react";
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
 * Componente para adicionar um novo telefone para um aluno.
 * @module pessoas/alunos/telefones
 * @returns {JSX.Element} JSX para a página de adição de telefones do aluno.
 */
function AddAlunoTelefones() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { alunoid } = useParams();
  const [numero, setNumero] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Define o número do telefone conforme o usuário digita.
   * @param {React.ChangeEvent<HTMLInputElement>} e - O evento de mudança.
   */
  const handleSetNumero = (e) => {
    setNumero(e.target.value);
  };

  /**
   * Envia uma requisição para adicionar um novo telefone do aluno.
   */
  const handleAdd = async () => {
    setLoading(true);
    try {
      await api.post("/pessoas/telefone/api/v1/", {
        numero: numero,
        pessoa: alunoid,
      });
      navigate(`/pessoas/aluno/${alunoid}/telefones`);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleAdd();
      } else {
        toast.error("Erro ao cadastrar telefone do aluno");
        console.log("Erro ao cadastrar telefone do aluno", error);
      }
      setLoading(false);
    }
  };

  /**
   * Cancela a adição do telefone e redireciona para a página anterior.
   */
  const handleCancelar = () => {
    setLoading(true);
    navigate(`/pessoas/aluno/${alunoid}/telefones`);
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
                      onChange={handleSetNumero}
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

export default AddAlunoTelefones;
