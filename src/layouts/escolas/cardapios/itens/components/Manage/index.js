import MDBox from "components/MDBox";
import Transfer from "../Transfer";
import MDButton from "components/MDButton";
import { Card } from "@mui/material";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function Manage({ left, setLeft, right, setRight, handleSalvar, handleOnListarItens }) {
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
          Detalhes do Item
        </MDTypography>
      </MDBox>
      <MDBox pt={3} px={2} display="flex" justifyContent="center">
        <Transfer left={left} setLeft={setLeft} right={right} setRight={setRight} />
      </MDBox>
      <MDBox pt={3} px={2} mb={2} display="flex" justifyContent="center">
        <MDBox mr={1}>
          <MDButton variant="gradient" color="success" onClick={handleSalvar}>
            Salvar
          </MDButton>
        </MDBox>
        <MDBox ml={1}>
          <MDButton variant="gradient" color="error" onClick={handleOnListarItens}>
            Cancelar
          </MDButton>
        </MDBox>
      </MDBox>
    </Card>
  );
}

Manage.propTypes = {
  left: PropTypes.array.isRequired,
  right: PropTypes.array.isRequired,
  setLeft: PropTypes.func.isRequired,
  setRight: PropTypes.func.isRequired,
  handleSalvar: PropTypes.func.isRequired,
  handleOnListarItens: PropTypes.func.isRequired,
};

export default Manage;
