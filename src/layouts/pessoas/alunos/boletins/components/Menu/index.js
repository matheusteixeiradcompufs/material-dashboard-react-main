import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * Componente de menu para acessar opções da matrícula de um aluno.
 * @module pessoas/alunos/boletins/components
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.alunoid - ID do aluno.
 * @param {string} props.boletimid - ID do boletim do aluno.
 * @returns {JSX.Element} JSX para o menu de opções da matrícula.
 */
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
            {/* Links para diferentes opções da matrícula */}
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

// Prop types do componente
Menu.propTypes = {
  /** ID do aluno */
  alunoid: PropTypes.string.isRequired,
  /** ID do boletim do aluno */
  boletimid: PropTypes.string.isRequired,
};

export default Menu;
