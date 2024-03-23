import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import Transfer from "../Transfer";
import MDButton from "components/MDButton";

function Manage({
  turma,
  left,
  setLeft,
  right,
  setRight,
  handleSalvarDisciplinas,
  handleOnListar,
}) {
  return (
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
          Disciplinas do {turma?.nome}
        </MDTypography>
      </MDBox>
      <MDBox mt={2} px={2}>
        <Transfer left={left} setLeft={setLeft} right={right} setRight={setRight} />
        <MDBox mx={2} py={3} px={2} display="flex" justifyContent="center">
          <MDBox mr={1}>
            <MDButton variant="gradient" color="success" onClick={handleSalvarDisciplinas}>
              Salvar
            </MDButton>
          </MDBox>
          <MDBox ml={1}>
            <MDButton variant="gradient" color="error" onClick={handleOnListar}>
              Cancelar
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

Manage.propTypes = {
  turma: PropTypes.object.isRequired,
  left: PropTypes.array.isRequired,
  right: PropTypes.array.isRequired,
  setLeft: PropTypes.func.isRequired,
  setRight: PropTypes.func.isRequired,
  handleSalvarDisciplinas: PropTypes.func.isRequired,
  handleOnListar: PropTypes.func.isRequired,
};

export default Manage;
