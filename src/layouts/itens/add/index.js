import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useContext, useState } from "react";
import { Audio } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import MDInput from "components/MDInput";
import { AuthContext } from "context/AuthContext";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";

/**
 * Componente funcional que representa a página de adição de itens à merenda.
 * @module itens
 * @returns {JSX.Element} O componente React para renderizar.
 */
function AddItens() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  /**
   * Atualiza o estado do nome do item com o valor fornecido.
   * @param {Object} e - O evento de mudança.
   */
  const handleChangeNome = (e) => {
    setNome(e.target.value);
  };

  /**
   * Atualiza o estado da descrição do item com o valor fornecido.
   * @param {Object} e - O evento de mudança.
   */
  const handleChangeDescricao = (e) => {
    setDescricao(e.target.value);
  };

  /**
   * Adiciona um novo item à merenda.
   */
  const handleAdd = async () => {
    setLoading(true);
    try {
      await api.post("/escolas/cardapio/item/api/v1/", {
        nome: nome,
        descricao: descricao,
      });
      navigate(`/itensmerenda`);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleAdd();
      } else {
        toast.error("Erro ao salvar item!");
        console.log("Erro ao salvar item!", error);
      }
      setLoading(false);
    }
  };

  /**
   * Cancela a adição de um novo item e retorna à página anterior.
   */
  const handleCancelar = () => {
    setLoading(true);
    navigate(`/itensmerenda`);
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
                  Cadastrar Novo Ítem
                </MDTypography>
              </MDBox>
              <Grid container>
                <Grid item xs={12} sm={12}>
                  <MDBox pt={3} px={2} display="flex">
                    <MDInput
                      variant="outlined"
                      label="Nome do Ítem"
                      value={nome}
                      onChange={handleChangeNome}
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MDBox pt={3} px={2} display="flex">
                    <MDInput
                      variant="outlined"
                      label="Descrição do Ítem"
                      multiline
                      rows={5}
                      value={descricao}
                      onChange={handleChangeDescricao}
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MDBox pt={3} px={2} mb={2} display="flex" justifyContent="center">
                    <MDBox mr={1}>
                      <MDButton variant="gradient" color="success" onClick={handleAdd}>
                        Salvar
                      </MDButton>
                    </MDBox>
                    <MDBox ml={1}>
                      <MDButton variant="gradient" color="error" onClick={handleCancelar}>
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

export default AddItens;
