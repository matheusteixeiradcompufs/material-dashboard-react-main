import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/Escola.png";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "services/api";

function Cover() {
  const [email, setEmail] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

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
            Você receberá um email para resetar a senha em no maximo 60 seg
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
                redefinir
              </MDButton>
            </MDBox>
            {/* {message && (
              <MDTypography variant="body1" align="center" style={{ marginTop: "1rem" }}>
                {message}
              </MDTypography>
            )} */}
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
