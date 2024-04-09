import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "services/apiClient";

const GraficoTurmas = () => {
  const [turmas, setTurmas] = useState([]);
  const currentYear = new Date().getFullYear(); // Obtém o ano atual

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const response = await api.get(`/escolas/sala/turma/api/v1/`);
        setTurmas(response.data);
      } catch (error) {
        toast.error("Erro ao carregar turmas!");
        console.log("Erro ao carregar turmas!", error);
      }
    };

    fetchTurmas();

    // Função de limpeza
    return () => {
      // Se necessário, faça a limpeza aqui
    };
  }, []);

  // Gerar os anos de 2022 até o ano atual
  const anos = Array.from({ length: currentYear - 2021 }, (_, index) => 2022 + index);

  // Contar o número de turmas para cada ano
  const dadosTurmas = anos.map((ano) => turmas.filter((objeto) => objeto.ano === ano).length);

  return {
    graficoTurmas: {
      labels: anos.map(String),
      datasets: {
        label: "Turmas",
        data: dadosTurmas,
      },
    },
  };
};

export default GraficoTurmas;
