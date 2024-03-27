import React, { useEffect, useState } from "react";
import { Card, FormControlLabel, Grid, Icon, Switch } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DataTable from "examples/Tables/DataTable";
import { useParams } from "react-router-dom";
import MDButton from "components/MDButton";
import { api } from "services/apiClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Audio } from "react-loader-spinner";
import MDInput from "components/MDInput";

function BoletimNotas() {
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
        toast.error("Erro ao carregar boletim");
        console.error("Erro ao carregar boletim:", error);
        setLoading(false);
      }
    };
    fetchBoletim();
  }, []);

  const columns = [
    { Header: "matéria", accessor: "materia", width: "20%", align: "left" },
    { Header: "a1", accessor: "a1", align: "center" },
    { Header: "a2", accessor: "a2", align: "center" },
    { Header: "r1", accessor: "r1", align: "center" },
    { Header: "m1", accessor: "m1", align: "center" },
    { Header: "a3", accessor: "a3", align: "center" },
    { Header: "a4", accessor: "a4", align: "center" },
    { Header: "r2", accessor: "r2", align: "center" },
    { Header: "m2", accessor: "m2", align: "center" },
    { Header: "mg", accessor: "mg", align: "center" },
    { Header: "situação", accessor: "situacao", align: "center" },
  ];

  const gerarLinhas = () => {
    const linhas = [];
    for (let i = 0; i < situacoes.length; i++) {
      const linha = {
        materia: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {avaliacoes[i * 6].objeto_disciplina.nome}
          </MDTypography>
        ),
        a1: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {avaliacoes[i * 6].nota.toFixed(1)}
          </MDTypography>
        ),
        a2: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {avaliacoes[i * 6 + 1].nota.toFixed(1)}
          </MDTypography>
        ),
        r1: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {avaliacoes[i * 6 + 2].nota.toFixed(1)}
          </MDTypography>
        ),
        m1: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {medias[(i * 6) / 2].valor.toFixed(1)}
          </MDTypography>
        ),
        a3: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {avaliacoes[i * 6 + 3].nota.toFixed(1)}
          </MDTypography>
        ),
        a4: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {avaliacoes[i * 6 + 4].nota.toFixed(1)}
          </MDTypography>
        ),
        r2: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {avaliacoes[i * 6 + 5].nota.toFixed(1)}
          </MDTypography>
        ),
        m2: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {medias[(i * 6) / 2 + 1].valor.toFixed(1)}
          </MDTypography>
        ),
        mg: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {medias[(i * 6) / 2 + 2].valor.toFixed(1)}
          </MDTypography>
        ),
        situacao: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {situacoes[i].situacao}
          </MDTypography>
        ),
      };
      linhas.push(linha);
    }
    linhas.push({
      materia: "",
      a1: (
        <MDButton
          variant="gradient"
          color="info"
          title="Editar 1ª Avaliação"
          size="small"
          onClick={() => handleOnEdit("A1")}
          iconOnly
        >
          <Icon>edit</Icon>
        </MDButton>
      ),
      a2: (
        <MDButton
          variant="gradient"
          color="info"
          title="Editar 2ª Avaliação"
          size="small"
          onClick={() => handleOnEdit("A2")}
          iconOnly
        >
          <Icon>edit</Icon>
        </MDButton>
      ),
      r1: (
        <MDButton
          variant="gradient"
          color="info"
          title="Editar 1ª Recuperação"
          size="small"
          onClick={() => handleOnEdit("R1")}
          iconOnly
        >
          <Icon>edit</Icon>
        </MDButton>
      ),
      m1: "",
      a3: (
        <MDButton
          variant="gradient"
          color="info"
          title="Editar 3ª Avaliação"
          size="small"
          onClick={() => handleOnEdit("A3")}
          iconOnly
        >
          <Icon>edit</Icon>
        </MDButton>
      ),
      a4: (
        <MDButton
          variant="gradient"
          color="info"
          title="Editar 4ª Avaliação"
          size="small"
          onClick={() => handleOnEdit("A4")}
          iconOnly
        >
          <Icon>edit</Icon>
        </MDButton>
      ),
      r2: (
        <MDButton
          variant="gradient"
          color="info"
          title="Editar 2ª Recuperação"
          size="small"
          onClick={() => handleOnEdit("R2")}
          iconOnly
        >
          <Icon>edit</Icon>
        </MDButton>
      ),
      m2: "",
      mg: "",
      situacao: (
        <MDButton
          variant="gradient"
          color="info"
          title="Finalizar Matérias"
          size="small"
          onClick={handleOnFinal}
          iconOnly
        >
          <Icon>edit</Icon>
        </MDButton>
      ),
    });
    return linhas;
  };

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
      toast.error("Erro ao salvar as avaliações!");
      console.log("Erro ao salvar as avaliações!", error);
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
      toast.error("Erro ao finalizar matérias!");
      console.log("Erro ao finalizar matérias!", error);
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
            {list ? (
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
                    Notas do Aluno
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns, rows: gerarLinhas() }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            ) : (
              <></>
            )}
            {edit ? (
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
                    Avaliação {nome}
                  </MDTypography>
                </MDBox>
                <MDBox pt={2} pb={2} px={3}>
                  {avaliacoes.map((avaliacao, index) => {
                    if (avaliacao.nome === nome) {
                      return (
                        <MDBox mt={1} mb={1} key={index} display="flex" justifyContent="center">
                          <MDBox mr={1}>
                            <MDInput
                              type="number"
                              label={avaliacao.objeto_disciplina.nome}
                              value={valores[index]}
                              onChange={(e) => handleInputChange(index, e.target.value)}
                            />
                          </MDBox>
                          <MDBox ml={1}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={confs[index]}
                                  onClick={() => handleSwitchChange(index)}
                                />
                              }
                              label="Confirmar"
                            />
                          </MDBox>
                        </MDBox>
                      );
                    } else {
                      return <></>;
                    }
                  })}
                  <MDBox mt={1} mb={1} display="flex" justifyContent="center">
                    <MDBox mr={1}>
                      <MDButton variant="gradient" color="success" onClick={handleSalvar}>
                        Salvar
                      </MDButton>
                    </MDBox>
                    <MDBox ml={1}>
                      <MDButton variant="gradient" color="error" onClick={handleOnList}>
                        Cancelar
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </MDBox>
              </Card>
            ) : (
              <></>
            )}
            {final ? (
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
                    Finalizar Matérias
                  </MDTypography>
                </MDBox>
                <MDBox pt={2} pb={2} px={3}>
                  {situacoes.map((situacao, index) => (
                    <MDBox mt={1} mb={1} key={index} display="flex" justifyContent="center">
                      <MDBox mr={1}>
                        <MDInput
                          type="text"
                          label={situacao.objeto_disciplina.nome}
                          value={situacao.situacao}
                          disabled
                        />
                      </MDBox>
                      <MDBox ml={1}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={finals[index]}
                              onClick={() => handleFinalsChange(index)}
                            />
                          }
                          label="Finalizar"
                        />
                      </MDBox>
                    </MDBox>
                  ))}
                  <MDBox mt={1} mb={1} display="flex" justifyContent="center">
                    <MDBox mr={1}>
                      <MDButton variant="gradient" color="success" onClick={handleFinalizar}>
                        Salvar
                      </MDButton>
                    </MDBox>
                    <MDBox ml={1}>
                      <MDButton variant="gradient" color="error" onClick={handleOnList}>
                        Cancelar
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </MDBox>
              </Card>
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
