import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function Add({
  titulo,
  handleSetTitulo,
  texto,
  handleSetTexto,
  handleSalvar,
  handleOnListarAvisos,
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
          Inserir Novo Aviso
        </MDTypography>
      </MDBox>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <MDBox pt={3} px={2}>
            <MDInput
              variant="outlined"
              label="Título"
              value={titulo}
              onChange={handleSetTitulo}
              fullWidth
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={12}>
          <MDBox pt={3} px={2}>
            <MDInput
              variant="outlined"
              label="Texto"
              multiline
              rows={5}
              value={texto}
              onChange={handleSetTexto}
              fullWidth
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={12}>
          <MDBox pt={2} px={2} mb={2} display="flex" justifyContent="center">
            <MDBox mr={1}>
              <MDButton variant="contained" color="success" onClick={handleSalvar}>
                Salvar
              </MDButton>
            </MDBox>
            <MDBox ml={1}>
              <MDButton variant="contained" color="error" onClick={handleOnListarAvisos}>
                Cancelar
              </MDButton>
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </Card>
  );
}

Add.propTypes = {
  titulo: PropTypes.string.isRequired,
  handleSetTitulo: PropTypes.func.isRequired,
  texto: PropTypes.string.isRequired,
  handleSetTexto: PropTypes.func.isRequired,
  handleSalvar: PropTypes.func.isRequired,
  handleOnListarAvisos: PropTypes.func.isRequired,
};

export default Add;
