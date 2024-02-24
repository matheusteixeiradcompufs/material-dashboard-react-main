import { Card, Divider, Icon, TextareaAutosize, Tooltip } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "services/apiClient";
import { format } from "date-fns";
import theme from "assets/theme";

function Aviso({ date, dia, onCarregar, setLoadingVar }) {
  const [textAviso, setTextAviso] = useState("");
  const [titleAviso, setTitleAviso] = useState("");

  const handleChangeTextAviso = (event) => {
    setTextAviso(event.target.value);
  };

  const handleChangeTitleAviso = (event) => {
    setTitleAviso(event.target.value);
  };

  const handleCarregar = async () => {
    onCarregar();
  };

  const setLoading = (value) => {
    setLoadingVar(value);
  };

  const handleAddAviso = async () => {
    setLoading(true);
    try {
      await api.post("/escolas/sala/turma/agenda/dia/aviso/api/v1/", {
        titulo: titleAviso,
        texto: textAviso,
        diaAgenda: dia.id,
      });
      await handleCarregar();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao inserir aviso!");
      console.error("Erro ao inserir aviso:", error);
      setLoading(false);
    }
  };

  const handleExcluirAviso = async (avisoid) => {
    setLoading(true);
    try {
      await api.delete(`/escolas/sala/turma/agenda/dia/aviso/api/v1/${avisoid}/`);
      await handleCarregar();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao excluir aviso!");
      console.error("Erro ao excluir aviso:", error);
      setLoading(false);
    }
  };
  return (
    <Card>
      <MDBox
        mx={2}
        mt={-3}
        py={3}
        px={2}
        variant="gradient"
        bgColor="primary"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography variant="h6" color="white">
          Avisos do dia {format(date, "dd/MM/yyyy")}
        </MDTypography>
      </MDBox>
      {dia.objetos_avisos &&
        dia.objetos_avisos.map((objeto, index) => (
          <AvisoDetail
            key={index}
            title={objeto.titulo}
            label="Excluir Aviso"
            description={objeto.texto}
            route=""
            onExcluirAviso={() => handleExcluirAviso(objeto.id)}
          />
        ))}
      <MDBox display="flex" flexDirection="column" pt={2} px={2}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
          <MDInput
            label="Título do Aviso"
            value={titleAviso}
            onChange={handleChangeTitleAviso}
            fullWidth
          />
        </MDBox>
        <MDBox p={2}>
          <MDBox mb={2} lineHeight={1}>
            <TextareaAutosize
              minRows={3}
              aria-label="Digite aqui o texto do aviso"
              placeholder="Digite aqui o texto do aviso"
              value={textAviso}
              onChange={handleChangeTextAviso}
              style={{
                color: "#495057",
                width: "100%",
                padding: 10,
                paddingTop: 14,
                paddingBottom: 14,
                borderRadius: 6,
                fontSize: 14.5,
                borderColor: "#ced4da",
                borderWidth: 1,
                borderStyle: "solid",
                outlineColor: theme.palette.info.main,
              }}
            />
          </MDBox>
          <MDBox>
            <MDButton
              variant="gradient"
              color="success"
              size="medium"
              onClick={handleAddAviso}
              fullWidth
            >
              Adicionar Aviso
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

function AvisoDetail({ title, label, description, route, onExcluirAviso }) {
  const handleExcluir = () => {
    // Aqui você pode adicionar alguma lógica adicional antes de chamar a função de exclusão, se necessário
    onExcluirAviso();
  };
  return (
    <MDBox display="flex" flexDirection="column" pt={2} px={2}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
        <MDTypography component={Link} to={route} variant="body2" color="secondary">
          <Tooltip onClick={handleExcluir} title={label} placement="top">
            <Icon>delete_forever</Icon>
          </Tooltip>
        </MDTypography>
      </MDBox>
      <MDBox p={2} fullwidth>
        <MDBox mb={2} lineHeight={1} fullwidth>
          <MDTypography variant="button" color="text" fontWeight="light">
            {description}
          </MDTypography>
        </MDBox>
        <MDBox opacity={0.3}>
          <Divider />
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

AvisoDetail.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  onExcluirAviso: PropTypes.func.isRequired,
};

Aviso.propTypes = {
  date: PropTypes.object.isRequired,
  dia: PropTypes.object.isRequired,
  onCarregar: PropTypes.func.isRequired,
  setLoadingVar: PropTypes.func.isRequired,
};

export { Aviso };
