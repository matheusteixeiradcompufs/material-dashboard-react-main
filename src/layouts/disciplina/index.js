import { Card, Fab, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import MDInput from "components/MDInput";
import Listar from "./components/Listar";
import Add from "./components/Add";
import Editar from "./components/Editar";

function Disciplinas() {
  const [loading, setLoading] = useState(false);
  const [disciplina, setDisciplina] = useState(null);
  const [disciplinas, setDisciplinas] = useState([]);
  const [addDisciplina, setAddDisciplina] = useState(false);
  const [editarDisciplina, setEditarDisciplina] = useState(false);
  const [listarDisciplina, setListarDisciplina] = useState(true);
  const [nomeDisciplina, setNomeDisciplina] = useState("");

  useEffect(() => {
    const fetchDisciplina = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/escolas/disciplina/api/v1/`);
        setDisciplinas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar disciplina!");
        console.log("Erro ao carregar disciplina!", error);
        setLoading(false);
      }
    };
    fetchDisciplina();
  }, []);

  const handleChangeNomeDisciplina = (nome) => {
    setNomeDisciplina(nome.target.value);
  };

  const handleOnAddDisciplina = () => {
    handleOffEditarDisciplina();
    handleOffListarDisciplina();
    setAddDisciplina(true);
  };

  const handleOffAddDisciplina = () => {
    setAddDisciplina(false);
    setNomeDisciplina("");
  };

  const handleOnEditarDisciplina = (index) => {
    handleOffAddDisciplina();
    handleOffListarDisciplina();
    setEditarDisciplina(true);
    setNomeDisciplina(disciplinas[index].nome);
    setDisciplina(disciplinas[index]);
  };

  const handleOffEditarDisciplina = () => {
    setEditarDisciplina(false);
    setNomeDisciplina("");
    setDisciplina(null);
  };

  const handleOnListarDisciplina = () => {
    handleOffAddDisciplina();
    handleOffEditarDisciplina();
    setListarDisciplina(true);
  };

  const handleOffListarDisciplina = () => {
    setListarDisciplina(false);
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
            {listarDisciplina ? (
              <Listar
                disciplinas={disciplinas}
                setDisciplinas={setDisciplinas}
                setLoading={setLoading}
                handleOnEditarDisciplina={handleOnEditarDisciplina}
              />
            ) : (
              <MDBox></MDBox>
            )}
            {addDisciplina ? (
              <Add
                nomeDisciplina={nomeDisciplina}
                setDisciplinas={setDisciplinas}
                setLoading={setLoading}
                handleChangeNomeDisciplina={handleChangeNomeDisciplina}
                handleOnListarDisciplina={handleOnListarDisciplina}
              />
            ) : (
              <MDBox></MDBox>
            )}
            {editarDisciplina ? (
              <Editar
                nomeDisciplina={nomeDisciplina}
                disciplina={disciplina}
                setDisciplinas={setDisciplinas}
                setLoading={setLoading}
                handleChangeNomeDisciplina={handleChangeNomeDisciplina}
                handleOnListarDisciplina={handleOnListarDisciplina}
              />
            ) : (
              <MDBox></MDBox>
            )}
          </Grid>
          {!addDisciplina ? (
            <Grid item xs={12} mt={6}>
              <Fab
                color="success"
                aria-label="add"
                style={{ position: "fixed", bottom: "2rem", right: "2rem" }}
                onClick={handleOnAddDisciplina}
              >
                <AddIcon color="white" />
              </Fab>
            </Grid>
          ) : (
            <MDBox></MDBox>
          )}
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Disciplinas;
