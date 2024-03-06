import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { api } from "services/apiClient";
import { toast } from "react-toastify";
import DiaSemana from "../DiaSemana";
import { useEffect, useState } from "react";
import { getDay, parseISO } from "date-fns";

function Agenda({ id, turma, setTurma, setLoading }) {
  const [segunda, setSegunda] = useState([]);
  const [terca, setTerca] = useState([]);
  const [quarta, setQuarta] = useState([]);
  const [quinta, setQuinta] = useState([]);
  const [sexta, setSexta] = useState([]);
  const obterDisciplinas = (dias) => {
    let dom = [],
      seg = [],
      ter = [],
      qua = [],
      qui = [],
      sex = [],
      sab = [];
    dias?.forEach((objeto) => {
      const dia_semana = getDay(parseISO(objeto.data));
      switch (dia_semana) {
        case 0:
          dom = objeto.objetos_disciplinas;
          break;
        case 1:
          seg = objeto.objetos_disciplinas;
          break;
        case 2:
          ter = objeto.objetos_disciplinas;
          break;
        case 3:
          qua = objeto.objetos_disciplinas;
          break;
        case 4:
          qui = objeto.objetos_disciplinas;
          break;
        case 5:
          sex = objeto.objetos_disciplinas;
          break;
        case 6:
          sab = objeto.objetos_disciplinas;
          break;
        default:
          break;
      }
    });
    return { dom, seg, ter, qua, qui, sex, sab };
  };
  useEffect(() => {
    const fetchDisciplinas = () => {
      setLoading(true);
      const { seg, ter, qua, qui, sex } = obterDisciplinas(
        turma?.objeto_agenda.objetos_dias.slice(0, 7)
      );
      setSegunda(seg);
      setTerca(ter);
      setQuarta(qua);
      setQuinta(qui);
      setSexta(sex);
      setLoading(false);
    };
    fetchDisciplinas();
  }, []);
  const handleIniciarAgenda = async () => {
    setLoading(true);
    try {
      await api.post("/escolas/sala/turma/agenda/api/v1/", {
        turma: turma.id,
      });
      const response = await api.get(`/escolas/sala/turma/api/v1/${turma.id}/`);
      setTurma(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao iniciar agenda da turma");
      console.log("Erro ao iniciar agenda da turma", error);
      setLoading(false);
    }
  };
  return (
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
          Agenda Escolar do {turma?.nome}
        </MDTypography>
      </MDBox>
      {turma?.objeto_agenda ? (
        <MDBox
          mx={2}
          py={3}
          px={2}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Grid container xs={12}>
            <DiaSemana dia="Segunda" disciplinas={segunda} />
            <DiaSemana dia="Terça" disciplinas={terca} />
            <DiaSemana dia="Quarta" disciplinas={quarta} />
            <DiaSemana dia="Quinta" disciplinas={quinta} />
            <DiaSemana dia="Sexta" disciplinas={sexta} />
          </Grid>
          <Grid container xs={12} justifyContent="center">
            <MDBox mr={1}>
              <Link to={`/turma/${id}/disciplinas`}>
                <MDButton variant="gradient" color="info">
                  Gerenciar Disciplinas
                </MDButton>
              </Link>
            </MDBox>
            <MDBox ml={1}>
              <Link to={"/agendaescolar"}>
                <MDButton variant="gradient" color="info">
                  Acessar Agenda
                </MDButton>
              </Link>
            </MDBox>
          </Grid>
        </MDBox>
      ) : (
        <MDBox mx={2} py={3} px={2} display="flex" justifyContent="center">
          <MDButton variant="gradient" color="success" onClick={handleIniciarAgenda}>
            Iniciar Agenda
          </MDButton>
        </MDBox>
      )}
    </Card>
  );
}

Agenda.propTypes = {
  id: PropTypes.number.isRequired,
  turma: PropTypes.object.isRequired,
  setTurma: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default Agenda;
