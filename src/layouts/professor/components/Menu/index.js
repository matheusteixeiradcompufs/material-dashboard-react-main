import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { Link } from "react-router-dom";

/**
 * Componente que exibe um menu para funcionários.
 * @module professor/components
 * @returns {JSX.Element} Componente de menu do funcionário.
 */
function Menu() {
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
          Menu do Funcionário
        </MDTypography>
      </MDBox>
      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} sm={12}>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDBox mr={1} ml={1}>
              {/* Utilize o componente Link para navegação interna */}
              <Link to={`/professor/turmas`}>
                <MDButton variant="gradient" color="secondary">
                  Turmas
                </MDButton>
              </Link>
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Menu;
