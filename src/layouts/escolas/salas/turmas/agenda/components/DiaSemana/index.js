import { Grid } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import PropTypes from "prop-types";

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

DiaSemana.propTypes = {
  dia: PropTypes.string.isRequired,
  disciplinas: PropTypes.array.isRequired,
};

export default DiaSemana;
