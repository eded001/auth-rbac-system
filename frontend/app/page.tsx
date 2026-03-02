"use client";

import { useQuery } from "@tanstack/react-query";

async function fetchHealth() {
  const response = await fetch("http://localhost:8000");

  if (!response.ok) {
    throw new Error("Erro ao buscar dados da API");
  }

  return response.json();
}

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["api-health"],
    queryFn: fetchHealth,
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">
        Auth RBAC (Role Based Access Control) System
      </h1>

      {isLoading && <p>Carregando dados da API...</p>}

      {error && (
        <p className="text-red-500">
          Erro ao conectar com o backend
        </p>
      )}

      {data && (
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}