import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { format } from "date-fns";

/**
 * Componente para exibir dados pessoais, como CPF, data de nascimento, endereço e formação.
 * @module perfil/components
 * @param {Object} props - As propriedades do componente.
 * @param {string} props.cpf - O CPF do usuário.
 * @param {string} props.dataNascimento - A data de nascimento do usuário.
 * @param {string} props.endereco - O endereço do usuário.
 * @param {string} props.formacao - A formação do usuário.
 * @returns {JSX.Element} O componente React para renderizar.
 */
function DadosPessoais({ cpf, dataNascimento, endereco, formacao }) {
  /**
   * Formata a data para o formato "dd/MM/yyyy".
   * @param {string} date - A data a ser formatada.
   * @returns {string} A data formatada.
   */
  const formatarData = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    newDate.setHours(0);
    return format(newDate, "dd/MM/yyyy");
  };

  return (
    <Card sx={{ boxShadow: "none" }}>
      <MDBox p={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          dados pessoais
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2} lineHeight={1.25}>
        <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
          gerais
        </MDTypography>
        <MDBox display="flex" alignItems="top" mb={0.5} ml={-1.5} mt={2}>
          <MDBox px={1.5} py={1}>
            <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
              CPF:
            </MDTypography>
          </MDBox>
          <MDBox display="flex" justifyContent="flex-end" width="80%" ml={1.5} py={1.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              {cpf}
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="top" mb={0.5} ml={-1.5}>
          <MDBox px={1.5} py={1}>
            <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
              Nascimento:
            </MDTypography>
          </MDBox>
          <MDBox display="flex" justifyContent="flex-end" width="80%" ml={0.5} py={1.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              {formatarData(dataNascimento)}
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="top" mb={0.5} ml={-1.5}>
          <MDBox px={1.5} py={1}>
            <MDTypography
              variant="button"
              alignItems="top"
              fontWeight="bold"
              textTransform="capitalize"
            >
              Endereço:
            </MDTypography>
          </MDBox>
          <MDBox display="flex" justifyContent="flex-end" width="80%" ml={0.5} py={1.5}>
            <MDTypography variant="button" fontWeight="regular" color="text" textAlign="justify">
              {endereco}
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="top" mb={0.5} ml={-1.5}>
          <MDBox px={1.5} py={1}>
            <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
              Formação:
            </MDTypography>
          </MDBox>
          <MDBox display="flex" justifyContent="flex-end" width="80%" ml={0.5} py={1.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              {formacao}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

/**
 * Propriedades padrão do componente.
 * @memberof DadosPessoais
 * @property {string} cpf - O CPF do usuário.
 * @property {string} dataNascimento - A data de nascimento do usuário.
 * @property {string} endereco - O endereço do usuário.
 * @property {string} formacao - A formação do usuário.
 */
DadosPessoais.defaultProps = {
  cpf: "",
  dataNascimento: "",
  endereco: "",
  formacao: "",
};

/**
 * Tipos esperados das propriedades do componente.
 * @memberof DadosPessoais
 * @property {string} cpf - O CPF do usuário.
 * @property {string} dataNascimento - A data de nascimento do usuário.
 * @property {string} endereco - O endereço do usuário.
 * @property {string} formacao - A formação do usuário.
 */
DadosPessoais.propTypes = {
  cpf: PropTypes.string,
  dataNascimento: PropTypes.string,
  endereco: PropTypes.string,
  formacao: PropTypes.string,
};

export default DadosPessoais;
