import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import MDTypography from "components/MDTypography";
import { Link, useNavigate, useParams } from "react-router-dom";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Funcao from "../components/Funcao";
import Menu from "../components/Menu";
import { AuthContext } from "context/AuthContext";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";

/**
 * Componente para visualizar os detalhes de um funcionário.
 * @module pessoas/funcionarios
 * @returns {JSX.Element} Componente de visualização de funcionário.
 */
function ViewFuncionario() {
  const { user, refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { funcionarioid } = useParams();
  const [loading, setLoading] = useState(true);
  const [grupos, setGrupos] = useState([]);
  const [grupo, setGrupo] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [matricula, setMatricula] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState(null);
  const [endereco, setEndereco] = useState("");
  const [formacao, setFormacao] = useState("");
  const [retrato, setRetrato] = useState(null);

  /**
   * Efeito para carregar os detalhes do funcionário.
   */
  useEffect(() => {
    const fetchFuncionario = async () => {
      try {
        let response = await api.get(`/pessoas/funcionario/api/v1/${funcionarioid}/`);
        const { objeto_usuario } = response.data;
        setGrupo(objeto_usuario.objetos_grupos[0].id);
        setNome(objeto_usuario.first_name);
        setSobrenome(objeto_usuario.last_name);
        setEmail(objeto_usuario.email);
        setUsuario(objeto_usuario.username);
        setSenha(objeto_usuario.password);
        setMatricula(response.data.matricula);
        setCpf(response.data.cpf);
        setDataNascimento(response.data.data_nascimento);
        setEndereco(response.data.endereco);
        setFormacao(response.data.formacao);
        setRetrato(response.data.retrato);
        response = await api.get("/pessoas/usuario/grupo/api/v1/");
        setGrupos(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          fetchFuncionario();
        } else {
          toast.error("Erro ao carregar os funcionarios");
          console.log("Erro ao carregar os funcionarios", error);
        }
        setLoading(false);
      }
    };
    fetchFuncionario();
  }, []);

  /**
   * Manipulador de evento para redirecionar para a página de edição do funcionário.
   */
  const handleOnEditar = () => {
    setLoading(true);
    navigate(`/pessoas/funcionario/${funcionarioid}/editar`);
  };

  /**
   * Manipulador de evento para voltar à lista de funcionários.
   */
  const handleVoltar = () => {
    setLoading(true);
    navigate(`/pessoas/funcionarios`);
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
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Detalhes do Funcionario
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2} mb={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <MDBox px={2} color="info" display="flex" justifyContent="center">
                      <Funcao user={user} value={`${grupo}`} groups={grupos} disabled />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput label="Nome" type="text" value={nome} fullWidth disabled />
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput label="Sobrenome" type="text" value={sobrenome} fullWidth disabled />
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput label="Email" type="email" value={email} fullWidth disabled />
                  </Grid>
                  <Grid item xs={6}>
                    <MDInput label="Usuário" type="text" value={usuario} fullWidth disabled />
                  </Grid>
                  <Grid item xs={6}>
                    <MDInput label="Senha" type="password" value={senha} fullWidth disabled />
                  </Grid>
                  <Grid item xs={4}>
                    <MDInput label="Matrícula" type="text" value={matricula} fullWidth disabled />
                  </Grid>
                  <Grid item xs={4}>
                    <MDInput label="CPF" type="text" value={cpf} fullWidth disabled />
                  </Grid>
                  <Grid item xs={4}>
                    <MDInput label="Data" type="date" value={dataNascimento} fullWidth disabled />
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
                      label="Endereço"
                      type="text"
                      multiline
                      rows={2}
                      value={endereco}
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
                      label="Formação"
                      type="text"
                      multiline
                      rows={3}
                      value={formacao}
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {retrato && (
                      <MDBox px={1} display="flex" flexDirection="row">
                        <MDTypography variant="h6" mr={1}>
                          Atualmente:
                        </MDTypography>
                        <Link href={retrato} underline="hover" variant="body2">
                          {retrato}
                        </Link>
                      </MDBox>
                    )}
                    <MDInput type="file" accept="image/png, image/jpg" fullWidth disabled />
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox mb={2} display="flex" flexDirection="row" justifyContent="center">
                <MDBox mr={1}>
                  <MDButton variant="gradient" color="warning" onClick={handleOnEditar}>
                    Modificar
                  </MDButton>
                </MDBox>
                <MDBox ml={1}>
                  <MDButton variant="gradient" color="error" onClick={handleVoltar}>
                    Voltar
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox pt={2} mb={3} mt={3}>
        <Menu funcionarioid={funcionarioid} />
      </MDBox>
    </DashboardLayout>
  );
}

export default ViewFuncionario;
