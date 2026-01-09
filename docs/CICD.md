## Docker

### Subir Toda a Stack

```bash
# Primeira vez (build das imagens)
docker-compose up --build

# Próximas vezes
docker-compose up

# Em background
docker-compose up -d
```

### Parar os Containers

```bash
# Parar
docker-compose down

# Parar e remover volumes (limpa banco de dados)
docker-compose down -v
```

### Comandos Úteis

```bash
# Ver logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Acessar terminal do container
docker-compose exec backend bash
docker-compose exec frontend sh

# Rebuildar apenas um serviço
docker-compose up --build backend

# Ver containers rodando
docker-compose ps
```

## Variáveis de Ambiente

### Backend (FastAPI)

| Variável     | Desenvolvimento            | Produção (Render)          | Descrição              |
| ------------ | -------------------------- | -------------------------- | ---------------------- |
| DATABASE_URL | sqlite:///./taskmanager.db | postgresql://...           | Conexão com banco      |
| SECRET_KEY   | (chave aleatória)          | (gerada pelo Render)       | Chave para JWT/sessões |
| ENVIRONMENT  | development                | production                 | Ambiente atual         |
| CORS_ORIGINS | http://localhost:5173      | https://seu-app.vercel.app | Origens permitidas     |
| DEBUG        | True                       | False                      | Modo debug             |

### Frontend (React)

| Variável         | Desenvolvimento       | Produção (Vercel)            | Descrição      |
| ---------------- | --------------------- | ---------------------------- | -------------- |
| VITE_API_URL     | http://localhost:8000 | https://sua-api.onrender.com | URL do backend |
| VITE_ENVIRONMENT | development           | production                   | Ambiente atual |
