import { Grid } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import PropTypes from "prop-types";

/**
 * Componente para exibir as disciplinas de um determinado dia da semana.y
 * @module escolas/salas/turmas/agenda/components
 * @param {Object} props - Props do componente.
 * @param {string} props.dia - O dia da semana a ser exibido.
 * @param {Array} props.disciplinas - Lista de disciplinas para o dia da semana.
 * @returns {JSX.Element} - Componente para exibir as disciplinas do dia da semana.
 */
function DiaSemana({ dia, disciplinas }) {
  return (
    <Grid item xs={2.4}>
      <DataTable
        table={{
          columns: [{ Header: dia, accessor: "dia", align: "center" }],
          rows: disciplinas.map((disciplina) => ({ dia: disciplina.nome })),
        }}
        isSorted={false}
        entriesPerPage={false}
        showTotalEntries={false}
        noEndBorder
      />
    </Grid>
  );
}

// Definição das propTypes para o componente DiaSemana
DiaSemana.propTypes = {
  /** O dia da semana a ser exibido. */
  dia: PropTypes.string.isRequired,
  /** Lista de disciplinas para o dia da semana. */
  disciplinas: PropTypes.array.isRequired,
};

export default DiaSemana;
