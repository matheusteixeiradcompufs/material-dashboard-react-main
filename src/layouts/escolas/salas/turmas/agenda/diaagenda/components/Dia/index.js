import { Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import PropTypes from "prop-types";

/**
 * Componente para selecionar uma data e carregar os dados correspondentes.
 * @module escolas/salas/turmas/agenda/diaagenda/components
 * @param {Object} props - As props do componente.
 * @param {Object} props.selectedDate - A data selecionada.
 * @param {Function} props.handleDateChange - Função para lidar com a mudança de data.
 * @param {Function} props.handleCarregar - Função para carregar os dados correspondentes à data selecionada.
 * @returns {JSX.Element} Retorna o JSX para renderização.
 */
function Dia({ selectedDate, handleDateChange, handleCarregar }) {
  return (
    <MDBox pt={3} px={2}>
      <Grid container justifyContent="center" paddingBottom={2}>
        <MDBox mr={1}>
          <DatePicker
            label="Data"
            value={selectedDate}
            onChange={handleDateChange}
            align="left"
            renderInput={(params) => <MDInput {...params} />}
          />
        </MDBox>
        <MDBox ml={1}>
          <MDButton variant="gradient" color="secondary" size="medium" onClick={handleCarregar}>
            Carregar
          </MDButton>
        </MDBox>
      </Grid>
    </MDBox>
  );
}

Dia.propTypes = {
  selectedDate: PropTypes.object,
  handleDateChange: PropTypes.func.isRequired,
  handleCarregar: PropTypes.func.isRequired,
};

export default Dia;
