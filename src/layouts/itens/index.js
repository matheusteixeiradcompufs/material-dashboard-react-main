import { Card, Fab, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import AddIcon from "@mui/icons-material/Add";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import { Link, useNavigate } from "react-router-dom";

function Itens() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [itens, setItens] = useState([]);
  const [item, setItem] = useState(null);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  useEffect(() => {
    const fetchItens = async () => {
      try {
        const response = await api.get("/escolas/cardapio/item/api/v1/");
        setItens(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar ítens da merenda!");
        console.log("Erro ao carregar ítens da merenda!", error);
        setLoading(false);
      }
    };
    fetchItens();
  }, []);
  const handleView = (itemid) => {
    setLoading(true);
    navigate(`/itemmerenda/${itemid}/view`);
  };
  const handleChangeNome = (e) => {
    setNome(e.target.value);
  };
  const handleChangeDescricao = (e) => {
    setDescricao(e.target.value);
  };
  const handleAdd = async () => {
    setLoading(true);
    try {
      await api.post("/escolas/cardapio/item/api/v1/", {
        nome: nome,
        descricao: descricao,
      });
      navigate(`/itensmerenda`);
    } catch (error) {
      toast.error("Erro ao salvar item!");
      console.log("Erro ao salvar item!", error);
      setLoading(false);
    }
  };
  const handleEditar = async () => {
    setLoading(true);
    try {
      await api.patch(`/escolas/cardapio/item/api/v1/${itemid}/`, {
        nome: nome,
        descricao: descricao,
      });
      navigate(`/itemmerenda/${itemid}/view`);
    } catch (error) {
      toast.error("Erro ao editar item!");
      console.log("Erro ao editar item!", error);
      setLoading(false);
    }
  };
  const handleExcluir = async (itemid) => {
    setLoading(true);
    try {
      await api.delete(`/escolas/cardapio/item/api/v1/${itemid}/`);
      const response = await api.get("/escolas/cardapio/item/api/v1/");
      setItens(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao excluir item!");
      console.log("Erro ao excluir item!", error);
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
                  Itens da Merenda
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "ítem", accessor: "item", width: "70%", align: "left" },
                      { Header: "", accessor: "opcoes", align: "center" },
                    ],
                    rows: [
                      ...itens?.map((objeto) => ({
                        item: objeto.nome,
                        opcoes: (
                          <MDBox display="flex" flexDirection="row">
                            <MDBox mr={1}>
                              <MDButton
                                variant="gradient"
                                color="info"
                                size="small"
                                onClick={() => handleView(objeto.id)}
                              >
                                Visualizar
                              </MDButton>
                            </MDBox>
                            <MDBox ml={1}>
                              <MDButton
                                variant="gradient"
                                color="error"
                                size="small"
                                onClick={() => handleExcluir(objeto.id)}
                              >
                                Excluir
                              </MDButton>
                            </MDBox>
                          </MDBox>
                        ),
                      })),
                    ],
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
            <Link to={`/itensmerenda/add`}>
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

export default Itens;
