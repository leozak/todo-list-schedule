import React, { useEffect, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";

import { api } from "../../services/api";

interface HelthCheckResponse {
  status: string;
  message: string;
}

interface ServerGuardProps {
  children: ReactNode;
}

const ServerGuard: React.FC<ServerGuardProps> = ({ children }) => {
  const [dots, setDots] = useState<string>("");

  const { isError, isLoading, isSuccess } = useQuery<HelthCheckResponse>({
    queryKey: ["server-health"],
    queryFn: async () => {
      const { data } = await api.get<HelthCheckResponse>("/");

      // Verifica se o servidor está online
      if (data.status !== "online") {
        throw new Error("Servidor em manutenção.");
      }

      return data;
    },
    retry: true, // Repetir a requisição em caso de erro
    retryDelay: 3000, // Tempo de espera entre as tentativas (3s)
    refetchOnWindowFocus: false, // Desabilita o refetch quando a janela perde o foco
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length === 3) {
          return "";
        }
        return prevDots + ".";
      });
    }, 600);

    return () => clearInterval(interval);
  }, []);

  // Se estiver carregando pela primeira vez, exibe uma mensagem de carregamento
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-15 w-15 border-b-2 border-zinc-900 dark:border-zinc-100"></div>
          <div className="flex text-2xl text-zinc-900 dark:text-zinc-100 mt-6">
            <div>Carregando</div>
            <div className="w-5">{dots}</div>
          </div>
        </div>
      </div>
    );
  }

  // Se estiver com erro, exibe uma mensagem de erro
  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl">Erro ao verificar conexão: {isError}</h1>
      </div>
    );
  }

  // Se estiver com sucesso, exibe o componente filho
  if (isSuccess) {
    return <>{children}</>;
  }
};

export default ServerGuard;
