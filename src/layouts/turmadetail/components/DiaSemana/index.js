import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function DiaSemana({ dia, disciplinas }) {
  return (
    <Grid item xs={12} sm={2.4}>
      <MDBox
        mx={1}
        py={1}
        px={1}
        variant="gradient"
        bgColor="primary"
        borderRadius="lg"
        coloredShadow="primary"
        justifyContent="center"
      >
        <MDTypography variant="h6" color="white" align="center">
          {dia}
        </MDTypography>
      </MDBox>
      <MDBox mx={1} py={1} px={1}>
        {disciplinas.map((disciplina, index) => (
          <MDBox
            key={index}
            mx={1}
            py={1}
            px={1}
            mb={1}
            variant="gradient"
            bgColor="secondary"
            borderRadius="lg"
            coloredShadow="secondary"
            justifyContent="center"
          >
            <MDTypography variant="h6" color="white" align="center">
              {disciplina.nome}
            </MDTypography>
          </MDBox>
        ))}
      </MDBox>
    </Grid>
  );
}

DiaSemana.propTypes = {
  dia: PropTypes.string.isRequired,
  disciplinas: PropTypes.array.isRequired,
};

export default DiaSemana;
