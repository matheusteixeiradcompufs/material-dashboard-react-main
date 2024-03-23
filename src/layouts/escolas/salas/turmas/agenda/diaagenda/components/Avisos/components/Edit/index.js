import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import PropTypes from "prop-types";

function Edit({
  titulo,
  handleSetTitulo,
  texto,
  handleSetTexto,
  aviso,
  handleEditarAviso,
  handleOnViewAviso,
}) {
  return (
    <MDBox pt={3} px={2} mb={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MDInput
            variant="outlined"
            label="Título"
            type="text"
            fullWidth
            value={titulo}
            onChange={handleSetTitulo}
          />
        </Grid>
        <Grid item xs={12}>
          <MDInput
            variant="outlined"
            label="Texto"
            type="text"
            multiline
            rows={3}
            fullWidth
            value={texto}
            onChange={handleSetTexto}
          />
        </Grid>
        <Grid item xs={12}>
          <MDBox display="flex" flexDirection="row" justifyContent="center">
            <MDBox mr={1}>
              <MDButton
                variant="gradient"
                color="success"
                onClick={() => handleEditarAviso(aviso.id)}
              >
                Salvar
              </MDButton>
            </MDBox>
            <MDBox ml={1}>
              <MDButton
                variant="gradient"
                color="error"
                onClick={() => handleOnViewAviso(aviso.id)}
              >
                Cancelar
              </MDButton>
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

Edit.propTypes = {
  titulo: PropTypes.string.isRequired,
  handleSetTitulo: PropTypes.func.isRequired,
  texto: PropTypes.string.isRequired,
  handleSetTexto: PropTypes.func.isRequired,
  aviso: PropTypes.object,
  handleEditarAviso: PropTypes.func.isRequired,
  handleOnViewAviso: PropTypes.func.isRequired,
};

export default Edit;
