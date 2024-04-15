import { useContext, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/Escola.png";
import { AuthContext } from "context/AuthContext";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function Basic() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, login, loading, logout } = useContext(AuthContext);

  const handleSetUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    await login({ username, password });
  };

  return (
    <BasicLayout image={bgImage}>
      <ToastContainer />
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Login
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="matricula"
                label="Matrícula"
                value={username}
                onChange={handleSetUsername}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Senha"
                value={password}
                onChange={handleSetPassword}
                fullWidth
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
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
                <MDBox>
                  <MDButton variant="gradient" color="info" onClick={handleLogin} fullWidth>
                    Acessar
                  </MDButton>
                  <MDBox textAlign="center" mt={2}>
                    <Link to="/reset-password" style={{ textDecoration: "none", color: "inherit" }}>
                      Esqueceu sua senha? Clique aqui.
                    </Link>
                  </MDBox>
                </MDBox>
              )}
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
