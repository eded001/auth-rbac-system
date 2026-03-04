"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

async function fetchHealth() {
  const response = await fetch("http://localhost:8000");
  if (!response.ok) throw new Error("Erro ao buscar dados da API");
  return response.json();
}

async function fetchUsers() {
  const response = await fetch("http://localhost:8000/users/");
  if (!response.ok) throw new Error("Erro ao buscar usuários");
  return response.json();
}

async function loginRequest() {
  const response = await fetch("http://localhost:8000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "user@admin.com",
      password: "123",
    }),
  });

  if (!response.ok) throw new Error("Erro no login");
  return response.json();
}

async function registerRequest() {
  const response = await fetch("http://localhost:8000/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "user@admin.com",
      password: "123",
    }),
  });

  if (!response.ok) throw new Error("Erro no registro");
  return response.json();
}

export default function Home() {
  const healthQuery = useQuery({
    queryKey: ["health"],
    queryFn: fetchHealth,
  });

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    enabled: false,
  });

  const loginQuery = useQuery({
    queryKey: ["login"],
    queryFn: loginRequest,
    enabled: false,
  });

  const registerQuery = useQuery({
    queryKey: ["register"],
    queryFn: registerRequest,
    enabled: false,
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">
        Auth RBAC (Role Based Access Control) System
      </h1>

      {/* Health */}
      {/* {healthQuery.isLoading && <p>Carregando API...</p>}
      {healthQuery.error && (
        <p className="text-red-500">Erro ao conectar com backend</p>
      )}
      {healthQuery.data && (
        <pre className="bg-gray-100 p-4 rounded w-[400px]">
          {JSON.stringify(healthQuery.data, null, 2)}
        </pre>
      )} */}

      {/* Botões */}
      <div className="flex flex-col gap-3 w-[400px]">
        <Button onClick={() => usersQuery.refetch()}>
          Testar GET /users
        </Button>

        <Button onClick={() => loginQuery.refetch()}>
          Testar POST /auth/login
        </Button>

        <Button onClick={() => registerQuery.refetch()}>
          Testar POST /auth/register
        </Button>
      </div>

      {/* Users */}
      {usersQuery.isFetching && <p>Buscando usuários...</p>}
      {usersQuery.error && (
        <p className="text-red-500">Erro ao buscar usuários</p>
      )}
      {usersQuery.data && (
        <pre className="bg-gray-100 p-4 rounded w-[400px]">
          {JSON.stringify(usersQuery.data, null, 2)}
        </pre>
      )}

      {/* Login */}
      {loginQuery.isFetching && <p>Realizando login...</p>}
      {loginQuery.error && (
        <p className="text-red-500">Erro no login</p>
      )}
      {loginQuery.data && (
        <pre className="bg-gray-100 p-4 rounded w-[400px]">
          {JSON.stringify(loginQuery.data, null, 2)}
        </pre>
      )}

      {/* Register */}
      {registerQuery.isFetching && <p>Registrando usuário...</p>}
      {registerQuery.error && (
        <p className="text-red-500">Erro no registro</p>
      )}
      {registerQuery.data && (
        <pre className="bg-gray-100 p-4 rounded w-[400px]">
          {JSON.stringify(registerQuery.data, null, 2)}
        </pre>
      )}
    </div>
  );
}