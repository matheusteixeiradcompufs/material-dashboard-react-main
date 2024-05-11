import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useContext, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { AuthContext } from "context/AuthContext";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";

/**
 * Componente para adicionar um novo responsável de aluno.
 * @module pessoas/alunos/responsaveis
 * @returns {JSX.Element} JSX para a página de adição de responsável de aluno.
 */
function AddAlunoResponsaveis() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { alunoid } = useParams();
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [observacao, setObservacao] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Define o valor do CPF.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de mudança.
   */
  const handleSetCpf = (e) => {
    setCpf(e.target.value);
  };

  /**
   * Define o valor do nome.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de mudança.
   */
  const handleSetNome = (e) => {
    setNome(e.target.value);
  };

  /**
   * Define o valor da observação.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de mudança.
   */
  const handleSetObservacao = (e) => {
    setObservacao(e.target.value);
  };

  /**
   * Manipula a adição de um novo responsável.
   */
  const handleAdd = async () => {
    setLoading(true);
    try {
      await api.post("/pessoas/aluno/responsavel/api/v1/", {
        cpf: cpf,
        nome: nome,
        observacao: observacao,
        aluno: alunoid,
      });
      navigate(`/pessoas/aluno/${alunoid}/responsaveis`);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleAdd();
      } else {
        toast.error("Erro ao cadastrar responsável");
        console.log("Erro ao cadastrar responsável", error);
      }
      setLoading(false);
    }
  };

  /**
   * Manipula o cancelamento da adição de um responsável.
   */
  const handleCancelar = () => {
    setLoading(true);
    navigate(`/pessoas/aluno/${alunoid}/responsaveis`);
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
                  Cadastrar Novo Responsável
                </MDTypography>
              </MDBox>
              <Grid container spacing={3} mb={2}>
                <Grid item xs={12} sm={12}>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <MDInput
                      type="text"
                      variant="outlined"
                      label="CPF"
                      value={cpf}
                      onChange={handleSetCpf}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <MDInput
                      type="text"
                      variant="outlined"
                      label="Nome"
                      value={nome}
                      onChange={handleSetNome}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <MDInput
                      type="text"
                      variant="outlined"
                      label="Observação"
                      multiline
                      rows={3}
                      value={observacao}
                      onChange={handleSetObservacao}
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

export default AddAlunoResponsaveis;
