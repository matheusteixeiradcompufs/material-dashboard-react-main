import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "services/apiClient";

/**
 * Hook customizado para obter dados do gráfico de turmas.
 * @module dashboard/data
 * @returns {Object} Dados do gráfico de turmas.
 */
const GraficoTurmas = () => {
  const [turmas, setTurmas] = useState([]); // Estado para armazenar os dados das turmas
  const currentYear = new Date().getFullYear(); // Obtém o ano atual

  useEffect(() => {
    /**
     * Função assíncrona para buscar dados das turmas do servidor.
     */
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

    // Função de limpeza (opcional)
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
