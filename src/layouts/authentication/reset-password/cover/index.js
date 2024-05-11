import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/Escola.png";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "services/api";

/**
 * Componente para redefinir a senha do usuário.
 * @module authentication/reset-password/cover
 * @returns {JSX.Element} Componente de redefinição de senha.
 */
function Cover() {
  const [email, setEmail] = useState("");

  /**
   * Manipulador de evento para alterar o email no estado.
   * @param {React.ChangeEvent<HTMLInputElement>} e - O evento de alteração.
   * @returns {void}
   */
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  /**
   * Função para enviar uma solicitação de redefinição de senha para o servidor.
   * @returns {Promise<void>}
   */
  const handleRedefinir = async () => {
    try {
      const response = await fetch(`${BASE_URL}/pessoas/reset-password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success("As instruções para redefinição de senha foram enviadas para o seu e-mail.");
        setEmail("");
      } else {
        const data = await response.json();
        toast.error(data.message || "Ocorreu um erro ao processar a solicitação.");
      }
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Ocorreu um erro ao processar a solicitação.");
    }
  };

  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <ToastContainer />
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Redefinir Senha
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Você receberá um email para resetar a senha em no máximo 60 segundos
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={4}>
              <MDInput
                type="email"
                label="Email"
                value={email}
                onChange={handleChangeEmail}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton variant="gradient" color="info" onClick={handleRedefinir} fullWidth>
                Redefinir
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
