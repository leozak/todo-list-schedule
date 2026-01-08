# Docker

## Subir Toda a Stack

```bash
# Primeira vez (build das imagens)
docker-compose up --build

# Próximas vezes
docker-compose up

# Em background
docker-compose up -d
```

## Parar os Containers

```bash
# Parar
docker-compose down

# Parar e remover volumes (limpa banco de dados)
docker-compose down -v
```

## Comandos Úteis

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
