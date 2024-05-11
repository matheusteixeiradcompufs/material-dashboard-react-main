import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import PropTypes from "prop-types";

/**
 * Componente para exibir opções de função em um grupo de rádio.
 * @module pessoas/funcionarios/components
 * @param {object} props - Propriedades do componente.
 * @param {object} props.user - Objeto representando o usuário.
 * @param {boolean} props.disabled - Indica se as opções estão desabilitadas.
 * @param {number} props.value - Valor selecionado.
 * @param {function} props.onChange - Manipulador de evento de mudança de seleção.
 * @param {Array<object>} props.groups - Lista de grupos de função disponíveis.
 * @returns {JSX.Element} Componente de seleção de função.
 */
function Funcao({ user, value, onChange, groups, disabled }) {
  const isSuperUser = user.is_superuser;
  const userGroup = user.grupo;

  return (
    <RadioGroup label="Função" row value={value} onChange={onChange}>
      {groups?.map((objeto, index) => {
        let radioDisabled = disabled;

        if (!isSuperUser) {
          if (userGroup === "Diretor" && objeto.name === "Diretor") {
            radioDisabled = true;
          } else if (
            userGroup === "Coordenador" &&
            (objeto.name === "Diretor" || objeto.name === "Coordenador")
          ) {
            radioDisabled = true;
          }
        }
        return (
          <FormControlLabel
            key={index}
            disabled={radioDisabled || disabled}
            value={objeto.id}
            control={<Radio />}
            label={objeto.name}
          />
        );
      })}
    </RadioGroup>
  );
}

// Definição dos tipos das propriedades
Funcao.propTypes = {
  user: PropTypes.object,
  disabled: PropTypes.bool,
  value: PropTypes.number,
  onChange: PropTypes.func,
  groups: PropTypes.array.isRequired,
};

export default Funcao;
