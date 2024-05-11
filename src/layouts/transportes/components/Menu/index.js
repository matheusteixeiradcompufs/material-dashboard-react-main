import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

/**
 * Componente para exibir o menu de opções relacionadas a um transporte.
 * @module transportes/components
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.transporteid - O ID do transporte.
 * @param {Function} props.setLoading - Função para definir o estado de carregamento.
 * @returns {JSX.Element} Componente de menu de transporte.
 */
function Menu({ transporteid, setLoading }) {
  const navigate = useNavigate();

  /**
   * Navega para a página de telefones do transporte.
   */
  const handleOnTelefones = () => {
    setLoading(true);
    navigate(`/transportes/${transporteid}/telefones`);
  };

  /**
   * Navega para a página de alunos do transporte.
   */
  const handleOnAlunos = () => {
    setLoading(true);
    navigate(`/transportes/${transporteid}/alunos`);
  };

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
          Menu do Transporte
        </MDTypography>
      </MDBox>
      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} sm={12}>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDBox mr={1} ml={1}>
              <MDButton variant="gradient" color="secondary" onClick={handleOnTelefones}>
                Telefones
              </MDButton>
            </MDBox>
            <MDBox mr={1} ml={1}>
              <MDButton variant="gradient" color="secondary" onClick={handleOnAlunos}>
                Alunos
              </MDButton>
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </Card>
  );
}

// Tipagem das propriedades do componente
Menu.propTypes = {
  transporteid: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default Menu;
