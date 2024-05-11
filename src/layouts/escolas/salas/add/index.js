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
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { AuthContext } from "context/AuthContext";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";

/**
 * Componente para adicionar uma nova sala a uma escola.
 * @module escolas/salas
 * @returns {JSX.Element} Componente para adicionar uma nova sala.
 */
function AddEscolaSalas() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { escolaid } = useParams();
  const [numero, setNumero] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Atualiza o estado do número da sala com o valor do input.
   * @param {React.ChangeEvent<HTMLInputElement>} e O evento de mudança do input.
   */
  const handleChangeNumero = (e) => {
    setNumero(e.target.value);
  };

  /**
   * Atualiza o estado da quantidade de alunos da sala com o valor do input.
   * @param {React.ChangeEvent<HTMLInputElement>} e O evento de mudança do input.
   */
  const handleChangeQuantidade = (e) => {
    setQuantidade(e.target.value);
  };

  /**
   * Manipula a adição de uma nova sala.
   * Envia uma requisição para a API para adicionar a sala à escola.
   */
  const handleAdd = async () => {
    setLoading(true);
    try {
      await api.post("/escolas/sala/api/v1/", {
        numero: numero,
        quantidade_alunos: quantidade,
        escola: escolaid,
      });
      navigate(`/escola/${escolaid}/salas`);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleAdd();
      } else {
        toast.error("Erro ao cadastrar sala");
        console.log("Erro ao cadastrar sala", error);
      }
      setLoading(false);
    }
  };

  /**
   * Manipula o cancelamento da adição de uma nova sala.
   * Navega de volta para a página de listagem de salas da escola.
   */
  const handleCancelar = () => {
    setLoading(true);
    navigate(`/escola/${escolaid}/salas`);
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
                  Cadastrar Nova Sala
                </MDTypography>
              </MDBox>
              <Grid container spacing={3} mb={2}>
                <Grid item xs={12} sm={12}>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <MDInput
                      type="number"
                      variant="outlined"
                      label="Número da Sala"
                      value={numero}
                      onChange={handleChangeNumero}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <MDInput
                      type="number"
                      variant="outlined"
                      label="Quantidade de Alunos da Sala"
                      value={quantidade}
                      onChange={handleChangeQuantidade}
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

export default AddEscolaSalas;
