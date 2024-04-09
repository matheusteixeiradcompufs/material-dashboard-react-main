import AddIcon from "@mui/icons-material/Add";
import { Card, Fab, Grid, Switch } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { AuthContext } from "context/AuthContext";
import { format } from "date-fns";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DataTable from "examples/Tables/DataTable";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";

function BoletimFrequencia() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { alunoid, boletimid } = useParams();
  const [boletim, setBoletim] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoletim = async () => {
      try {
        const response = await api.get(`/pessoas/aluno/boletim/api/v1/${boletimid}/`);
        setBoletim(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchBoletim();
        } else {
          toast.error("Erro ao carregar boletim!");
          console.log("Erro ao carregar boletim", error);
        }
        setLoading(false);
      }
    };
    fetchBoletim();
  }, []);

  const handleEdit = (dialetivoid) => {
    setLoading(true);
    navigate(
      `/pessoas/aluno/${alunoid}/boletim/${boletimid}/frequencia/dialetivo/${dialetivoid}/edit`
    );
  };

  const handleExcluir = async (dialetivoid) => {
    setLoading(true);
    try {
      await api.post(`/pessoas/aluno/frequencia/dialetivo/api/v1/${dialetivoid}/`);
      const response = await api.get(`/pessoas/aluno/boletim/api/v1/${boletimid}/`);
      setBoletim(response.data);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleExcluir(dialetivoid);
      } else {
        toast.error("Erro ao excluir presença!");
        console.log("Erro ao excluir presença!", error);
      }
      setLoading(false);
    }
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
              Frequência do Aluno
            </MDTypography>
          </MDBox>
          <MDBox pt={3} px={2} mb={2} display="flex" justifyContent="center">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <MDBox display="flex" justifyContent="center">
                  <MDInput
                    label="Percentual"
                    type="text"
                    value={`${boletim?.objeto_frequencia.percentual.toFixed(1)}%`}
                    disabled
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12}>
                <MDBox
                  mx={2}
                  mt={2}
                  py={1}
                  px={2}
                  mb={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Lista de Presenças
                  </MDTypography>
                </MDBox>
                <DataTable
                  table={{
                    columns: [
                      { Header: "data", accessor: "data", align: "left" },
                      { Header: "presença", accessor: "presenca", align: "center" },
                      { Header: "", accessor: "opcoes", align: "right" },
                    ],
                    rows: boletim?.objeto_frequencia.objetos_diasletivos
                      .sort((a, b) => new Date(b.data) - new Date(a.data))
                      .map((dialetivo) => ({
                        data: format(new Date(dialetivo.data), "dd/MM/yyyy"),
                        presenca: <Switch size="small" checked={dialetivo.presenca} />,
                        opcoes: (
                          <MDBox display="flex" flexDirection="row">
                            <MDBox mr={1}>
                              <MDButton
                                variant="gradient"
                                color="info"
                                size="small"
                                onClick={() => handleEdit(dialetivo.id)}
                              >
                                Modificar
                              </MDButton>
                            </MDBox>
                            <MDBox ml={1}>
                              <MDButton
                                variant="gradient"
                                color="error"
                                size="small"
                                onClick={() => handleExcluir(dialetivo.id)}
                              >
                                Excluir
                              </MDButton>
                            </MDBox>
                          </MDBox>
                        ),
                      })),
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </Grid>
              <Grid item xs={12} mt={6}>
                <Link
                  to={`/pessoas/aluno/${alunoid}/boletim/${boletimid}/frequencia/diasletivos/add`}
                >
                  <Fab
                    color="success"
                    aria-label="add"
                    style={{ position: "fixed", bottom: "2rem", right: "2rem" }}
                  >
                    <AddIcon color="white" />
                  </Fab>
                </Link>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default BoletimFrequencia;
