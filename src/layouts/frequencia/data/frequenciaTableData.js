import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function data(turma) {
  const baseUrl = "http://127.0.0.1:8000";
  const Aluno = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={baseUrl + image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  Aluno.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };

  return {
    colunas: [
      { Header: "aluno", accessor: "aluno", width: "45%", align: "left" },
      { Header: "presenças", accessor: "presencas", align: "center" },
      { Header: "ausências", accessor: "ausencias", align: "center" },
      { Header: "percentual", accessor: "percentual", align: "center" },
      { Header: "", accessor: "view", align: "center" },
    ],

    linhas: (turma.objetos_boletins || []).map((boletim, index) => ({
      aluno: (
        <Aluno
          image={boletim.objeto_aluno.retrato}
          name={`${boletim.objeto_aluno.objeto_usuario.first_name} ${boletim.objeto_aluno.objeto_usuario.last_name}`}
        />
      ),
      presencas: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {
            boletim.objeto_frequencia.objetos_diasletivos.filter((objeto) => {
              return objeto.presenca;
            }).length
          }
        </MDTypography>
      ),
      ausencias: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {
            boletim.objeto_frequencia.objetos_diasletivos.filter((objeto) => {
              return !objeto.presenca;
            }).length
          }
        </MDTypography>
      ),
      percentual: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {boletim.objeto_frequencia.percentual}%
        </MDTypography>
      ),
      view: (
        <MDBox ml={-1} key={index}>
          <Link to={`/frequencia/aluno/${boletim.id}`}>
            <MDButton variant="gradient" color="info" size="small">
              Visualizar
            </MDButton>
          </Link>
        </MDBox>
      ),
    })),
  };
}
