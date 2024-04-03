import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import PropTypes from "prop-types";

function Funcao({ value, onChange, groups, disabled }) {
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

Funcao.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.number,
  onChange: PropTypes.func,
  groups: PropTypes.array.isRequired,
};

export default Funcao;
