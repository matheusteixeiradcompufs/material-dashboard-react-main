import { Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import PropTypes from "prop-types";

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
