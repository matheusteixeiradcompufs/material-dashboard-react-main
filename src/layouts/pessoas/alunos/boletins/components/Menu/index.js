import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Menu({ alunoid, boletimid }) {
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
          Acessar Opções da Matrícula
        </MDTypography>
      </MDBox>
      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} sm={12}>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDBox mr={1} ml={1}>
              <Link to={`/pessoas/aluno/${alunoid}/boletim/${boletimid}/frequencia`}>
                <MDButton variant="gradient" color="secondary">
                  Frequência
                </MDButton>
              </Link>
            </MDBox>
            <MDBox mr={1} ml={1}>
              <Link to={`/pessoas/aluno/${alunoid}/boletim/${boletimid}/notas`}>
                <MDButton variant="gradient" color="secondary">
                  Notas
                </MDButton>
              </Link>
            </MDBox>
            <MDBox mr={1} ml={1}>
              <Link to={`/pessoas/aluno/${alunoid}/boletim/${boletimid}/recados`}>
                <MDButton variant="gradient" color="secondary">
                  Recados
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
  alunoid: PropTypes.string.isRequired,
  boletimid: PropTypes.string.isRequired,
};

export default Menu;
