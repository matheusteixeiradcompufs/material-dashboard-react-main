import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Menu({ escolaid, salaid, turmaid }) {
  return (
    <Card>
      <MDBox
        mx={2}
        mt={-2}
        py={2}
        px={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography variant="h6" color="white">
          Opções da Turma
        </MDTypography>
      </MDBox>
      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} sm={12}>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDBox mr={1} ml={1}>
              <Link to={`/escola/${escolaid}/sala/${salaid}/turma/${turmaid}/alunos`}>
                <MDButton variant="gradient" color="secondary">
                  Alunos
                </MDButton>
              </Link>
            </MDBox>
            <MDBox mr={1} ml={1}>
              <Link to={`/escola/${escolaid}/sala/${salaid}/turma/${turmaid}/disciplinas`}>
                <MDButton variant="gradient" color="secondary">
                  Disciplinas
                </MDButton>
              </Link>
            </MDBox>
            <MDBox mr={1} ml={1}>
              <Link to={`/escola/${escolaid}/sala/${salaid}/turma/${turmaid}/agenda`}>
                <MDButton variant="gradient" color="secondary">
                  Agenda
                </MDButton>
              </Link>
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </Card>
  );
}

Menu.propTypes = {
  escolaid: PropTypes.string.isRequired,
  salaid: PropTypes.string.isRequired,
  turmaid: PropTypes.string.isRequired,
};

export default Menu;
