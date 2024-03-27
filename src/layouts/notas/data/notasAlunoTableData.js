import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import "react-toastify/dist/ReactToastify.css";

export default function data(avaliacoes, medias, situacoes) {
  const gerarLinhas = () => {
    const linhas = [];
    for (let i = 0; i < situacoes.length; i++) {
      const linha = {
        materia: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {avaliacoes[i * 6].objeto_disciplina.nome}
          </MDTypography>
        ),
        a1: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {avaliacoes[i * 6].nota}
          </MDTypography>
        ),
        a2: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {avaliacoes[i * 6 + 1].nota}
          </MDTypography>
        ),
        r1: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {avaliacoes[i * 6 + 2].nota}
          </MDTypography>
        ),
        m1: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {medias[(i * 6) / 2].valor}
          </MDTypography>
        ),
        a3: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {avaliacoes[i * 6 + 3].nota}
          </MDTypography>
        ),
        a4: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {avaliacoes[i * 6 + 4].nota}
          </MDTypography>
        ),
        r2: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {avaliacoes[i * 6 + 5].nota}
          </MDTypography>
        ),
        m2: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {medias[(i * 6) / 2 + 1].valor}
          </MDTypography>
        ),
        mg: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {medias[(i * 6) / 2 + 2].valor}
          </MDTypography>
        ),
        situacao: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {situacoes[i].situacao}
          </MDTypography>
        ),
      };
      linhas.push(linha);
    }
    linhas.push({
      materia: "",
      a1: (
        <MDButton variant="gradient" color="info" size="small">
          editar
        </MDButton>
      ),
      a2: (
        <MDButton variant="gradient" color="info" size="small">
          editar
        </MDButton>
      ),
      r1: (
        <MDButton variant="gradient" color="info" size="small">
          editar
        </MDButton>
      ),
      m1: "",
      a3: (
        <MDButton variant="gradient" color="info" size="small">
          editar
        </MDButton>
      ),
      a4: (
        <MDButton variant="gradient" color="info" size="small">
          editar
        </MDButton>
      ),
      r2: (
        <MDButton variant="gradient" color="info" size="small">
          editar
        </MDButton>
      ),
      m2: "",
      mg: "",
      situacao: "",
    });
    return linhas;
  };
  return {
    colunas: [
      { Header: "matéria", accessor: "materia", width: "20%", align: "left" },
      { Header: "a1", accessor: "a1", align: "center" },
      { Header: "a2", accessor: "a2", align: "center" },
      { Header: "r1", accessor: "r1", align: "center" },
      { Header: "m1", accessor: "m1", align: "center" },
      { Header: "a3", accessor: "a3", align: "center" },
      { Header: "a4", accessor: "a4", align: "center" },
      { Header: "r2", accessor: "r2", align: "center" },
      { Header: "m2", accessor: "m2", align: "center" },
      { Header: "mg", accessor: "mg", align: "center" },
      { Header: "situação", accessor: "situacao", align: "center" },
    ],

    linhas: gerarLinhas(),
    // linhas: [
    //   {
    //     materia: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[0].objeto_disciplina.nome}
    //       </MDTypography>
    //     ),
    //     a1: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[0].nota}
    //       </MDTypography>
    //     ),
    //     a2: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[1].nota}
    //       </MDTypography>
    //     ),
    //     r1: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[2].nota}
    //       </MDTypography>
    //     ),
    //     m1: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {medias[0].valor}
    //       </MDTypography>
    //     ),
    //     a3: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[3].nota}
    //       </MDTypography>
    //     ),
    //     a4: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[4].nota}
    //       </MDTypography>
    //     ),
    //     r2: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[5].nota}
    //       </MDTypography>
    //     ),
    //     m2: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {medias[1].valor}
    //       </MDTypography>
    //     ),
    //     mg: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {medias[2].valor}
    //       </MDTypography>
    //     ),
    //     situacao: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {situacoes[0].situacao}
    //       </MDTypography>
    //     ),
    //   },
    //   {
    //     materia: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[6].objeto_disciplina.nome}
    //       </MDTypography>
    //     ),
    //     a1: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[6].nota}
    //       </MDTypography>
    //     ),
    //     a2: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[7].nota}
    //       </MDTypography>
    //     ),
    //     r1: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[8].nota}
    //       </MDTypography>
    //     ),
    //     m1: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {medias[3].valor}
    //       </MDTypography>
    //     ),
    //     a3: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[9].nota}
    //       </MDTypography>
    //     ),
    //     a4: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[10].nota}
    //       </MDTypography>
    //     ),
    //     r2: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[11].nota}
    //       </MDTypography>
    //     ),
    //     m2: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {medias[4].valor}
    //       </MDTypography>
    //     ),
    //     mg: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {medias[5].valor}
    //       </MDTypography>
    //     ),
    //     situacao: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {situacoes[1].situacao}
    //       </MDTypography>
    //     ),
    //   },
    //   {
    //     materia: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[12].objeto_disciplina.nome}
    //       </MDTypography>
    //     ),
    //     a1: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[12].nota}
    //       </MDTypography>
    //     ),
    //     a2: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[13].nota}
    //       </MDTypography>
    //     ),
    //     r1: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[14].nota}
    //       </MDTypography>
    //     ),
    //     m1: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {medias[6].valor}
    //       </MDTypography>
    //     ),
    //     a3: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[15].nota}
    //       </MDTypography>
    //     ),
    //     a4: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[16].nota}
    //       </MDTypography>
    //     ),
    //     r2: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[17].nota}
    //       </MDTypography>
    //     ),
    //     m2: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {medias[7].valor}
    //       </MDTypography>
    //     ),
    //     mg: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {medias[8].valor}
    //       </MDTypography>
    //     ),
    //     situacao: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {situacoes[2].situacao}
    //       </MDTypography>
    //     ),
    //   },
    //   {
    //     materia: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[18].objeto_disciplina.nome}
    //       </MDTypography>
    //     ),
    //     a1: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[18].nota}
    //       </MDTypography>
    //     ),
    //     a2: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[19].nota}
    //       </MDTypography>
    //     ),
    //     r1: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[20].nota}
    //       </MDTypography>
    //     ),
    //     m1: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {medias[9].valor}
    //       </MDTypography>
    //     ),
    //     a3: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[21].nota}
    //       </MDTypography>
    //     ),
    //     a4: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[22].nota}
    //       </MDTypography>
    //     ),
    //     r2: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[23].nota}
    //       </MDTypography>
    //     ),
    //     m2: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {medias[10].valor}
    //       </MDTypography>
    //     ),
    //     mg: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {medias[11].valor}
    //       </MDTypography>
    //     ),
    //     situacao: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {situacoes[3].situacao}
    //       </MDTypography>
    //     ),
    //   },
    //   {
    //     materia: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[24].objeto_disciplina.nome}
    //       </MDTypography>
    //     ),
    //     a1: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[24].nota}
    //       </MDTypography>
    //     ),
    //     a2: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[25].nota}
    //       </MDTypography>
    //     ),
    //     r1: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[26].nota}
    //       </MDTypography>
    //     ),
    //     m1: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {medias[12].valor}
    //       </MDTypography>
    //     ),
    //     a3: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[27].nota}
    //       </MDTypography>
    //     ),
    //     a4: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[28].nota}
    //       </MDTypography>
    //     ),
    //     r2: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[29].nota}
    //       </MDTypography>
    //     ),
    //     m2: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {medias[13].valor}
    //       </MDTypography>
    //     ),
    //     mg: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {medias[14].valor}
    //       </MDTypography>
    //     ),
    //     situacao: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {situacoes[4].situacao}
    //       </MDTypography>
    //     ),
    //   },
    //   {
    //     materia: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[30].objeto_disciplina.nome}
    //       </MDTypography>
    //     ),
    //     a1: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[30].nota}
    //       </MDTypography>
    //     ),
    //     a2: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[31].nota}
    //       </MDTypography>
    //     ),
    //     r1: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[32].nota}
    //       </MDTypography>
    //     ),
    //     m1: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {medias[15].valor}
    //       </MDTypography>
    //     ),
    //     a3: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[33].nota}
    //       </MDTypography>
    //     ),
    //     a4: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[34].nota}
    //       </MDTypography>
    //     ),
    //     r2: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {avaliacoes[35].nota}
    //       </MDTypography>
    //     ),
    //     m2: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {medias[16].valor}
    //       </MDTypography>
    //     ),
    //     mg: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {medias[17].valor}
    //       </MDTypography>
    //     ),
    //     situacao: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {situacoes[5].situacao}
    //       </MDTypography>
    //     ),
    //   },
    // ],
  };
}
