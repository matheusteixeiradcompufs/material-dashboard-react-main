import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import PropTypes from "prop-types";

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

Funcao.propTypes = {
  user: PropTypes.object,
  disabled: PropTypes.bool,
  value: PropTypes.number,
  onChange: PropTypes.func,
  groups: PropTypes.array.isRequired,
};

export default Funcao;
