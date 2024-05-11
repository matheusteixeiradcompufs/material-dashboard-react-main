import PropTypes from "prop-types";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

/**
 * Componente para exibir o Avatar do aluno, incluindo imagem e nome.
 * @module transportes/alunos/components
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.image - URL da imagem do aluno.
 * @param {string} props.name - Nome do aluno.
 * @returns {JSX.Element} Componente de aluno.
 */
function Aluno({ image, name }) {
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

/**
 * Propriedades esperadas para o componente Aluno.
 * @type {Object}
 * @property {string} image - URL da imagem do aluno.
 * @property {string} name - Nome do aluno.
 */
Aluno.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Aluno;
