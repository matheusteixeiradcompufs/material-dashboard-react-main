import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import PropTypes from "prop-types";

/**
 * Componente para visualizar um aviso.
 * @module escolas/salas/turmas/agenda/diaagenda/components/Avisos/components
 * @param {ViewProps} props - Propriedades do componente.
 * @returns {JSX.Element} Componente de visualização de aviso.
 */

/**
 * Propriedades esperadas pelo componente de visualização de aviso.
 * @typedef {Object} ViewProps
 * @property {string} titulo - O título do aviso.
 * @property {Function} handleSetTitulo - Função para definir o título do aviso.
 * @property {string} texto - O texto do aviso.
 * @property {Function} handleSetTexto - Função para definir o texto do aviso.
 * @property {Function} handleOnEditAviso - Função para modificar um aviso.
 * @property {Function} handleOffAdd - Função para cancelar a operação de visualização ou modificação de um aviso.
 */
function View({ titulo, handleSetTitulo, texto, handleSetTexto, handleOnEditAviso, handleOffAdd }) {
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
            disabled
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
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <MDBox display="flex" flexDirection="row" justifyContent="center">
            <MDBox mr={1}>
              <MDButton variant="gradient" color="warning" onClick={handleOnEditAviso}>
                Modificar
              </MDButton>
            </MDBox>
            <MDBox ml={1}>
              <MDButton variant="gradient" color="error" onClick={handleOffAdd}>
                Cancelar
              </MDButton>
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

View.propTypes = {
  titulo: PropTypes.string.isRequired,
  handleSetTitulo: PropTypes.func.isRequired,
  texto: PropTypes.string.isRequired,
  handleSetTexto: PropTypes.func.isRequired,
  handleOnEditAviso: PropTypes.func.isRequired,
  handleOffAdd: PropTypes.func.isRequired,
};

export default View;
