# Auth RBAC System

Projeto full stack para estudar **autenticação, autorização e Role-Based Access Control (RBAC)** usando Next.js, FastAPI e PostgreSQL.

## Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- TanStack React Query
- Zod
- Tailwind CSS

### Backend

- FastAPI
- Pydantic
- SQLAlchemy
- PostgreSQL

### Infra

- Docker Compose
- PostgreSQL 16

## Modelo RBAC

O schema do banco contém:

- `users`
- `roles`
- `permissions`
- `user_roles`
- `role_permissions`

As relações permitem associar múltiplos papéis a usuários e múltiplas permissões a cada papel.

## Status atual

O banco já possui estrutura e seeds para RBAC, incluindo papéis `admin` e `user` e permissões de exemplo.

A API FastAPI, porém, ainda utiliza uma lista em memória no fluxo atual de login/registro. Portanto, a integração completa entre autenticação, PostgreSQL e enforcement de permissões ainda está em evolução.

## Executando o banco

```bash
cd docker
docker compose up -d
```

## Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Objetivo técnico

O repositório funciona como laboratório para modelagem de autorização, relações N:N entre usuários, papéis e permissões, além da integração entre frontend, API e banco relacional.
