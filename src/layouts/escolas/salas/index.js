import { Card, Fab, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";

function EscolaSalas() {
  const navigate = useNavigate();
  const { escolaid } = useParams();
  const [escola, setEscola] = useState(true);
  const [salas, setSalas] = useState([]);
  const [sala, setSala] = useState(true);
  const [numero, setNumero] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await api.get(`/escolas/api/v1/${escolaid}/`);
        setSalas(response.data.objetos_salas);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar escola");
        console.error("Erro ao carregar escola:", error);
        setLoading(false);
      }
    };
    fetchSalas();
  }, []);
  const handleView = (salaid) => {
    setLoading(true);
    navigate(`/escola/${escolaid}/sala/${salaid}/view`);
  };
  const handleAdd = async () => {
    setLoading(true);
    try {
      await api.post("/escolas/sala/api/v1/", {
        numero: numero,
        quantidade_alunos: quantidade,
        escola: id,
      });
      navigate(`/escola/${escolaid}/salas`);
    } catch (error) {
      toast.error("Erro ao cadastrar sala");
      console.log("Erro ao cadastrar sala", error);
      setLoading(false);
    }
  };
  const handleEditar = async (salaid) => {
    setLoading(true);
    try {
      await api.patch(`/escolas/sala/api/v1/${salaid}/`, {
        numero: numero,
        quantidade_alunos: quantidade,
      });
      navigate(`/escola/${escolaid}/sala/${salaid}/view`);
    } catch (error) {
      toast.error("Erro ao cadastrar escola");
      console.log("Erro ao cadastrar escola", error);
      setLoading(false);
    }
  };
  const handleExcluir = async (salaid) => {
    setLoading(true);
    try {
      await api.delete(`/escolas/sala/api/v1/${salaid}/`);
      const response = await api.get(`/escolas/api/v1/${escolaid}/`);
      setSalas(response.data.objetos_salas);
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao excluir sala");
      console.log("Erro ao excluir sala", error);
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
                  Salas da Escola
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "numero", accessor: "numero", align: "left" },
                      { Header: "quantidade de alunos", accessor: "quantidade", align: "center" },
                      { Header: "opcoes", accessor: "opcoes", align: "right" },
                    ],
                    rows: salas.map((sala) => ({
                      numero: String(sala.numero).padStart(3, "0"),
                      quantidade: sala.quantidade_alunos,
                      opcoes: (
                        <Grid
                          container
                          spacing={2}
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Grid item xs={12} sm={6} container>
                            <MDButton
                              variant="gradient"
                              color="info"
                              size="small"
                              onClick={() => handleView(sala.id)}
                            >
                              Visualizar
                            </MDButton>
                          </Grid>
                          <Grid item xs={12} sm={6} container>
                            <MDButton
                              variant="gradient"
                              color="error"
                              size="small"
                              onClick={() => handleExcluir(sala.id)}
                            >
                              Excluir
                            </MDButton>
                          </Grid>
                        </Grid>
                      ),
                    })),
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} mt={6}>
            <Link to={`/escola/${escolaid}/salas/add`}>
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
    </DashboardLayout>
  );
}

export default EscolaSalas;
