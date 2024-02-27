import React, { useEffect, useState } from "react";
import { Grid, Card } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { api } from "services/apiClient";
import { Audio } from "react-loader-spinner";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";
import Sala from "layouts/escolaedit/components/Sala";
import Telefone from "layouts/escolaedit/components/Telefone";
import Email from "layouts/escolaedit/components/Email";

function EscolaEdit() {
  const { id } = useParams();
  const [escola, setEscola] = useState(null);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [cnpjEscola, setCnpjEscola] = useState("");
  const [nomeEscola, setNomeEscola] = useState("");
  const [enderecoEscola, setEnderecoEscola] = useState("");
  const [descricaoEscola, setDescricaoEscola] = useState("");

  useEffect(() => {
    const fetchEscola = async () => {
      try {
        const response = await api.get(`/escolas/api/v1/${id}`);
        setEscola(response.data);
        setLoading(false);
        setCnpjEscola(response.data.cnpj);
        setNomeEscola(response.data.nome);
        setEnderecoEscola(response.data.endereco);
        setDescricaoEscola(response.data.descricao);
      } catch (error) {
        toast.error("Erro ao carregar escola");
        console.error("Erro ao carregar escola:", error);
        setLoading(false);
      }
    };
    fetchEscola();
  }, []);

  const handleSetCnpjEscola = (e) => {
    setCnpjEscola(e.target.value);
  };

  const handleSetNomeEscola = (e) => {
    setNomeEscola(e.target.value);
  };

  const handleSetEnderecoEscola = (e) => {
    setEnderecoEscola(e.target.value);
  };

  const handleSetDescricaoEscola = (e) => {
    setDescricaoEscola(e.target.value);
  };

  const handleOnEdit = () => {
    setEdit(true);
    setCnpjEscola(escola.cnpj);
    setNomeEscola(escola.nome);
    setEnderecoEscola(escola.endereco);
    setDescricaoEscola(escola.descricao);
  };

  const handleOffEdit = () => {
    setEdit(false);
    setCnpjEscola(escola.cnpj);
    setNomeEscola(escola.nome);
    setEnderecoEscola(escola.endereco);
    setDescricaoEscola(escola.descricao);
  };

  const handleSalvar = async () => {
    setLoading(true);
    try {
      await api.patch(`/escolas/api/v1/${id}/`, {
        cnpj: cnpjEscola,
        nome: nomeEscola,
        endereco: enderecoEscola,
        descricao: descricaoEscola,
      });
      const response = await api.get(`/escolas/api/v1/${id}/`);
      setEscola(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao editar escola");
      console.log("Erro ao editar escola", error);
      setLoading(false);
    }
    handleOffEdit();
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
      <MDBox pt={6} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {edit ? (
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="success"
                  borderRadius="lg"
                  coloredShadow="success"
                >
                  <MDTypography variant="h6" color="white">
                    Escola {escola.nome}
                  </MDTypography>
                </MDBox>
                <Grid container spacing={3} mb={2}>
                  <Grid item xs={12} sm={12}>
                    <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                      <MDInput
                        type="number"
                        variant="outlined"
                        label="CNPJ"
                        value={cnpjEscola}
                        onChange={handleSetCnpjEscola}
                        style={{ width: "100%" }}
                      />
                    </MDBox>
                    <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                      <MDInput
                        type="text"
                        variant="outlined"
                        label="Nome"
                        value={nomeEscola}
                        onChange={handleSetNomeEscola}
                        style={{ width: "100%" }}
                      />
                    </MDBox>
                    <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                      <MDInput
                        type="text"
                        variant="outlined"
                        label="Endereço"
                        value={enderecoEscola}
                        onChange={handleSetEnderecoEscola}
                        style={{ width: "100%" }}
                      />
                    </MDBox>
                    <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                      <MDInput
                        type="text"
                        variant="outlined"
                        label="Descrição"
                        value={descricaoEscola}
                        onChange={handleSetDescricaoEscola}
                        multiline
                        rows={3}
                        style={{ width: "100%" }}
                      />
                    </MDBox>
                    <MDBox display="flex" justifyContent="center" spacing={2} pt={2} px={2}>
                      <MDBox justifyContent="center">
                        <MDButton variant="contained" color="success" onClick={handleSalvar}>
                          Salvar
                        </MDButton>
                      </MDBox>
                      <MDBox justifyContent="center" ml={2}>
                        <MDButton variant="contained" color="error" onClick={handleOffEdit}>
                          Cancelar
                        </MDButton>
                      </MDBox>
                    </MDBox>
                  </Grid>
                </Grid>
              </Card>
            ) : (
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
                    Escola {escola.nome}
                  </MDTypography>
                </MDBox>
                <Grid container spacing={3} mb={2}>
                  <Grid item xs={12} sm={12}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-start"
                      pt={2}
                      px={3}
                    >
                      <MDTypography variant="h6" align="left">
                        CNPJ:
                      </MDTypography>
                      <MDTypography variant="subtitle2" align="left">
                        {escola.cnpj}
                      </MDTypography>
                    </MDBox>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-start"
                      pt={2}
                      px={3}
                    >
                      <MDTypography variant="h6" align="left">
                        NOME:
                      </MDTypography>
                      <MDTypography variant="subtitle2" align="left">
                        {escola.nome}
                      </MDTypography>
                    </MDBox>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-start"
                      pt={2}
                      px={3}
                    >
                      <MDTypography variant="h6" align="left">
                        ENDEREÇO:
                      </MDTypography>
                      <MDTypography variant="subtitle2" align="left">
                        {escola.endereco}
                      </MDTypography>
                    </MDBox>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-start"
                      pt={2}
                      px={3}
                    >
                      <MDTypography variant="h6" align="left">
                        DESCRIÇÃO:
                      </MDTypography>
                      <MDTypography variant="subtitle2" align="left">
                        {escola.descricao}
                      </MDTypography>
                    </MDBox>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-start"
                      pt={2}
                      px={3}
                    >
                      <MDTypography variant="h6" align="left">
                        DESCRIÇÃO:
                      </MDTypography>
                      <MDTypography variant="subtitle2" align="left">
                        {escola.descricao}
                      </MDTypography>
                    </MDBox>
                    <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                      <MDBox justifyContent="center">
                        <MDButton variant="contained" color="info" onClick={handleOnEdit}>
                          Editar
                        </MDButton>
                      </MDBox>
                      <MDBox justifyContent="center" ml={2}>
                        <Link to={"/escola"}>
                          <MDButton variant="contained" color="error" onClick={handleOnEdit}>
                            Voltar
                          </MDButton>
                        </Link>
                      </MDBox>
                    </MDBox>
                  </Grid>
                </Grid>
              </Card>
            )}
          </Grid>
          <Grid item xs={12} mt={6}>
            <Telefone id={id} setLoading={setLoading} escola={escola} setEscola={setEscola} />
          </Grid>
          <Grid item xs={12} mt={6}>
            <Email id={id} setLoading={setLoading} escola={escola} setEscola={setEscola} />
          </Grid>
          <Grid item xs={12} mt={6}>
            <Sala id={id} setLoading={setLoading} escola={escola} setEscola={setEscola} />
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default EscolaEdit;
