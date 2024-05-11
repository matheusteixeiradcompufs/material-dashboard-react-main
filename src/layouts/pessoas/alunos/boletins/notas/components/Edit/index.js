import { Card, FormControlLabel, Switch } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

/**
 * Componente para edição de uma avaliação.
 * @module pessoas/alunos/boletins/notas/components
 * @param {object} props - Propriedades do componente.
 * @param {string} props.nome - Nome da avaliação.
 * @param {Array<object>} props.avaliacoes - Lista de avaliações.
 * @param {Array<number>} props.valores - Lista de valores das avaliações.
 * @param {Function} props.handleInputChange - Função para manipular a mudança nos valores das avaliações.
 * @param {Array<boolean>} props.confs - Lista de estados de confirmação das avaliações.
 * @param {Function} props.handleSwitchChange - Função para manipular a mudança nos estados de confirmação.
 * @param {Function} props.handleSalvar - Função para salvar as alterações.
 * @param {Function} props.handleOnList - Função para voltar à lista de avaliações.
 * @returns {JSX.Element} JSX para a edição de uma avaliação.
 */
function Edit({
  nome,
  avaliacoes,
  valores,
  handleInputChange,
  confs,
  handleSwitchChange,
  handleSalvar,
  handleOnList,
}) {
  return (
    <Card>
      <MDBox
        mx={2}
        mt={-3}
        py={3}
        px={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography variant="h6" color="white">
          Avaliação {nome}
        </MDTypography>
      </MDBox>
      <MDBox pt={2} pb={2} px={3}>
        {avaliacoes.map((avaliacao, index) => {
          if (avaliacao.nome === nome) {
            return (
              <MDBox mt={1} mb={1} key={index} display="flex" justifyContent="center">
                <MDBox mr={1}>
                  <MDInput
                    type="number"
                    label={avaliacao.objeto_disciplina.nome}
                    value={valores[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                </MDBox>
                <MDBox ml={1}>
                  <FormControlLabel
                    control={
                      <Switch checked={confs[index]} onClick={() => handleSwitchChange(index)} />
                    }
                    label="Confirmar"
                  />
                </MDBox>
              </MDBox>
            );
          } else {
            return <></>;
          }
        })}
        <MDBox mt={1} mb={1} display="flex" justifyContent="center">
          <MDBox mr={1}>
            <MDButton variant="gradient" color="success" onClick={handleSalvar}>
              Salvar
            </MDButton>
          </MDBox>
          <MDBox ml={1}>
            <MDButton variant="gradient" color="error" onClick={handleOnList}>
              Cancelar
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

Edit.propTypes = {
  nome: PropTypes.string.isRequired,
  avaliacoes: PropTypes.array.isRequired,
  valores: PropTypes.array.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  confs: PropTypes.array.isRequired,
  handleSwitchChange: PropTypes.func.isRequired,
  handleSalvar: PropTypes.func.isRequired,
  handleOnList: PropTypes.func.isRequired,
};

export default Edit;
