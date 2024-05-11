import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import PropTypes from "prop-types";

/**
 * Componente para exibir opções de função em um grupo de rádio.
 * @module professor/components
 * @param {object} props - Propriedades do componente.
 * @param {number} props.value - Valor selecionado.
 * @param {function} props.onChange - Função de retorno de chamada para lidar com a mudança de valor.
 * @param {Array<object>} props.groups - Array de objetos representando as opções de função.
 * @param {boolean} [props.disabled=false] - Indica se o componente está desativado.
 * @returns {JSX.Element} Componente de opções de função em um grupo de rádio.
 */
function Funcao({ value, onChange, groups, disabled = false }) {
  return (
    <RadioGroup label="Função" row value={value} onChange={onChange}>
      {groups?.map((objeto, index) => (
        <FormControlLabel
          key={index}
          disabled={disabled}
          value={objeto.id}
          control={<Radio />}
          label={objeto.name}
        />
      ))}
    </RadioGroup>
  );
}

// Definição dos tipos de propriedades esperadas
Funcao.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.number,
  onChange: PropTypes.func,
  groups: PropTypes.array.isRequired,
};

export default Funcao;
