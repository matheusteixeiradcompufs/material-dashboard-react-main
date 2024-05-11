import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * Componente Menu para exibir opções de navegação para uma escola.
 * @module escolas/components
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.escolaid - O ID da escola para o qual o menu está sendo exibido.
 * @returns {JSX.Element} Componente do menu.
 */
function Menu({ escolaid }) {
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
          Menu da Escola
        </MDTypography>
      </MDBox>
      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} sm={12}>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDBox mr={1} ml={1}>
              <Link to={`/escola/${escolaid}/telefones`}>
                <MDButton variant="gradient" color="secondary">
                  Telefones
                </MDButton>
              </Link>
            </MDBox>
            <MDBox mr={1} ml={1}>
              <Link to={`/escola/${escolaid}/emails`}>
                <MDButton variant="gradient" color="secondary">
                  Emails
                </MDButton>
              </Link>
            </MDBox>
            <MDBox mr={1} ml={1}>
              <Link to={`/escola/${escolaid}/salas`}>
                <MDButton variant="gradient" color="secondary">
                  Salas
                </MDButton>
              </Link>
            </MDBox>
            <MDBox mr={1} ml={1}>
              <Link to={`/escola/${escolaid}/murais`}>
                <MDButton variant="gradient" color="secondary">
                  Murais
                </MDButton>
              </Link>
            </MDBox>
            <MDBox mr={1} ml={1}>
              <Link to={`/escola/${escolaid}/cardapios`}>
                <MDButton variant="gradient" color="secondary">
                  Cardápios
                </MDButton>
              </Link>
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </Card>
  );
}

// PropTypes
Menu.propTypes = {
  /**
   * O ID da escola para o qual o menu está sendo exibido.
   */
  escolaid: PropTypes.string.isRequired,
};

export default Menu;
