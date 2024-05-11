import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * Componente Menu para exibir o menu de opções de um funcionário.
 * @module pessoas/funcionarios/components
 * @param {object} props - Propriedades do componente.
 * @param {string} props.funcionarioid - O ID do funcionário para o qual o menu está sendo exibido.
 * @returns {JSX.Element} Componente Menu.
 */
function Menu({ funcionarioid }) {
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
          Menu do Funcionario
        </MDTypography>
      </MDBox>
      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} sm={12}>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDBox mr={1} ml={1}>
              {/* Link para a página de turmas do funcionário */}
              <Link to={`/pessoas/funcionario/${funcionarioid}/turmas`}>
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

// Definição dos tipos das propriedades
Menu.propTypes = {
  funcionarioid: PropTypes.string.isRequired,
};

export default Menu;
