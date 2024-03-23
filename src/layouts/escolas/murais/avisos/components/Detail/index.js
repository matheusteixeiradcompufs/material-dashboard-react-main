import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function Detail({
  aviso,
  titulo,
  handleSetTitulo,
  texto,
  handleSetTexto,
  handleOnEditarAvisos,
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
          Detalhes do Aviso
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
              disabled
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
              disabled
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={12}>
          <MDBox pt={2} px={2} mb={2} display="flex" justifyContent="center">
            <MDBox mr={1}>
              <MDButton
                variant="contained"
                color="info"
                onClick={() => handleOnEditarAvisos(aviso.id)}
              >
                Modificar
              </MDButton>
            </MDBox>
            <MDBox ml={1}>
              <MDButton variant="contained" color="error" onClick={handleOnListarAvisos}>
                Voltar
              </MDButton>
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </Card>
  );
}

Detail.propTypes = {
  aviso: PropTypes.object.isRequired,
  titulo: PropTypes.string.isRequired,
  handleSetTitulo: PropTypes.func.isRequired,
  texto: PropTypes.string.isRequired,
  handleSetTexto: PropTypes.func.isRequired,
  handleOnEditarAvisos: PropTypes.func.isRequired,
  handleOnListarAvisos: PropTypes.func.isRequired,
};

export default Detail;
