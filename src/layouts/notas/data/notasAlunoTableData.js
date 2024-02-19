import { Switch } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { toast } from "react-toastify";
import { api } from "services/apiClient";
import "react-toastify/dist/ReactToastify.css";

export default function data(diasletivos, loadBoletim) {
  const formatarData = (dataString) => {
    const data = new Date(dataString);
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };
  const handleExcluir = async (dialetivoid) => {
    try {
      await api.delete(`/pessoas/aluno/frequencia/dialetivo/api/v1/${dialetivoid}/`);
      loadBoletim();
    } catch (error) {
      toast.error("Erro ao excluir presença!");
      console.error("Erro ao excluir dia letivo:", error);
    }
  };
  diasletivos.sort((a, b) => new Date(b.data) - new Date(a.data));
  return {
    colunas: [
      { Header: "dia letivo", accessor: "dialetivo", width: "60%", align: "left" },
      { Header: "presença", accessor: "presenca", align: "center" },
      { Header: "", accessor: "excluir", align: "center" },
    ],

    linhas: (diasletivos || []).map((dialetivo, index) => ({
      dialetivo: (
        <MDTypography key={index} variant="caption" color="text" fontWeight="medium">
          {formatarData(dialetivo.data)}
        </MDTypography>
      ),
      presenca: <Switch checked={dialetivo.presenca} />,
      excluir: (
        <MDBox ml={-1}>
          <MDButton
            variant="gradient"
            color="error"
            size="small"
            onClick={() => handleExcluir(dialetivo.id)}
          >
            excluir
          </MDButton>
        </MDBox>
      ),
    })),
  };
}
