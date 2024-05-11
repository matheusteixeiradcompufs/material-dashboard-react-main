import PropTypes from "prop-types";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

/**
 * Componente Funcionario para exibir informações de um funcionário.
 * @module pessoas/funcionarios/components
 * @param {object} props - Propriedades do componente.
 * @param {string} props.image - URL da imagem do funcionário.
 * @param {string} props.name - Nome do funcionário.
 * @returns {JSX.Element} Componente Funcionario.
 */
function Funcionario({ image, name }) {
  return (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

// Definição dos tipos das propriedades
Funcionario.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Funcionario;
