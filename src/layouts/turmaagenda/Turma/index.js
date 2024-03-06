import { Card, Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function Turma({ turma, date, setDate, handleCarregar }) {
  const handleDateChange = (data) => {
    setDate(data);
  };

  return (
    <Card>
      <MDBox
        mx={2}
        mt={-3}
        py={3}
        px={2}
        variant="gradient"
        bgColor="secondary"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography variant="h6" color="white">
          Turma {turma?.nome} em {turma?.ano}
        </MDTypography>
      </MDBox>
      <MDBox pt={3} px={2}>
        <Grid container justifyContent="space-between" paddingBottom={2}>
          <DatePicker
            label="Data"
            value={date}
            onChange={handleDateChange}
            align="left"
            renderInput={(params) => <MDInput {...params} />}
          />
          <MDButton variant="gradient" color="secondary" size="medium" onClick={handleCarregar}>
            Visualizar
          </MDButton>
        </Grid>
      </MDBox>
    </Card>
  );
}

Turma.propTypes = {
  turma: PropTypes.object.isRequired,
  date: PropTypes.object.isRequired,
  setDate: PropTypes.func.isRequired,
  handleCarregar: PropTypes.func.isRequired,
};

export default Turma;
