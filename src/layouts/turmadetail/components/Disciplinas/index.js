import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import MDBadge from "components/MDBadge";
import { useEffect, useState } from "react";
import Transfer from "../Transfer";
import { toast } from "react-toastify";
import { api } from "services/apiClient";

function Disciplinas({ turma, setTurma, setLoading, disciplinas }) {
  const [gerenciar, setGerenciar] = useState(false);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  useEffect(() => {
    setLeft(
      disciplinas?.filter(
        (item) =>
          !turma?.objetos_disciplinas.some(
            (element) => element.id === item.id && element.nome === item.nome
          )
      )
    );
    setRight(turma?.objetos_disciplinas);
  }, []);

  const handleSalvarDisciplinas = async () => {
    setLoading(true);
    try {
      const response = await api.patch(`/escolas/sala/turma/api/v1/${turma.id}/`, {
        disciplinas: right.map((item) => item.id),
      });
      setTurma(response.data);
      setLoading(false);
      setGerenciar(false);
    } catch (error) {
      toast.error("Erro ao salvar atualizar a turma");
      console.log("Erro ao salvar atualizar a turma");
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
        bgColor="secondary"
        borderRadius="lg"
        coloredShadow="secondary"
      >
        <MDTypography variant="h6" color="white">
          Disciplinas do {turma?.nome}
        </MDTypography>
      </MDBox>
      {!gerenciar ? (
        <MDBox justifyContent="center">
          <MDBox mx={2} py={3} px={2} flexDirection="column" justifyContent="center" align="center">
            {turma?.objetos_disciplinas ? (
              turma?.objetos_disciplinas.map((objeto, index) => (
                <MDBox
                  key={index}
                  mx={1}
                  py={1}
                  px={1}
                  mb={1}
                  variant="gradient"
                  bgColor="secondary"
                  borderRadius="lg"
                  coloredShadow="secondary"
                  justifyContent="center"
                  style={{ width: 160 }}
                  align="center"
                >
                  <MDTypography variant="h6" color="white" align="center">
                    {objeto.nome}
                  </MDTypography>
                </MDBox>
              ))
            ) : (
              <MDTypography>Sem disciplinas</MDTypography>
            )}
          </MDBox>
          <MDBox mx={2} py={3} px={2} display="flex" justifyContent="center">
            <MDButton variant="gradient" color="success" onClick={() => setGerenciar(true)}>
              Gerenciar
            </MDButton>
          </MDBox>
        </MDBox>
      ) : (
        <MDBox mt={2}>
          <Transfer left={left} setLeft={setLeft} right={right} setRight={setRight} />
          <MDBox mx={2} py={3} px={2} display="flex" justifyContent="center">
            <MDBox mr={1}>
              <MDButton variant="gradient" color="success" onClick={handleSalvarDisciplinas}>
                Salvar
              </MDButton>
            </MDBox>
            <MDBox ml={1}>
              <MDButton variant="gradient" color="error" onClick={() => setGerenciar(false)}>
                Cancelar
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      )}
    </Card>
  );
}

Disciplinas.propTypes = {
  turma: PropTypes.object.isRequired,
  setTurma: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  disciplinas: PropTypes.array.isRequired,
};

export default Disciplinas;
