import PropTypes from "prop-types";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

/**
 * Componente para exibir o Avatar de um aluno, incluindo imagem e nome.
 * @module pessoas/alunos/components
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.image - URL da imagem do aluno.
 * @param {string} props.name - Nome do aluno.
 * @returns {JSX.Element} JSX para exibir os detalhes do aluno.
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

// Definição das propriedades requeridas pelo componente
Aluno.propTypes = {
  /** URL da imagem do aluno */
  image: PropTypes.string.isRequired,
  /** Nome do aluno */
  name: PropTypes.string.isRequired,
};

export default Aluno;
