# Plano de Implementação - Pipeline CI/CD no Google Cloud

## PROMPT

```
# CONTEXTO
Criei uma aplicação utilizando React para o frontend e FastAPI para o backend.
Atualmente ela esta rodando localmente, utilizando os servidores de desenvolvimento do Node (`npm run dev`) e o Uvicorn (`uvicorn myapi:app --reload`).

# TAREFA
Crie o passo a passo para implementar um pipeline CICD para a aplicação no Google Cloud.
Primeiramente crie um plano de implementação, liste todos os paços e de uma breve esplicação.
Vamos trabalhar com vários prompts, então apresente cada paço de uma vez, vamos trabalhando juntos.
Ao final de cada paço apresente sugestões de prompts para exclarecer o que precisa ser feito.
Também apresente o prompt para continuar a implementação.
```

## Visão Geral da Arquitetura

```
┌──────────┐    ┌──────────────┐    ┌──────────────┐    ┌─────────────────┐
│  GitHub  │───▶│ Cloud Build  │───▶│ Artifact     │───▶│ Cloud Run       │
│ (Código) │    │ (CI/CD)      │    │ Registry     │    │ (Backend)       │
└──────────┘    └──────────────┘    │ (Containers) │    ├─────────────────┤
                                    └──────────────┘    │ Cloud Storage   │
                                                        │ (Frontend)      │
                                                        └─────────────────┘
```

---

## Plano de Implementação (9 Passos)

| Passo | Título                          | Descrição                                                                           |
| ----- | ------------------------------- | ----------------------------------------------------------------------------------- |
| **1** | Preparar Repositório            | Organizar estrutura de pastas, criar `.gitignore`, configurar variáveis de ambiente |
| **2** | Configurar Conta GCP            | Criar projeto, habilitar APIs necessárias, configurar billing e IAM                 |
| **3** | Containerizar com Docker        | Criar `Dockerfile` para frontend e backend, testar localmente com `docker-compose`  |
| **4** | Configurar Testes               | Adicionar testes unitários (pytest para Python, Jest/Vitest para React)             |
| **5** | Configurar Artifact Registry    | Criar repositório para armazenar imagens Docker                                     |
| **6** | Deploy Backend (Cloud Run)      | Configurar e fazer deploy do FastAPI no Cloud Run                                   |
| **7** | Deploy Frontend (Cloud Storage) | Build do React e hospedagem em bucket com CDN                                       |
| **8** | Configurar Cloud Build          | Criar arquivo `cloudbuild.yaml` para automatizar CI/CD                              |
| **9** | Conectar GitHub ao Cloud Build  | Configurar trigger para deploy automático em push/merge                             |

---

## Serviços GCP que Utilizaremos

| Serviço               | Função                        | Free Tier          |
| --------------------- | ----------------------------- | ------------------ |
| **Cloud Run**         | Hospedar backend (FastAPI)    | 2M requisições/mês |
| **Cloud Storage**     | Hospedar frontend (React)     | 5GB armazenamento  |
| **Cloud Build**       | Pipeline CI/CD                | 120 min build/dia  |
| **Artifact Registry** | Armazenar imagens Docker      | 500MB grátis       |
| **Cloud CDN**         | Acelerar entrega do frontend  | Pago por uso       |
| **Secret Manager**    | Gerenciar variáveis sensíveis | 6 versões grátis   |

---

## Passo 1: Preparar Repositório

### Objetivo

Organizar o projeto com estrutura clara, separando frontend e backend, configurando arquivos essenciais para o pipeline.

### Estrutura Recomendada

```
meu-projeto/
├── frontend/                   # Aplicação React
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── Dockerfile
│   └── .env.example
├── backend/                    # API FastAPI
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── routers/
│   │   ├── models/
│   │   └── services/
│   ├── tests/
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── .gitignore
├── cloudbuild.yaml             # Pipeline CI/CD (criaremos depois)
├── docker-compose.yml          # Desenvolvimento local
└── README.md
```

### Arquivos a Criar

**1. `.gitignore` (raiz do projeto)**

```gitignore
# Python
__pycache__/
*.py[cod]
*.pyo
.env
venv/
.venv/
*.egg-info/

# Node
node_modules/
dist/
build/
.env.local
.env.production.local

# IDEs
.vscode/
.idea/
*.swp

# Docker
.docker/

# Google Cloud
gcloud-service-key.json
*.json.enc

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
```

**2. `backend/.env.example`**

```env
# Banco de Dados
DATABASE_URL=postgresql://user:password@localhost:5432/mydb

# Segurança
SECRET_KEY=sua-chave-secreta-aqui

# Ambiente
DEBUG=True
ENVIRONMENT=development

# CORS
CORS_ORIGINS=http://localhost:5173

# Google Cloud (produção)
GCP_PROJECT_ID=seu-projeto-id
```

**3. `frontend/.env.example`**

```env
VITE_API_URL=http://localhost:8000
VITE_ENVIRONMENT=development
```

**4. `backend/requirements.txt`**

```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
python-dotenv==1.0.0
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
gunicorn==21.2.0

# Testes
pytest==7.4.3
httpx==0.25.2
pytest-asyncio==0.21.1
```

**5. `README.md`**

````markdown
# Meu Projeto

## Tecnologias

- **Frontend:** React + Vite
- **Backend:** FastAPI + Python
- **Infraestrutura:** Google Cloud (Cloud Run + Cloud Storage)

## Desenvolvimento Local

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
uvicorn app.main:app --reload
```
````

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Deploy

O deploy é feito automaticamente via Cloud Build quando há push na branch `main`.

````

### Checklist do Passo 1

- [ ] Reorganizar pastas conforme estrutura acima
- [ ] Criar arquivo `.gitignore` na raiz
- [ ] Criar `backend/.env.example`
- [ ] Criar `frontend/.env.example`
- [ ] Atualizar `backend/requirements.txt`
- [ ] Criar `README.md` básico
- [ ] Verificar que `.env` real não está no git
- [ ] Fazer commit da nova estrutura

### Comando para Verificar

```bash
# Verificar se .env está sendo ignorado
git status

# Se .env aparecer, remova do tracking
git rm --cached backend/.env
git rm --cached frontend/.env
````

---

## Prompts Sugeridos para Esclarecer

1. **"Como organizar os routers e models no FastAPI?"**
2. **"Como configurar CORS no FastAPI para aceitar requisições do React?"**
3. **"Qual a diferença entre .env.example e .env?"**
4. **"Como usar variáveis de ambiente no Vite (React)?"**
5. **"Meu projeto tem estrutura diferente, como adaptar?"**

---

## Prompt para Continuar

Quando terminar o Passo 1, use:

> **"Passo 1 concluído. Vamos para o Passo 2: Configurar Conta GCP."**

---

Você já tem o repositório organizado ou precisa ajustar a estrutura? Posso ajudar com alguma dúvida específica deste passo?
