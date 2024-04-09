import React, { useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useParams } from "react-router-dom";
import { api } from "services/apiClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Audio } from "react-loader-spinner";
import List from "./components/List";
import Edit from "./components/Edit";
import Final from "./components/Final";
import { AuthContext } from "context/AuthContext";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";

function BoletimNotas() {
  const { refreshToken } = useContext(AuthContext);
  const { boletimid } = useParams();
  const [loading, setLoading] = useState(true);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [medias, setMedias] = useState([]);
  const [situacoes, setSituacoes] = useState([]);
  const [valores, setValores] = useState([]);
  const [confs, setConfs] = useState([]);
  const [finals, setFinals] = useState([]);
  const [nome, setNome] = useState("");
  const [list, setList] = useState(true);
  const [edit, setEdit] = useState(false);
  const [final, setFinal] = useState(false);

  useEffect(() => {
    const fetchBoletim = async () => {
      try {
        const response = await api.get(`/pessoas/aluno/boletim/api/v1/${boletimid}/`);
        const { objetos_avaliacoes, objetos_medias, objetos_situacoes } = response.data;
        setAvaliacoes(objetos_avaliacoes);
        setMedias(objetos_medias);
        setSituacoes(objetos_situacoes);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchBoletim();
        } else {
          toast.error("Erro ao carregar boletim");
          console.error("Erro ao carregar boletim:", error);
        }
        setLoading(false);
      }
    };
    fetchBoletim();
  }, []);

  const handleOnFinal = () => {
    setFinals(situacoes.map((objeto) => objeto.finalizar));
    setList(false);
    setEdit(false);
    setFinal(true);
  };

  const handleOnList = () => {
    setEdit(false);
    setFinal(false);
    setList(true);
  };

  const handleOnEdit = (nomeAv) => {
    setValores(avaliacoes.map((objeto) => objeto.nota));
    setConfs(avaliacoes.map((objeto) => objeto.confirmar));
    setNome(nomeAv);
    setFinal(false);
    setList(false);
    setEdit(true);
  };

  const handleSwitchChange = (index) => {
    const novosConfs = [...confs];
    novosConfs[index] = !novosConfs[index];
    setConfs(novosConfs);
  };

  const handleFinalsChange = (index) => {
    const novosFinals = [...finals];
    novosFinals[index] = !novosFinals[index];
    setFinals(novosFinals);
  };

  const handleInputChange = (index, valor) => {
    const novosValores = [...valores];
    novosValores[index] = valor;
    setValores(novosValores);
  };

  const handleSalvar = async () => {
    setLoading(true);
    try {
      avaliacoes.map(async (objeto, index) => {
        await api
          .patch(`/pessoas/aluno/boletim/avaliacao/api/v1/${objeto.id}/`, {
            nota: valores[index],
            confirmar: confs[index],
          })
          .then(function (response) {
            // handle success
            console.log(response);
          })
          .catch(function (error) {
            // handle error
            toast.error("Erro ao salvar nota!");
            console.log(error);
          });
      });
      const response = await api.get(`/pessoas/aluno/boletim/api/v1/${boletimid}/`);
      const { objetos_avaliacoes, objetos_medias, objetos_situacoes } = response.data;
      setAvaliacoes(objetos_avaliacoes);
      setMedias(objetos_medias);
      setSituacoes(objetos_situacoes);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleSalvar();
      } else {
        toast.error("Erro ao salvar as avaliações!");
        console.log("Erro ao salvar as avaliações!", error);
      }
      setLoading(false);
    }
  };

  const handleFinalizar = async () => {
    setLoading(true);
    try {
      situacoes.map(async (objeto, index) => {
        await api
          .patch(`/pessoas/aluno/boletim/situacao/api/v1/${objeto.id}/`, {
            finalizar: finals[index],
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            toast.error("Erro ao finalizar matéria!");
            console.log("Erro ao finalizar matéria!", error);
          });
      });
      const response = await api.get(`/pessoas/aluno/boletim/api/v1/${boletimid}/`);
      const { objetos_avaliacoes, objetos_medias, objetos_situacoes } = response.data;
      setAvaliacoes(objetos_avaliacoes);
      setMedias(objetos_medias);
      setSituacoes(objetos_situacoes);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleFinalizar();
      } else {
        toast.error("Erro ao finalizar matérias!");
        console.log("Erro ao finalizar matérias!", error);
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
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {list ? (
              <List
                avaliacoes={avaliacoes}
                medias={medias}
                situacoes={situacoes}
                handleOnEdit={handleOnEdit}
                handleOnFinal={handleOnFinal}
              />
            ) : (
              <></>
            )}
            {edit ? (
              <Edit
                nome={nome}
                avaliacoes={avaliacoes}
                valores={valores}
                handleInputChange={handleInputChange}
                confs={confs}
                handleSwitchChange={handleSwitchChange}
                handleSalvar={handleSalvar}
                handleOnList={handleOnList}
              />
            ) : (
              <></>
            )}
            {final ? (
              <Final
                situacoes={situacoes}
                finals={finals}
                handleFinalsChange={handleFinalsChange}
                handleFinalizar={handleFinalizar}
                handleOnList={handleOnList}
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

export default BoletimNotas;
