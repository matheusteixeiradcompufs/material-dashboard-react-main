import { Card, Grid, MenuItem } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Select from "examples/Select";
import Transfer from "../components/Transfer";
import { AuthContext } from "context/AuthContext";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";

/**
 * Componente para gerenciar as turmas de um funcionário.
 * @module pessoas/funcionarios/turmas
 * @returns {JSX.Element} Componente ManageFuncionarioTurmas.
 */
function ManageFuncionarioTurmas() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { funcionarioid } = useParams();
  const [escola, setEscola] = useState("");
  const [escolas, setEscolas] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Função assíncrona para buscar os dados necessários.
     */
    const fetchDados = async () => {
      try {
        const resEscolas = await api.get(`/escolas/api/v1/`);
        setEscolas(resEscolas.data);
        const resTurmas = await api.get(`/escolas/sala/turma/api/v1/`);
        setTurmas(resTurmas.data);
        const resFunc = await api.get(`/pessoas/funcionario/api/v1/${funcionarioid}/`);
        setRight(resFunc.data.objetos_turmas || []);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchDados();
        } else {
          toast.error("Erro ao carregar dados");
          console.error("Erro ao carregar dados:", error);
        }
        setLoading(false);
      }
    };
    fetchDados();
  }, []);

  /**
   * Manipula a alteração da escola selecionada.
   * @param {Object} e - Evento de mudança.
   */
  const handleChangeEscola = (e) => {
    const newValue = e.target.value;
    setEscola(newValue);
    const turmasFiltradas = turmas.filter((item) => newValue === item.objeto_sala.objeto_escola.id);
    setLeft(turmasFiltradas.filter((item) => !right.some((element) => element.id === item.id)));
  };

  /**
   * Salva as turmas atribuídas ao funcionário.
   */
  const handleSalvar = async () => {
    console.log(right.map((objeto) => objeto.id));
    setLoading(true);
    try {
      await api.patch(`/pessoas/funcionario/api/v1/${funcionarioid}/`, {
        turmas: right.map((objeto) => objeto.id),
      });
      navigate(`/pessoas/funcionario/${funcionarioid}/turmas`);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleSalvar();
      } else {
        toast.error("Erro ao salvar turmas!");
        console.log("Erro ao salvar turmas!", error);
      }
      setLoading(false);
    }
  };

  /**
   * Cancela a operação e retorna à página anterior.
   */
  const handleCancelar = () => {
    setLoading(true);
    navigate(`/pessoas/funcionario/${funcionarioid}/turmas`);
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
                  Turmas
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2} mb={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <MDBox display="flex" justifyContent="center">
                      <Select
                        label="Selecione uma Escola"
                        value={escola}
                        onChange={handleChangeEscola}
                      >
                        {escolas.map((objeto, index) => (
                          <MenuItem key={index} value={objeto.id}>
                            {objeto.nome}
                          </MenuItem>
                        ))}
                      </Select>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12}>
                    <Transfer left={left} setLeft={setLeft} right={right} setRight={setRight} />
                  </Grid>
                  <Grid item xs={12}>
                    <MDBox display="flex" flexDirection="row" justifyContent="center">
                      <MDBox mr={1}>
                        <MDButton variant="gradient" color="success" onClick={handleSalvar}>
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
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default ManageFuncionarioTurmas;
