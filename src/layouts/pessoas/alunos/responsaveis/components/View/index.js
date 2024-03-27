import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function View({
  cpf,
  handleSetCpf,
  nome,
  handleSetNome,
  observacao,
  handleSetObservacao,
  handleOnEditar,
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
          Visualizar Email
        </MDTypography>
      </MDBox>
      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} sm={12}>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDInput
              type="text"
              variant="outlined"
              label="CPF"
              value={cpf}
              onChange={handleSetCpf}
              fullWidth
              disabled
            />
          </MDBox>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDInput
              type="text"
              variant="outlined"
              label="Nome"
              value={nome}
              onChange={handleSetNome}
              fullWidth
              disabled
            />
          </MDBox>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDInput
              type="text"
              variant="outlined"
              label="Observação"
              multiline
              rows={3}
              value={observacao}
              onChange={handleSetObservacao}
              fullWidth
              disabled
            />
          </MDBox>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDBox mr={1}>
              <MDButton variant="contained" color="info" onClick={handleOnEditar}>
                Modificar
              </MDButton>
            </MDBox>
            <MDBox ml={1}>
              <MDButton variant="contained" color="error" onClick={handleOnListar}>
                Voltar
              </MDButton>
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </Card>
  );
}

View.propTypes = {
  cpf: PropTypes.string.isRequired,
  handleSetCpf: PropTypes.func.isRequired,
  nome: PropTypes.string.isRequired,
  handleSetNome: PropTypes.func.isRequired,
  observacao: PropTypes.string.isRequired,
  handleSetObservacao: PropTypes.func.isRequired,
  handleOnEditar: PropTypes.func.isRequired,
  handleOnListar: PropTypes.func.isRequired,
};

export default View;
