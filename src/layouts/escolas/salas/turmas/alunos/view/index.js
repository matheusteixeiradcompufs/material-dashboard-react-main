import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import { Link, useParams } from "react-router-dom";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import Menu from "../components/Menu";
import { AuthContext } from "context/AuthContext";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";

/**
 * Componente para visualizar detalhes de um aluno em uma turma.
 * @module escolas/salas/turmas/alunos
 * @returns {JSX.Element} O componente para visualizar detalhes de um aluno.
 */
function ViewTurmaAluno() {
  const { refreshToken } = useContext(AuthContext);
  const { turmaid, alunoid } = useParams();
  const [boletim, setBoletim] = useState(null);
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
    /**
     * Função para buscar os detalhes do aluno.
     */
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
        const resTurma = await api.get(`/escolas/sala/turma/api/v1/${turmaid}/`);
        const turma = resTurma.data;
        setBoletim(turma.objetos_boletins.find((item) => `${item.aluno}` === alunoid));
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

  /**
   * Função para atualizar o nome do aluno.
   * @param {Event} e - O evento de mudança.
   */
  const handleSetNome = (e) => {
    setNome(e.target.value);
  };

  /**
   * Função para atualizar o sobrenome do aluno.
   * @param {Event} e - O evento de mudança.
   */
  const handleSetSobrenome = (e) => {
    setSobrenome(e.target.value);
  };

  /**
   * Função para atualizar o email do aluno.
   * @param {Event} e - O evento de mudança.
   */
  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };

  /**
   * Função para atualizar o usuário do aluno.
   * @param {Event} e - O evento de mudança.
   */
  const handleSetUsuario = (e) => {
    setUsuario(e.target.value);
  };

  /**
   * Função para atualizar a matrícula do aluno.
   * @param {Event} e - O evento de mudança.
   */
  const handleSetMatricula = (e) => {
    setMatricula(e.target.value);
  };

  /**
   * Função para atualizar o CPF do aluno.
   * @param {Event} e - O evento de mudança.
   */
  const handleSetCpf = (e) => {
    setCpf(e.target.value);
  };

  /**
   * Função para atualizar a data de nascimento do aluno.
   * @param {Event} date - O evento de mudança de data.
   */
  const handleSetDataNascimento = (date) => {
    setDataNascimento(date.target.value);
  };

  /**
   * Função para atualizar o endereço do aluno.
   * @param {Event} e - O evento de mudança.
   */
  const handleSetEndereco = (e) => {
    setEndereco(e.target.value);
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
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox pt={2} mb={3}>
        <Menu boletimid={`${boletim.id}`} alunoid={alunoid} />
      </MDBox>
    </DashboardLayout>
  );
}

export default ViewTurmaAluno;
