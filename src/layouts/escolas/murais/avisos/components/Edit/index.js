import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function Edit({
  aviso,
  titulo,
  handleSetTitulo,
  texto,
  handleSetTexto,
  handleEditar,
  handleOnViewAvisos,
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
          Editar Aviso
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
              <MDButton variant="contained" color="success" onClick={() => handleEditar(aviso.id)}>
                Salvar
              </MDButton>
            </MDBox>
            <MDBox ml={1}>
              <MDButton
                variant="contained"
                color="error"
                onClick={() => handleOnViewAvisos(aviso.id)}
              >
                Cancelar
              </MDButton>
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </Card>
  );
}

Edit.propTypes = {
  aviso: PropTypes.object.isRequired,
  titulo: PropTypes.string.isRequired,
  handleSetTitulo: PropTypes.func.isRequired,
  texto: PropTypes.string.isRequired,
  handleSetTexto: PropTypes.func.isRequired,
  handleEditar: PropTypes.func.isRequired,
  handleOnViewAvisos: PropTypes.func.isRequired,
};

export default Edit;
