import { Card, FormControlLabel, Switch } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function Final({ situacoes, finals, handleFinalsChange, handleFinalizar, handleOnList }) {
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
                  <Switch checked={finals[index]} onClick={() => handleFinalsChange(index)} />
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
  );
}

Final.propTypes = {
  situacoes: PropTypes.array.isRequired,
  finals: PropTypes.array.isRequired,
  handleFinalsChange: PropTypes.func.isRequired,
  handleFinalizar: PropTypes.func.isRequired,
  handleOnList: PropTypes.func.isRequired,
};

export default Final;
