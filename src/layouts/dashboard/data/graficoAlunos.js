import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "services/apiClient";

/**
 * Hook customizado para obter dados do gráfico de alunos.
 * @module dashboard/data
 * @returns {Object} Dados do gráfico de alunos.
 */
const GraficoAlunos = () => {
  const [alunos, setAlunos] = useState([]); // Estado para armazenar os dados dos alunos
  const currentYear = new Date().getFullYear(); // Obtém o ano atual

  useEffect(() => {
    /**
     * Função assíncrona para buscar dados dos alunos do servidor.
     */
    const fetchAlunos = async () => {
      try {
        const response = await api.get(`/pessoas/aluno/api/v1/`);
        setAlunos(response.data);
      } catch (error) {
        toast.error("Erro ao carregar turmas!");
        console.log("Erro ao carregar turmas!", error);
      }
    };

    fetchAlunos();

    // Função de limpeza (opcional)
    return () => {
      // Se necessário, faça a limpeza aqui
    };
  }, []);

  // Gerar os anos de 2022 até o ano atual
  const anos = Array.from({ length: currentYear - 2021 }, (_, index) => 2022 + index);

  // Contar o número de alunos para cada ano
  const dadosAlunos = anos.map(
    (ano) =>
      alunos.filter((aluno) =>
        aluno.objetos_boletins.some((boletim) => boletim.objeto_turma.ano === ano)
      ).length
  );

  return {
    graficoAlunos: {
      labels: anos.map(String),
      datasets: {
        label: "Alunos",
        data: dadosAlunos,
      },
    },
  };
};

export default GraficoAlunos;
