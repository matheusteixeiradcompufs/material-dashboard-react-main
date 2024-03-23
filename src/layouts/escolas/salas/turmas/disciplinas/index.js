import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import List from "./components/List";
import Manage from "./components/Manage";

function TurmaDisciplinas() {
  const { turmaid } = useParams();
  const [loading, setLoading] = useState(true);
  const [turma, setTurma] = useState(null);
  const [disciplinas, setDisciplinas] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [listar, setListar] = useState(true);
  const [gerenciar, setGerenciar] = useState(false);
  useEffect(() => {
    const fetchTurma = async () => {
      try {
        let response = await api.get(`/escolas/sala/turma/api/v1/${turmaid}/`);
        setTurma(response.data);
        response = await api.get("/escolas/disciplina/api/v1/");
        setDisciplinas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar turma!");
        console.log("Erro ao carregar turma!", error);
        setLoading(false);
      }
    };
    fetchTurma();
  }, []);
  const handleOnListar = () => {
    setGerenciar(false);
    setListar(true);
  };
  const handleOnGerenciar = () => {
    setLeft(
      disciplinas?.filter(
        (item) =>
          !turma?.objetos_disciplinas.some(
            (element) => element.id === item.id && element.nome === item.nome
          )
      )
    );
    setRight(turma?.objetos_disciplinas);
    setListar(false);
    setGerenciar(true);
  };
  const handleSalvarDisciplinas = async () => {
    setLoading(true);
    try {
      const response = await api.patch(`/escolas/sala/turma/api/v1/${turma.id}/`, {
        disciplinas: right.map((item) => item.id),
      });
      setTurma(response.data);
      handleOnListar();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao salvar atualizar a turma");
      console.log("Erro ao salvar atualizar a turma");
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
      <MDBox pt={6} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {listar ? <List turma={turma} handleOnGerenciar={handleOnGerenciar} /> : <></>}
            {gerenciar ? (
              <Manage
                turma={turma}
                left={left}
                setLeft={setLeft}
                right={right}
                setRight={setRight}
                handleSalvarDisciplinas={handleSalvarDisciplinas}
                handleOnListar={handleOnListar}
              />
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default TurmaDisciplinas;
