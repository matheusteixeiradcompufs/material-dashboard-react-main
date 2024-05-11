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
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { api } from "services/apiClient";

/**
 * Componente para adicionar uma nova escola.
 * @module escolas
 * @returns {JSX.Element} Componente AddEscolas.
 */
function AddEscolas() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cnpj, setCnpj] = useState("");
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [descricao, setDescricao] = useState("");

  /**
   * Manipulador para alterar o valor do CNPJ.
   * @param {React.ChangeEvent<HTMLInputElement>} e - O evento de mudança.
   */
  const handleChangeCnpj = (e) => {
    setCnpj(e.target.value);
  };

  /**
   * Manipulador para alterar o valor do nome.
   * @param {React.ChangeEvent<HTMLInputElement>} e - O evento de mudança.
   */
  const handleChangeNome = (e) => {
    setNome(e.target.value);
  };

  /**
   * Manipulador para alterar o valor do endereço.
   * @param {React.ChangeEvent<HTMLInputElement>} e - O evento de mudança.
   */
  const handleChangeEndereco = (e) => {
    setEndereco(e.target.value);
  };

  /**
   * Manipulador para alterar o valor da descrição.
   * @param {React.ChangeEvent<HTMLInputElement>} e - O evento de mudança.
   */
  const handleChangeDescricao = (e) => {
    setDescricao(e.target.value);
  };

  /**
   * Manipulador para adicionar uma nova escola.
   */
  const handleAdd = async () => {
    setLoading(true);
    try {
      await api.post("/escolas/api/v1/", {
        cnpj: cnpj,
        nome: nome,
        endereco: endereco,
        descricao: descricao,
      });
      navigate("/escolas");
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleAdd();
      } else {
        toast.error("Erro ao cadastrar escola");
        console.log("Erro ao cadastrar escola", error);
      }
      setLoading(false);
    }
  };

  /**
   * Manipulador para cancelar a adição de uma nova escola.
   */
  const handleCancelar = () => {
    setLoading(true);
    navigate("/escolas");
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
                coloredShadow="success"
              >
                <MDTypography variant="h6" color="white">
                  Cadastrar Nova Escola
                </MDTypography>
              </MDBox>
              <Grid container spacing={3} mb={2}>
                <Grid item xs={12} sm={12}>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <MDInput
                      type="number"
                      variant="outlined"
                      label="CNPJ"
                      value={cnpj}
                      onChange={handleChangeCnpj}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <MDInput
                      type="text"
                      variant="outlined"
                      label="Nome"
                      value={nome}
                      onChange={handleChangeNome}
                      fullWidth
                    />
                  </MDBox>
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
                    <MDInput
                      type="text"
                      variant="outlined"
                      label="Descrição"
                      value={descricao}
                      onChange={handleChangeDescricao}
                      multiline
                      rows={3}
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

export default AddEscolas;
