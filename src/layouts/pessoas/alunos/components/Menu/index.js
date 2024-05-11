import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * Componente que representa o menu de opções para um aluno.
 * @module pessoas/alunos/components
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.alunoid - ID do aluno para o qual o menu está sendo exibido.
 * @returns {JSX.Element} JSX para o menu do aluno.
 */
function Menu({ alunoid }) {
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
          Menu do Aluno
        </MDTypography>
      </MDBox>
      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} sm={12}>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDBox mr={1} ml={1}>
              <Link to={`/pessoas/aluno/${alunoid}/telefones`}>
                <MDButton variant="gradient" color="secondary">
                  Telefones
                </MDButton>
              </Link>
            </MDBox>
            <MDBox mr={1} ml={1}>
              <Link to={`/pessoas/aluno/${alunoid}/emails`}>
                <MDButton variant="gradient" color="secondary">
                  Emails
                </MDButton>
              </Link>
            </MDBox>
            <MDBox mr={1} ml={1}>
              <Link to={`/pessoas/aluno/${alunoid}/responsaveis`}>
                <MDButton variant="gradient" color="secondary">
                  Responsáveis
                </MDButton>
              </Link>
            </MDBox>
            <MDBox mr={1} ml={1}>
              <Link to={`/pessoas/aluno/${alunoid}/boletins`}>
                <MDButton variant="gradient" color="secondary">
                  Matrículas
                </MDButton>
              </Link>
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </Card>
  );
}

// Definição das propriedades requeridas pelo componente
Menu.propTypes = {
  /** ID do aluno para o qual o menu está sendo exibido */
  alunoid: PropTypes.string.isRequired,
};

export default Menu;
