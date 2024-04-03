import React, { useEffect, useState } from "react";
import { Grid, Fab, Card } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import { api } from "services/apiClient";
import { Audio } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";

function Escolas() {
  const navigate = useNavigate();
  const [escolas, setEscolas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEscolas = async () => {
      try {
        const response = await api.get("/escolas/api/v1/");
        setEscolas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar escolas");
        console.error("Erro ao carregar escolas:", error);
        setLoading(false);
      }
    };
    fetchEscolas();
  }, []);

  const handleView = (escolaid) => {
    setLoading(true);
    navigate(`/escola/${escolaid}/view`);
  };

  const handleExcluir = async (escolaid) => {
    setLoading(true);
    try {
      await api.delete(`/escolas/api/v1/${escolaid}/`);
      const response = await api.get("/escolas/api/v1/");
      setEscolas(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao excluir escola");
      console.log("Erro ao excluir escola", error);
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
                  Lista de Escolas
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "cnpj", accessor: "cnpj", align: "left" },
                      { Header: "nome", accessor: "nome", align: "left" },
                      { Header: "num_salas", accessor: "num_salas", align: "center" },
                      {
                        Header: "quantidade_alunos",
                        accessor: "quantidade_alunos",
                        align: "center",
                      },
                      { Header: "opcoes", accessor: "opcoes", align: "center" },
                    ],
                    rows: escolas.map((escola) => ({
                      cnpj: escola.cnpj,
                      nome: escola.nome,
                      num_salas: escola.num_salas,
                      quantidade_alunos: escola.quantidade_alunos,
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
                              onClick={() => handleView(escola.id)}
                            >
                              Visualizar
                            </MDButton>
                          </Grid>
                          <Grid item xs={12} sm={6} container>
                            <MDButton
                              variant="gradient"
                              color="error"
                              size="small"
                              onClick={() => handleExcluir(escola.id)}
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
            <Link to="/escolas/add">
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

export default Escolas;
