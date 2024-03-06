import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function Detail({ turma }) {
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
          Turma {turma?.nome}
        </MDTypography>
      </MDBox>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <MDBox mx={2} py={3} px={2} display="flex">
            <MDTypography variant="subtitle2">Turno: {turma?.turno}</MDTypography>
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={6}>
          <MDBox mx={2} py={3} px={2} display="flex">
            <MDTypography variant="subtitle2">Ano: {turma?.ano}</MDTypography>
          </MDBox>
        </Grid>
      </Grid>
    </Card>
  );
}

Detail.propTypes = {
  turma: PropTypes.object.isRequired,
};

export default Detail;
