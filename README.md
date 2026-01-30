# Gerenciador de Tarefas

## Screenshots

![Tela Principal](./frontend/public/screenshot-01.png)

![Tela de Edição](./frontend/public/screenshot-02.png)

## Tecnologias

### Backend

O backend é construído em Python utilizando o framework FastAPI.

**Principais Bibliotecas e Ferramentas:**

- **FastAPI:** Framework web moderno e rápido para construção de APIs.
- **Uvicorn / Gunicorn:** Servidores ASGI/WSGI para execução da aplicação.
- **SQLAlchemy:** ORM (Object Relational Mapper) para interação com o banco de dados.
- **Pydantic:** Biblioteca para validação de dados e configurações.
- **Psycopg2:** Adaptador de banco de dados PostgreSQL.
- **Python-Jose:** Para implementação de autenticação JWT.

### Frontend

O frontend é uma SPA (Single Page Application) construída com React.

**Principais Bibliotecas e Ferramentas:**

- **Vite:** Ferramenta de build e servidor de desenvolvimento rápido.
- **TypeScript:** Superset de JavaScript que adiciona tipagem estática.
- **Tailwind CSS (v4):** Framework de utilitários CSS para estilização.
- **TanStack Query (React Query):** Gerenciamento de estado de servidor e data fetching eficiente.
- **Axios:** Cliente HTTP para requisições à API.
- **React Icons:** Biblioteca de ícones populares.
- **React Toastify:** Para notificações (toasts) no frontend.

### Infraestrutura

- **Docker & Docker Compose:** Para containerização e orquestração dos serviços (Backend, Frontend e Banco de Dados).
- **PostgreSQL:** Banco de dados relacional.
- **Nginx:** Servidor web para servir o frontend em produção (configuração presente).

## Desenvolvimento Local

### Backend

```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements-dev.txt
uvicorn myapi:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```
