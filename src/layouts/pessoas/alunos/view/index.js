import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import { Link, useNavigate, useParams } from "react-router-dom";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Menu from "../components/Menu";
import { AuthContext } from "context/AuthContext";

function ViewAluno() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { alunoid } = useParams();
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [matricula, setMatricula] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState(null);
  const [endereco, setEndereco] = useState("");
  const [retrato, setRetrato] = useState(null);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await api.get(`/pessoas/aluno/api/v1/${alunoid}/`);
        setNome(response.data.objeto_usuario.first_name);
        setSobrenome(response.data.objeto_usuario.last_name);
        setEmail(response.data.objeto_usuario.email);
        setUsuario(response.data.objeto_usuario.username);
        setSenha(response.data.objeto_usuario.password);
        setMatricula(response.data.matricula);
        setCpf(response.data.cpf);
        setDataNascimento(response.data.data_nascimento);
        setEndereco(response.data.endereco);
        setRetrato(response.data.retrato);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchAlunos();
        } else {
          toast.error("Erro ao carregar os dados do aluno");
          console.log("Erro ao carregar os dados do aluno", error);
        }
        setLoading(false);
      }
    };
    fetchAlunos();
  }, []);

  const handleSetNome = (e) => {
    setNome(e.target.value);
  };

  const handleSetSobrenome = (e) => {
    setSobrenome(e.target.value);
  };

  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSetUsuario = (e) => {
    setUsuario(e.target.value);
  };

  const handleSetMatricula = (e) => {
    setMatricula(e.target.value);
  };

  const handleSetCpf = (e) => {
    setCpf(e.target.value);
  };

  const handleSetDataNascimento = (date) => {
    setDataNascimento(date.target.value);
  };

  const handleSetEndereco = (e) => {
    setEndereco(e.target.value);
  };

  const handleOnEditar = () => {
    setLoading(true);
    navigate(`/pessoas/aluno/${alunoid}/editar`);
  };

  const handleVoltar = () => {
    setLoading(true);
    navigate(`/pessoas/alunos`);
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
      <MDBox pt={2} mb={3}>
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
                  Detalhes do Aluno
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2} mb={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <MDInput
                      label="Nome"
                      type="text"
                      value={nome}
                      onChange={handleSetNome}
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
                      label="Sobrenome"
                      type="text"
                      value={sobrenome}
                      onChange={handleSetSobrenome}
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
                      label="Email"
                      type="email"
                      value={email}
                      onChange={handleSetEmail}
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MDInput
                      label="Usuário"
                      type="text"
                      value={usuario}
                      onChange={handleSetUsuario}
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MDInput label="Senha" value={senha} type="password" fullWidth disabled />
                  </Grid>
                  <Grid item xs={4}>
                    <MDInput
                      label="Matrícula"
                      type="text"
                      value={matricula}
                      onChange={handleSetMatricula}
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <MDInput
                      label="CPF"
                      type="text"
                      value={cpf}
                      onChange={handleSetCpf}
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <MDInput
                      label="Data"
                      type="date"
                      value={dataNascimento}
                      onChange={handleSetDataNascimento}
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
                      label="Endereço"
                      type="text"
                      multiline
                      rows={2}
                      value={endereco}
                      onChange={handleSetEndereco}
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDBox px={1} display="flex" flexDirection="row">
                      <MDTypography variant="h6" mr={1}>
                        Atualmente:
                      </MDTypography>
                      {retrato && (
                        <Link href={retrato} underline="hover" variant="body2">
                          {retrato}
                        </Link>
                      )}
                    </MDBox>
                    <MDInput type="file" accept="image/png, image/jpg" fullWidth disabled />
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox mb={2} display="flex" flexDirection="row" justifyContent="center">
                <MDBox mr={1}>
                  <MDButton variant="gradient" color="info" onClick={handleOnEditar}>
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
      <MDBox pt={2} mb={3}>
        <Menu alunoid={alunoid} />
      </MDBox>
    </DashboardLayout>
  );
}

export default ViewAluno;
