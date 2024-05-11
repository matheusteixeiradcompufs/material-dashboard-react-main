import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import PropTypes from "prop-types";

/**
 * Componente para exibir as disciplinas do dia.
 * @module escolas/salas/turmas/agenda/diaagenda/components
 * @param {Object} props - As props do componente.
 * @param {Object} props.diaAgenda - O objeto representando o dia na agenda.
 * @param {Array} props.disciplinas - Array de objetos representando as disciplinas do dia.
 * @returns {JSX.Element} Retorna o JSX para renderização.
 */
function Disciplinas({ diaAgenda, disciplinas }) {
  return (
    <MDBox pt={3} px={2} mb={2}>
      <MDBox
        mx={2}
        py={1}
        px={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography variant="h6" color="white">
          Disciplinas do dia
        </MDTypography>
      </MDBox>
      <DataTable
        table={{
          columns: [{ Header: "Disciplinas", accessor: "disciplina", align: "left" }],
          rows: diaAgenda ? disciplinas?.map((objeto) => ({ disciplina: objeto.nome })) : [],
        }}
        isSorted={false}
        entriesPerPage={false}
        showTotalEntries={false}
        noEndBorder
      />
    </MDBox>
  );
}

Disciplinas.propTypes = {
  diaAgenda: PropTypes.object,
  disciplinas: PropTypes.array.isRequired,
};

export default Disciplinas;
