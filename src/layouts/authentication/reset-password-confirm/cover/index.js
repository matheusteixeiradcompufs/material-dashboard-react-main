import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import { ToastContainer, toast } from "react-toastify";
import bgImage from "assets/images/Escola.png";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { BASE_URL } from "services/api";

/**
 * Componente para redefinir a senha do usuário.
 * @module authentication/reset-password-confirm/cover
 * @returns {JSX.Element} Componente de redefinição de senha.
 */
function Cover() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { pid, puid, ptoken } = useParams();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  /**
   * Efeito para verificar a confirmação de usuário.
   */
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch(`${BASE_URL}/pessoas/usuario/api/v1/${pid}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const usuario = await response.json();

        setConfirm(
          usuario.objeto_pessoa &&
            usuario.objeto_pessoa.uid === puid &&
            usuario.objeto_pessoa.token === ptoken
        );

        setLoading(false);
      } catch (error) {
        console.error("Erro:", error);
        toast.error("Ocorreu um erro ao processar a solicitação.");
      }
    };
    fetchUsuario();
  }, []);

  /**
   * Manipulador de evento para alterar a senha.
   * @param {React.ChangeEvent<HTMLInputElement>} e - O evento de alteração.
   */
  const handleChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword, password2);
  };

  /**
   * Manipulador de evento para alterar a segunda senha.
   * @param {React.ChangeEvent<HTMLInputElement>} e - O evento de alteração.
   */
  const handleChangePassword2 = (e) => {
    const newPassword2 = e.target.value;
    setPassword2(newPassword2);
    validatePassword(password, newPassword2);
  };

  /**
   * Função para validar a senha.
   * @param {string} password - A senha.
   * @param {string} password2 - A segunda senha.
   */
  const validatePassword = (password, password2) => {
    if (password !== password2) {
      setPasswordError("As senhas não coincidem");
    } else if (password.length < 8) {
      setPasswordError("A senha deve ter pelo menos 8 caracteres");
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("A senha deve conter pelo menos uma letra maiúscula");
    } else if (!/[a-z]/.test(password)) {
      setPasswordError("A senha deve conter pelo menos uma letra minúscula");
    } else if (!/\d/.test(password)) {
      setPasswordError("A senha deve conter pelo menos um número");
    } else {
      setPasswordError("");
    }
  };

  /**
   * Função para redefinir a senha.
   */
  const handleRedefinir = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/pessoas/usuario/api/v1/${pid}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          token: "",
          uid: "",
        }),
      });

      if (response.ok) {
        toast.success("Senha redefinida com sucesso!");
      } else {
        const data = await response.json();
        toast.error(data.message || "Ocorreu um erro ao processar a solicitação.");
      }
      setPassword("");
      setPassword2("");
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Ocorreu um erro ao processar a solicitação.");
    }
  };

  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <ToastContainer />
      {confirm || loading ? (
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
              Insira a nova senha e depois confirme a nova senha
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox>
              <MDBox mb={4}>
                <MDInput
                  type="password"
                  label="Nova Senha"
                  value={password}
                  onChange={handleChangePassword}
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={4}>
                <MDInput
                  type="password"
                  label="Confirme a Nova Senha"
                  value={password2}
                  onChange={handleChangePassword2}
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              {passwordError && (
                <MDTypography variant="caption" color="error">
                  {passwordError}
                </MDTypography>
              )}
              {loading ? (
                <MDButton variant="gradient" color="info" fullWidth>
                  <RotatingLines
                    visible={true}
                    height="20"
                    width="20"
                    color="#fff"
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </MDButton>
              ) : (
                <MDBox mt={6} mb={1}>
                  <MDButton variant="gradient" color="info" onClick={handleRedefinir} fullWidth>
                    Redefinir
                  </MDButton>
                </MDBox>
              )}
            </MDBox>
          </MDBox>
        </Card>
      ) : (
        <Card>
          <MDBox
            variant="gradient"
            bgColor="error"
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
              Erro ao processar sua solicitação. O id ou o token estão inválidos.
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox mt={6} mb={1}>
              <Link to="http://127.0.0.1:3000/reset-password">
                <MDButton variant="gradient" color="error" onClick={handleRedefinir} fullWidth>
                  Tentar Novamente
                </MDButton>
              </Link>
            </MDBox>
          </MDBox>
        </Card>
      )}
    </CoverLayout>
  );
}

export default Cover;
