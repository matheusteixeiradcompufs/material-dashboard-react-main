import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * Componente para exibir o menu de acesso às turmas de uma sala.
 * @module escolas/salas/components
 * @param {object} props As props do componente.
 * @param {string} props.escolaid O ID da escola.
 * @param {string} props.salaid O ID da sala.
 * @returns {JSX.Element} Componente do menu de acesso às turmas de uma sala.
 */
function Menu({ escolaid, salaid }) {
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
          Acessar Turmas da Sala
        </MDTypography>
      </MDBox>
      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} sm={12}>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDBox mr={1} ml={1}>
              <Link to={`/escola/${escolaid}/sala/${salaid}/turmas`}>
                <MDButton variant="gradient" color="secondary">
                  Acessar
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
};

export default Menu;
