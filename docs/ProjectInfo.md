# Documentação do Gerenciador de Tarefas

## Visão Geral

O **Gerenciador de Tarefas** é uma aplicação web fullstack para gestão de tarefas pessoais. A aplicação permite que usuários criem, editem, excluam e organizem suas tarefas por data e prioridade, com suporte a temas claro/escuro e interface responsiva.

**Versão:** 0.4  
**Autor:** Leonardo Reiczak  
**Repositório:** https://github.com/leozak

---

## Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENTE                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │   Navegador  │  │   Navegador  │  │   Navegador  │           │
│  │   (Desktop)  │  │   (Mobile)   │  │    (Tablet)  │           │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘           │
└─────────┼─────────────────┼─────────────────┼───────────────────┘
          │                 │                 │
          └─────────────────┴─────────────────┘
                            │ HTTP/HTTPS
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                     FRONTEND (React + Vite)                     │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  Porta: 5173 (dev) / 80 (prod)                              ││
│  │  Tecnologia: React 19 + TypeScript + Tailwind CSS v4        ││
│  │  Build Tool: Vite 7                                         ││
│  └──────────────────────┬──────────────────────────────────────┘│
└─────────────────────────┼───────────────────────────────────────┘
                          │ API REST (Axios)
                          │ JSON
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND (FastAPI + Python)                   │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  Porta: 8000                                                ││
│  │  Framework: FastAPI 0.128                                   ││
│  │  Servidor: Uvicorn/Gunicorn                                 ││
│  │  Autenticação: JWT (python-jose)                            ││
│  └──────────────────────┬──────────────────────────────────────┘│
└─────────────────────────┼───────────────────────────────────────┘
                          │ SQLAlchemy ORM
                          │ PostgreSQL/SQLite
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                     BANCO DE DADOS                              │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  PostgreSQL 15 (Produção/Docker)                            ││
│  │  SQLite (Desenvolvimento local)                             ││
│  │  ORM: SQLAlchemy 2.0                                        ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

## Tecnologias Utilizadas

### Backend

| Tecnologia           | Versão  | Descrição                                |
| -------------------- | ------- | ---------------------------------------- |
| **Python**           | 3.11    | Linguagem de programação principal       |
| **FastAPI**          | 0.128.0 | Framework web moderno e rápido para APIs |
| **Uvicorn**          | 0.38.0  | Servidor ASGI para execução da aplicação |
| **Gunicorn**         | 23.0.0  | Servidor WSGI para produção              |
| **SQLAlchemy**       | 2.0.45  | ORM (Object Relational Mapper)           |
| **Pydantic**         | 2.12.5  | Validação de dados e configurações       |
| **PostgreSQL**       | 15      | Banco de dados relacional (produção)     |
| **Psycopg2**         | 2.9.11  | Adaptador PostgreSQL para Python         |
| **Python-Jose**      | 3.5.0   | Implementação JWT para autenticação      |
| **python-multipart** | 0.0.21  | Suporte a formulários multipart          |
| **python-dotenv**    | 0.9.9   | Gerenciamento de variáveis de ambiente   |
| **Pytest**           | -       | Framework de testes                      |

### Frontend

| Tecnologia                | Versão  | Descrição                                      |
| ------------------------- | ------- | ---------------------------------------------- |
| **React**                 | 19.2.0  | Biblioteca principal para UI                   |
| **TypeScript**            | 5.9.3   | Superset JavaScript com tipagem estática       |
| **Vite**                  | 7.2.4   | Ferramenta de build e dev server               |
| **Tailwind CSS**          | 4.1.18  | Framework CSS utilitário                       |
| **TanStack Query**        | 5.90.16 | Gerenciamento de estado servidor (React Query) |
| **Axios**                 | 1.13.2  | Cliente HTTP para requisições API              |
| **React Icons**           | 5.5.0   | Biblioteca de ícones                           |
| **React Toastify**        | 11.0.5  | Sistema de notificações/toasts                 |
| **tailwind-merge**        | 3.4.0   | Utilitário para merge de classes Tailwind      |
| **Vitest**                | 4.0.16  | Framework de testes                            |
| **React Testing Library** | 16.3.1  | Testes de componentes React                    |
| **ESLint**                | 9.39.1  | Linter para qualidade de código                |

### Infraestrutura

| Tecnologia         | Descrição                              |
| ------------------ | -------------------------------------- |
| **Docker**         | Containerização dos serviços           |
| **Docker Compose** | Orquestração multi-container           |
| **Nginx**          | Servidor web para frontend em produção |
| **PostgreSQL**     | Banco de dados relacional              |

---

## Infraestrutura para Deploy

### Requisitos de Hardware

**Desenvolvimento:**

- CPU: 2 cores
- RAM: 4GB
- Disco: 10GB

**Produção (Mínimo):**

- CPU: 2 cores
- RAM: 4GB
- Disco: 20GB
- Banco de dados: PostgreSQL 15+

### Variáveis de Ambiente

#### Backend (.env)

```env
# Banco de dados
DATABASE_URL=postgresql://postgres:postgres@db:5432/taskmanager

# Segurança
SECRET_KEY=sua_chave_secreta_aqui

# CORS
CORS_ORIGINS=http://localhost:5173,https://seudominio.com

# Ambiente
ENVIRONMENT=production
DEBUG=False
```

#### Frontend (.env)

```env
# API
VITE_API_URL=https://api.seudominio.com

# Ambiente
VITE_ENVIRONMENT=production
```

### Docker Compose (Produção)

```yaml
version: "3.8"

services:
  backend:
    container_name: taskmanager_backend
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - SECRET_KEY=${SECRET_KEY}
      - CORS_ORIGINS=${CORS_ORIGINS}
      - ENVIRONMENT=production
      - DEBUG=False
    depends_on:
      - db
    restart: unless-stopped

  frontend:
    container_name: taskmanager_frontend
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    container_name: taskmanager_db
    environment:
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=${DB_NAME}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

### Portas Utilizadas

| Serviço    | Desenvolvimento | Produção       |
| ---------- | --------------- | -------------- |
| Frontend   | 5173            | 80/443         |
| Backend    | 8000            | 8000           |
| PostgreSQL | 5432            | 5432 (interno) |

---

## Estrutura de Arquivos

### Backend

```
backend/
├── __init__.py                 # Inicializador do pacote
├── main.py                     # Ponto de entrada FastAPI (434 linhas)
├── teste.py                    # Arquivo de testes rápidos
├── requirements.txt            # Dependências de produção
├── requirements-dev.txt        # Dependências de desenvolvimento
├── pytest.ini                 # Configuração do pytest
├── pyproject.toml             # Configuração do projeto Python
├── Dockerfile                 # Container do backend
├── .dockerignore              # Arquivos ignorados no Docker
├── .env                       # Variáveis de ambiente
├── .env.example               # Exemplo de variáveis
├── render.yaml                # Configuração Render.com
├── tarefas.db                 # Banco SQLite (desenvolvimento)
│
├── config/
│   ├── __init__.py
│   └── database.py            # Configuração SQLAlchemy
│
├── models/
│   ├── __init__.py
│   ├── user.py                # Modelo User (SQLAlchemy)
│   └── task.py                # Modelo Task (SQLAlchemy)
│
└── tests/
    ├── __init__.py
    ├── conftest.py            # Fixtures do pytest
    ├── test_main.py           # Testes da API
    └── test_task.py           # Testes de tarefas
```

### Frontend

```
frontend/
├── index.html                 # HTML principal
├── package.json               # Dependências npm
├── tsconfig.json              # Configuração TypeScript
├── vite.config.ts             # Configuração Vite
├── tailwind.config.js         # Configuração Tailwind
├── eslint.config.js           # Configuração ESLint
├── Dockerfile.dev             # Container desenvolvimento
├── Dockerfile                 # Container produção
├── nginx.conf                 # Configuração Nginx
├── README.md                  # Documentação frontend
│
├── public/
│   ├── screenshot-01.png      # Screenshot da aplicação
│   └── screenshot-02.png      # Screenshot da aplicação
│
└── src/
    ├── main.tsx               # Ponto de entrada React
    ├── App.tsx                # Componente raiz
    ├── index.css              # Estilos globais
    │
    ├── components/
    │   ├── Modal/             # Componentes de Modal
    │   ├── Sidebar/           # Componentes da Sidebar
    │   ├── TaskManager/       # Componentes do gerenciador
    │   ├── ServerGuard/       # Guarda de servidor
    │   └── Theme/             # Componente de tema
    │
    ├── contexts/
    │   ├── ThemeContext.tsx   # Contexto de tema
    │   └── DateContext.tsx    # Contexto de data
    │
    ├── features/
    │   └── Auth/              # Funcionalidades de autenticação
    │
    ├── hooks/
    │   ├── useUserNew.ts      # Hook criação usuário
    │   ├── useUserLogin.ts    # Hook login
    │   ├── useUserUpdate.ts   # Hook atualização usuário
    │   └── useTasksData.ts    # Hook dados de tarefas
    │
    ├── interfaces/
    │   ├── user.ts            # Interfaces de usuário
    │   └── token.ts           # Interfaces de token
    │
    ├── services/
    │   ├── api.ts             # Configuração Axios
    │   └── config.ts          # Configurações de serviço
    │
    ├── sets/
    │   ├── info.ts            # Informações do projeto
    │   └── callendar.ts       # Dados do calendário
    │
    └── devutils/
                └── Responsividade.tsx  # Utilitário responsivo
```

---

## Documentação Detalhada dos Arquivos

### Backend

#### `main.py` (Ponto de Entrada FastAPI)

**Funcionalidade:** Arquivo principal da API REST, define todas as rotas e lógica de negócio.

**Endpoints da API:**

| Método | Endpoint             | Descrição                 | Autenticação |
| ------ | -------------------- | ------------------------- | ------------ |
| GET    | `/`                  | Status da API             | Não          |
| POST   | `/users/login`       | Login via JSON            | Não          |
| POST   | `/users/login-form`  | Login via OAuth2 form     | Não          |
| POST   | `/users/create`      | Criar novo usuário        | Não          |
| POST   | `/users/update`      | Atualizar usuário         | Sim (JWT)    |
| GET    | `/verify-token`      | Verificar token           | Sim (JWT)    |
| GET    | `/refresh-token`     | Renovar token             | Sim (JWT)    |
| GET    | `/tasks/{username}`  | Listar tarefas do usuário | Sim (JWT)    |
| POST   | `/tasks/create`      | Criar nova tarefa         | Não          |
| PUT    | `/tasks/update/{id}` | Atualizar tarefa          | Não          |
| DELETE | `/tasks/delete/{id}` | Deletar tarefa            | Não          |
| PATCH  | `/tasks/done/{id}`   | Alterar status done       | Não          |
| PATCH  | `/tasks/pin/{id}`    | Fixar/desafixar tarefa    | Não          |

**Schemas Pydantic:**

```python
class LoginSchema(BaseModel):
    email: str
    password: str

class UserCreateSchema(BaseModel):
    name: str
    email: str
    password: str

class UserUpdateSchema(BaseModel):
    name: str = None
    email: str
    password: str = None

class TaskCreateSchema(BaseModel):
    title: str
    description: str
    priority: int
    pin: bool
    done: bool
    username: str
    date: str

class TaskUpdateSchema(BaseModel):
    title: str
    description: str
    priority: int
    pin: bool
    done: bool
    date: str

class TaskDoneSchema(BaseModel):
    done: bool

class TaskPinSchema(BaseModel):
    pin: bool
```

#### `config/database.py`

**Funcionalidade:** Configuração da conexão com banco de dados SQLAlchemy.

**Funções:**

- `get_db()`: Gerenciador de contexto para sessões do banco
- Suporte a PostgreSQL (produção) e SQLite (desenvolvimento)
- Conversão automática de URL postgres:// para postgresql://

#### `models/user.py`

**Funcionalidade:** Modelo SQLAlchemy para usuários.

**Atributos:**
| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `email` | String (PK) | Email do usuário (chave primária) |
| `name` | String | Nome do usuário |
| `password` | String | Senha hasheada (SHA-256) |

#### `models/task.py`

**Funcionalidade:** Modelo SQLAlchemy para tarefas.

**Atributos:**
| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `id` | Integer (PK, Auto) | ID único da tarefa |
| `title` | String | Título da tarefa |
| `description` | String | Descrição detalhada |
| `priority` | Integer | Nível de prioridade (0=Urgente, 1=Importante, 2=Opcional) |
| `pin` | Boolean | Se está fixada |
| `done` | Boolean | Se está concluída |
| `email` | String (FK) | Email do usuário (chave estrangeira) |
| `date` | String | Data da tarefa (YYYY-MM-DD) |

#### `tests/conftest.py`

**Funcionalidade:** Configuração de fixtures para testes pytest.

**Fixtures:**

- `db_session`: Sessão de banco em memória (SQLite)
- `client`: Cliente de teste FastAPI com banco isolado
- `example_task`: Dados de exemplo para testes de tarefas

---

### Frontend - Componentes

#### `App.tsx`

**Funcionalidade:** Componente raiz da aplicação, gerencia autenticação e renderização condicional.

**Props:** Nenhuma

**Lógica:**

- Verifica token no localStorage ao montar
- Valida token via API (`/verify-token`)
- Renderiza `Login` ou aplicação principal baseado em `isLogged`
- Aplica tema dark/light via classe CSS

**Renderização Condicional:**

```
isLogged === false → <Login />
isLogged === true  → <DateProvider> → <Sidebar /> + <TaskManager />
```

#### `components/Modal/index.tsx` (Modal Composto)

**Funcionalidade:** Exporta objeto Modal com padrão Compound Components.

**Componentes Exportados:**

```typescript
export const Modal = {
  Root: ModalRoot, // Container principal
  Header: ModalHeader, // Cabeçalho
  Title: ModalHeaderTitle, // Título
  Close: ModalHeaderClose, // Botão fechar
  Body: ModalBody, // Corpo/conteúdo
  InputText: ModalInputText, // Input texto
  InputPassword: ModalInputPassword, // Input senha
  Actions: ModalActions, // Container ações
  Cancel: ModalActionCancel, // Botão cancelar
  Confirm: ModalActionConfirm, // Botão confirmar
  CloseConfirm: ModalCloseConfirm, // Confirmação de fechamento
};
```

#### `components/Modal/ModalRoot.tsx`

**Funcionalidade:** Container raiz do modal com backdrop e container.

**Props:**

```typescript
interface ModalRootProps {
  children: ReactNode;
}
```

**Estilização:**

- Backdrop: `bg-black/90` com blur
- Container: gradiente zinc com sombra
- Suporte a tema dark

#### `components/Modal/ModalHeader.tsx`

**Funcionalidade:** Container do cabeçalho do modal.

**Props:**

```typescript
interface ModalHeaderProps {
  children: ReactNode;
}
```

#### `components/Modal/ModalHeaderTitle.tsx`

**Funcionalidade:** Componente de título do modal.

**Props:**

```typescript
interface ModalHeaderTitleProps {
  title: string;
}
```

#### `components/Modal/ModalHeaderClose.tsx`

**Funcionalidade:** Botão de fechamento do modal.

**Props:**

```typescript
interface ModalHeaderCloseProps {
  callbackClose?: () => void; // Callback opcional ao clicar
}
```

**Ícone:** IoClose (React Icons)

#### `components/Modal/ModalBody.tsx`

**Funcionalidade:** Container do corpo/conteúdo do modal.

**Props:**

```typescript
interface ModalBodyProps {
  children: ReactNode;
}
```

#### `components/Modal/ModalInputText.tsx`

**Funcionalidade:** Input de texto estilizado para modais.

**Props:**

```typescript
interface ModalInputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string; // Label do input
  error?: string | null; // Mensagem de erro opcional
}
```

**Herança:** Extende todas as props nativas de `<input>`

**Features:**

- Label automático
- Estilização Tailwind com merge
- Exibição de erro
- Suporte dark mode

#### `components/Modal/ModalInputPassword.tsx`

**Funcionalidade:** Input de senha estilizado para modais.

**Props:**

```typescript
interface ModalInputPasswordProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  error?: string | null;
}
```

**Tipo:** `type="password"`

#### `components/Modal/ModalActions.tsx`

**Funcionalidade:** Container para botões de ação do modal.

**Props:**

```typescript
interface ModalActionsProps {
  children: ReactNode;
}
```

**Layout:** Flex row com espaçamento e centralização.

#### `components/Modal/ModalActionCancel.tsx`

**Funcionalidade:** Botão de cancelar/negar estilizado.

**Props:**

```typescript
interface ModalActionCancelProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string; // Texto personalizado (default: "Cancelar")
}
```

**Estilização:** Gradiente vermelho (red-700 a red-950)

#### `components/Modal/ModalActionConfirm.tsx`

**Funcionalidade:** Botão de confirmar/aceitar estilizado.

**Props:**

```typescript
interface ModalActionConfirmProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string; // Texto personalizado (default: "Confirmar")
}
```

**Estilização:** Gradiente verde (green-700 a green-950)

#### `components/Modal/ModalCloseConfirm.tsx`

**Funcionalidade:** Modal de confirmação antes de fechar (evitar perda de dados).

**Props:**

```typescript
interface ModalCloseConfirmProps {
  children: ReactNode; // Botões de ação (Cancel + Confirm)
}
```

**Mensagem:** "Tem certeza que deseja sair?"

---

### Frontend - Sidebar

#### `components/Sidebar/Sidebar.tsx`

**Funcionalidade:** Barra lateral navegável, pode ser expandida ou colapsada.

**Props:** Nenhuma

**State:**

```typescript
const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
```

**Componentes Filhos:**

- `SidebarExpanded` (expandida) ou `SidebarCollapsed` (colapsada)
- `SidebarInfo` (botão info)
- `SidebarUser` (menu usuário)
- `SidebarSignout` (logout)

**Ícones:**

- TbLayoutSidebarLeftCollapseFilled (colapsar)
- TbLayoutSidebarLeftExpandFilled (expandir)

#### `components/Sidebar/SidebarExpanded.tsx`

**Funcionalidade:** Visualização expandida da sidebar.

**Conteúdo:**

- SidebarCallendar (calendário)

#### `components/Sidebar/SidebarCollapsed.tsx`

**Funcionalidade:** Visualização colapsada da sidebar.

**Conteúdo:** Placeholder "C"

#### `components/Sidebar/SidebarCallendar.tsx`

**Funcionalidade:** Componente de calendário mensal interativo.

**Dependências:** DateContext

**Features:**

- Navegação mês anterior/próximo
- Seleção de dia
- Indicadores de tarefas (placeholder)
- Suporte dark mode

**Funções:**

```typescript
getDaysInMonth(month: number, year: number): number
getDayOfWeek(day: number, month: number, year: number): number
hasTasks(date: string): boolean  // Placeholder
```

**Estado:** Usa DateContext para year, month, day

#### `components/Sidebar/SidebarUser.tsx`

**Funcionalidade:** Menu do usuário com modal de edição.

**Features:**

- Botão abre modal de edição
- Edição de nome
- Alteração de senha
- Validação de campos
- Confirmação antes de fechar (se houver alterações)

**Hooks:**

- `useUserUpdate`: Atualização de usuário
- `useState`: Gerenciamento de estado do modal

**Validações:**

- Nome obrigatório
- Senhas devem coincidir

#### `components/Sidebar/SidebarSignout.tsx`

**Funcionalidade:** Botão de logout.

**Ações:**

```typescript
localStorage.removeItem("access_token");
localStorage.removeItem("refresh_token");
window.location.href = "/";
```

**Ícone:** FaPowerOff

#### `components/Sidebar/SidebarInfo.tsx`

**Funcionalidade:** Botão de informações sobre o aplicativo.

**Conteúdo do Modal:**

- Nome: Gerenciador de Tarefas
- Descrição: "Gerencie suas tarefas de forma simples e eficiente."
- Versão: v0.4
- Autor: Leonardo Reiczak
- Email: leozak@gmail.com

---

### Frontend - TaskManager

#### `components/TaskManager/TaskManager.tsx`

**Funcionalidade:** Container principal da área de tarefas.

**Conteúdo:**

- TaskManagerNav (barra de navegação superior)
- Placeholder "TaskManager"

**Layout:**

- Largura total com margin-left para sidebar
- Responsivo: `ml-14 sm:ml-0`

#### `components/TaskManager/TaskManagerNav.tsx`

**Funcionalidade:** Barra de navegação superior do gerenciador.

**Conteúdo:**

- "Navegador de dias" (placeholder)
- Componente Theme (toggle tema)

**Layout:** Flex com border-bottom

---

### Frontend - Autenticação

#### `features/Auth/Login.tsx`

**Funcionalidade:** Componente de switching entre login e cadastro.

**State:**

```typescript
const [newUser, setNewUser] = useState<boolean>(false);
```

**Renderização Condicional:**

```
newUser === true  → <Sigup setNewUser={setNewUser} />
newUser === false → <Sigin setNewUser={setNewUser} />
```

#### `features/Auth/Sigin.tsx`

**Funcionalidade:** Formulário de login.

**Props:**

```typescript
type Props = {
  setNewUser: React.Dispatch<React.SetStateAction<boolean>>;
};
```

**State:**

```typescript
const [email, setEmail] = useState<string>("");
const [password, setPassword] = useState<string>("");
const [errorLogin, setErrorLogin] = useState<Error>(...);
const [errorEmail, setErrorEmail] = useState<Error>(...);
const [errorPassword, setErrorPassword] = useState<Error>(...);
```

**Validações:**

- Email obrigatório
- Formato de email válido (regex)
- Senha obrigatória

**Hook:** `useAuthLogin`

**Features:**

- Recupera email do localStorage
- Exibe erro de autenticação
- Link para criar conta
- Toggle tema

#### `features/Auth/Sigup.tsx`

**Funcionalidade:** Formulário de cadastro de novo usuário.

**Props:**

```typescript
type Props = {
  setNewUser: React.Dispatch<React.SetStateAction<boolean>>;
};
```

**State:**

```typescript
const [name, setName] = useState<string>("");
const [email, setEmail] = useState<string>("");
const [password, setPassword] = useState<string>("");
const [repassword, setRepassword] = useState<string>("");
```

**Validações:**

- Nome obrigatório
- Email obrigatório e válido
- Senha obrigatória
- Confirmação de senha obrigatória
- Senhas devem coincidir

**Hook:** `useUserMutate`

**Pós-cadastro:**

- Salva email no localStorage
- Redireciona para login
- Trata erro "User already exists"

---

### Frontend - Contextos

#### `contexts/ThemeContext.tsx`

**Funcionalidade:** Gerenciamento global de tema claro/escuro.

**Interface:**

```typescript
interface ThemeContextType {
  theme: string; // "light" ou "dark"
  toggleTheme: (theme?: "light" | "dark") => void;
}
```

**Persistência:** localStorage (key: "theme")

**Hook:** `useTheme()`

**Provider:** `ThemeProvider`

#### `contexts/DateContext.tsx`

**Funcionalidade:** Gerenciamento global da data selecionada.

**Interface:**

```typescript
interface DateContextType {
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
  month: number; // 0-11 (Janeiro = 0)
  setMonth: Dispatch<SetStateAction<number>>;
  day: number;
  setDay: Dispatch<SetStateAction<number>>;
}
```

**Inicialização:** Data atual do sistema

**Provider:** `DateProvider`

---

### Frontend - Hooks

#### `hooks/useUserNew.ts`

**Funcionalidade:** Hook para criação de novo usuário.

**Hook Principal:** `useMutation` (TanStack Query)

**Mutation Key:** `["newUser"]`

**Função:**

```typescript
submitNewUser(user: NewUserData): AxiosPromise<NewUserResponse>
```

**Retorno:**

```typescript
{
  ...mutate,           // Props do useMutation
  data: NewUserResponseData  // Dados da resposta
}
```

#### `hooks/useUserLogin.ts`

**Funcionalidade:** Hook para autenticação de usuário.

**Mutation Key:** `["login"]`

**Função:**

```typescript
loginRequest(user: LoginCredentials): Promise<AuthResponse>
```

**Content-Type:** `application/x-www-form-urlencoded`

**onSuccess:**

```typescript
localStorage.setItem("email", data.email);
localStorage.setItem("name", data.name);
localStorage.setItem("access_token", data.access_token);
localStorage.setItem("refresh_token", data.refresh_token);
window.location.href = "/";
```

#### `hooks/useUserUpdate.ts`

**Funcionalidade:** Hook para atualização de dados do usuário.

**Mutation Key:** `["updateUser"]`

**Função:**

```typescript
submitUserUpdate(user: UpdateUserInterface): AxiosPromise<UpdateUserResponseData>
```

**onSuccess:**

```typescript
localStorage.setItem("name", data?.data?.name);
```

#### `hooks/useTasksData.ts`

**Funcionalidade:** Hook para obtenção de dados de tarefas.

**Status:** Placeholder (em desenvolvimento)

```typescript
const useTasksData = () => {
  return "useTasksData";
};
```

---

### Frontend - Serviços

#### `services/api.ts`

**Funcionalidade:** Configuração do cliente HTTP Axios.

**Configuração:**

```typescript
export const api = axios.create({
  baseURL: API_URL, // http://localhost:8000
  timeout: 5000,
});
```

**Interceptors:**

**Request:**

- Adiciona `Content-Type: application/json`
- Adiciona `Authorization: Bearer {access_token}`

**Response:**

- Refresh automático de token em 401
- Remove tokens e redireciona em falha de refresh

#### `services/config.ts`

**Funcionalidade:** Configurações globais da aplicação.

**Exportações:**

```typescript
export const API_URL: string =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

export const ENVIRONMENT: string =
  import.meta.env.VITE_ENVIRONMENT || "development";
```

---

### Frontend - Interfaces

#### `interfaces/user.ts`

**Funcionalidade:** Definições de tipos TypeScript para usuários.

**Interfaces:**

```typescript
interface NewUserData {
  name: string;
  email: string;
  password: string;
}

interface NewUserResponseData {
  success: boolean;
  message: string;
  name: string;
  email: string;
}

interface NewUserResponse {
  success?: boolean;
  message?: string;
  data: NewUserResponseData;
}

interface UpdateUserInterface {
  name: string;
  email: string;
  password?: string;
}

interface UpdateUserResponseData {
  success: boolean;
  message: string;
  name: string;
}

interface LoginCredentials {
  username: string; // Email usado como username
  password: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  name?: string;
  email?: string;
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
}
```

#### `interfaces/token.ts`

**Funcionalidade:** Interface de resposta de validação de token.

```typescript
export interface ValidTokenResponse {
  success: boolean;
  message: string;
}
```

---

### Frontend - Sets (Configurações)

#### `sets/info.ts`

**Funcionalidade:** Metadados do projeto.

**Exportações:**

```typescript
export const version: string = "0.4";
export const name: string = "Gerenciador de tarefas";
export const description: string =
  "Gerencie suas tarefas de forma simples e eficiente.";
export const keywords: string =
  "gerenciamento, tarefas, organização, produtividade";
export const author: string = "Leonardo Reiczak";
export const github: string = "https://github.com/leozak";
export const linkedin: string = "https://www.linkedin.com/in/leonardo-reiczak/";
export const email: string = "leozak@gmail.com";
```

#### `sets/callendar.ts`

**Funcionalidade:** Dados de localização para calendário.

**Exportações:**

```typescript
export const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const week = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
```

---

### Frontend - Componentes Úteis

#### `components/Theme/Theme.tsx`

**Funcionalidade:** Toggle de tema claro/escuro.

**Hook:** `useTheme`

**Ícones:**

- MdOutlineDarkMode (tema escuro)
- MdOutlineLightMode (tema claro)

**Layout:** Container com dois botões lado a lado

#### `components/ServerGuard/ServerGuard.tsx`

**Funcionalidade:** Verifica se o backend está online antes de renderizar.

**Props:**

```typescript
interface ServerGuardProps {
  children: ReactNode;
}
```

**Hook:** `useQuery` (TanStack Query)

**Query Key:** `["server-health"]`

**Endpoint:** `GET /`

**Estados:**

- **Loading:** Spinner animado com "Carregando..."
- **Error:** Mensagem de erro
- **Success:** Renderiza children

**Retry:** 3 segundos entre tentativas

#### `devutils/Responsividade.tsx`

**Funcionalidade:** Utilitário de desenvolvimento para visualizar breakpoints.

**Breakpoints Exibidos:**

- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

---

### Frontend - Ponto de Entrada

#### `main.tsx`

**Funcionalidade:** Bootstrap da aplicação React.

**Providers (ordem de aninhamento):**

1. StrictMode
2. QueryClientProvider (TanStack Query)
3. ThemeProvider
4. App
5. ToastContainer
6. ReactQueryDevtools

**Configurações:**

- QueryClient: Instância padrão
- ToastContainer: `autoClose={2000}`, `position="bottom-center"`
- Devtools: `initialIsOpen={false}`

---

## Fluxo de Dados e Comunicação

### Diagrama de Fluxo de Autenticação

```
┌────────────────────────────────────────────────────────────────────┐
│                         FLUXO DE LOGIN                             │
└────────────────────────────────────────────────────────────────────┘

Usuário
   │
   │ Preenche email/senha
   ▼
┌─────────────────┐
│   Sigin.tsx     │
│  (Formulário)   │
└────────┬────────┘
         │
         │ onSubmit
         ▼
┌─────────────────────┐
│  useUserLogin.ts    │
│   (useMutation)     │
└────────┬────────────┘
         │
         │ POST /users/login-form
         │ Content-Type: x-www-form-urlencoded
         ▼
┌─────────────────────┐
│     main.py         │
│   (FastAPI)         │
│                     │
│ 1. Recebe credenciais
│ 2. SHA-256 na senha
│ 3. Query no banco   │
│ 4. Gera JWT tokens  │
└────────┬────────────┘
         │
         │ Response JSON
         │ {access_token, refresh_token, ...}
         ▼
┌─────────────────────┐
│    Sigin.tsx        │
│   (onSuccess)       │
│                     │
│ 1. Salva tokens no  │
│    localStorage     │
│ 2. window.location  │
│    .href = "/"      │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│     App.tsx         │
│                     │
│ Verifica token e    │
│ renderiza aplicação │
└─────────────────────┘
```

### Diagrama de Fluxo de Atualização de Token

```
┌────────────────────────────────────────────────────────────────────┐
│                    FLUXO DE REFRESH TOKEN                          │
└────────────────────────────────────────────────────────────────────┘

Qualquer Requisição API
         │
         │ 401 Unauthorized
         ▼
┌─────────────────────┐
│   api.ts            │
│ (Response Interceptor)
│                     │
│ 1. Detecta 401      │
│ 2. Marca _retry     │
│ 3. Chama refresh    │
└────────┬────────────┘
         │
         │ GET /refresh-token
         │ Authorization: Bearer {refresh_token}
         ▼
┌─────────────────────┐
│    main.py          │
│                     │
│ 1. Valida refresh   │
│ 2. Gera novos tokens│
└────────┬────────────┘
         │
         │ Novos tokens
         ▼
┌─────────────────────┐
│    api.ts           │
│                     │
│ 1. Atualiza         │
│    localStorage     │
│ 2. Retry da         │
│    requisição       │
└─────────────────────┘

ERRO no refresh:
         │
         ▼
┌─────────────────────┐
│    api.ts           │
│                     │
│ 1. Remove tokens    │
│ 2. Redireciona para │
│    / (login)        │
└─────────────────────┘
```

### Diagrama de Criação de Tarefa

```
┌────────────────────────────────────────────────────────────────────┐
│                    FLUXO DE CRIAÇÃO DE TAREFA                      │
└────────────────────────────────────────────────────────────────────┘

[Em desenvolvimento - Componente não implementado]

Interface do Usuário
         │
         │ Preencher dados
         ▼
┌─────────────────────┐
│  [Componente Task]  │
│   (Formulário)      │
└────────┬────────────┘
         │
         │ POST /tasks/create
         │ Authorization: Bearer {token}
         ▼
┌─────────────────────┐
│     main.py         │
│                     │
│ 1. Valida JWT       │
│ 2. Cria objeto Task │
│ 3. Persiste no DB   │
│ 4. Retorna dados    │
└────────┬────────────┘
         │
         │ 201 Created
         ▼
┌─────────────────────┐
│   Interface         │
│   Atualiza lista    │
└─────────────────────┘
```

### Diagrama de Arquitetura de Componentes

```
┌────────────────────────────────────────────────────────────────────┐
│                     HIERARQUIA DE COMPONENTES                      │
└────────────────────────────────────────────────────────────────────┘

main.tsx
    │
    ├── QueryClientProvider
    │       └── ThemeProvider
    │               └── App.tsx
    │                       │
    │                       ├── ServerGuard
    │                       │       │
    │                       │       ├── Login (não autenticado)
    │                       │       │       │
    │                       │       │       ├── Sigin
    │                       │       │       └── Sigup
    │                       │       │
    │                       │       └── Aplicação (autenticado)
    │                       │               │
    │                       │               ├── DateProvider
    │                       │               │       │
    │                       │               │       ├── Sidebar
    │                       │               │       │       │
    │                       │               │       │       ├── SidebarExpanded
    │                       │               │       │       │       └── SidebarCallendar
    │                       │               │       │       │               └── (usa DateContext)
    │                       │               │       │       │
    │                       │               │       │       ├── SidebarCollapsed
    │                       │               │       │       │
    │                       │               │       │       ├── SidebarUser
    │                       │               │       │       │       └── Modal (edição)
    │                       │               │       │       │               ├── Modal.Root
    │                       │               │       │       │               ├── Modal.Header
    │                       │               │       │       │               ├── Modal.Body
    │                       │               │       │       │               └── Modal.Actions
    │                       │               │       │       │
    │                       │               │       │       ├── SidebarSignout
    │                       │               │       │       └── SidebarInfo
    │                       │               │       │               └── Modal (info)
    │                       │               │       │
    │                       │               │       └── TaskManager
    │                       │               │               │
    │                       │               │               └── TaskManagerNav
    │                       │               │                       └── Theme
    │                       │               │
    │                       │               └── ToastContainer
    │                       │
    │                       └── ReactQueryDevtools
    │
    └── StrictMode
```

### Diagrama de Contextos e Hooks

```
┌────────────────────────────────────────────────────────────────────┐
│                    ARQUITETURA DE ESTADO                           │
└────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        CONTEXTO GLOBAL                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ThemeContext                    DateContext                    │
│  ├─ theme: "light" | "dark"      ├─ year: number               │
│  ├─ toggleTheme()                ├─ month: number (0-11)        │
│  │                                ├─ day: number                │
│  │                                ├─ setYear()                  │
│  │                                ├─ setMonth()                 │
│  │                                └─ setDay()                   │
│  │                                                              │
│  └─ Persistido em:               └─ Inicializado com:          │
│     localStorage                    new Date()                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Consumido por
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      HOOKS (TanStack Query)                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  useUserMutate()              useAuthLogin()                    │
│  ├─ mutationKey: ["newUser"]   ├─ mutationKey: ["login"]        │
│  ├─ POST /users/create         ├─ POST /users/login-form        │
│  ├─ Cria usuário               ├─ Autentica usuário             │
│  └─ Retorna: status            ├─ onSuccess:                    │
│                                   │  - Salva tokens             │
│                                   │  - Redireciona              │
│                                   └─ Retorna: AuthResponse      │
│                                                                 │
│  useUserUpdate()              useTasksData() (WIP)              │
│  ├─ mutationKey: ["updateUser"] ├─ (placeholder)                │
│  ├─ POST /users/update         └─ Retorna: string               │
│  ├─ Atualiza usuário                                            │
│  ├─ onSuccess:                                                  │
│  │  - Atualiza localStorage                                     │
│  └─ Retorna: status                                             │
│                                                                 │
│  Server Health                                                  │
│  ├─ queryKey: ["server-health"]                                 │
│  ├─ GET /                                                       │
│  ├─ Verifica disponibilidade                                    │
│  └─ Retry: 3s                                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Persistência Local
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      LOCAL STORAGE                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Chave              │ Valor                                     │
│  ───────────────────┼────────────────────────────────────────── │
│  theme              │ "light" | "dark"                          │
│  email              │ email do usuário logado                   │
│  name               │ nome do usuário logado                    │
│  access_token       │ JWT access token                          │
│  refresh_token      │ JWT refresh token                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Diagrama de Comunicação API

```
┌────────────────────────────────────────────────────────────────────┐
│                    FLUXO DE REQUISIÇÕES API                        │
└────────────────────────────────────────────────────────────────────┘

┌─────────────────────┐         ┌─────────────────────┐
│     Frontend        │         │      Backend        │
│   (React + Vite)    │◄───────►│    (FastAPI)        │
│   Porta: 5173       │  HTTP   │    Porta: 8000      │
└────────┬────────────┘         └────────┬────────────┘
         │                               │
         │ axios / fetch                 │
         │                               │
┌────────▼────────┐             ┌────────▼────────┐
│   api.ts        │             │   main.py       │
│   (Axios        │             │   (Roteador     │
│   Client)       │             │   FastAPI)      │
│                 │             │                 │
│ - baseURL       │             │ - Endpoints     │
│ - timeout: 5000 │             │ - Schemas       │
│ - interceptors  │             │ - Auth JWT      │
│   (auth,        │             │                 │
│    refresh)     │             │                 │
└─────────────────┘             └────────┬────────┘
                                         │
                                         │ SQLAlchemy
                                         │
                                ┌────────▼────────┐
                                │  config/        │
                                │  database.py    │
                                │                 │
                                │ - Engine        │
                                │ - Session       │
                                │ - Base (ORM)    │
                                └────────┬────────┘
                                         │
                                ┌────────▼────────┐
                                │    models/      │
                                │  - user.py      │
                                │  - task.py      │
                                │                 │
                                │ - Classes ORM   │
                                │ - Colunas       │
                                │ - Relações      │
                                └────────┬────────┘
                                         │
                                ┌────────▼────────┐
                                │    Banco de     │
                                │    Dados        │
                                │                 │
                                │ PostgreSQL 15   │
                                │ (Produção)      │
                                │ ou              │
                                │ SQLite          │
                                │ (Dev)           │
                                └─────────────────┘

CORS:
┌─────────────────────────────────────────┐
│  Origens Permitidas                     │
│  - http://localhost:5173 (dev)          │
│  - https://seudominio.com (prod)        │
│                                         │
│  Métodos: *                             │
│  Headers: *                             │
│  Credentials: true                      │
└─────────────────────────────────────────┘
```

---

## Decisões de Design

### Prioridade de Tarefas

O sistema utiliza um sistema de prioridade numérico:

| Valor | Nome       | Uso                                  |
| ----- | ---------- | ------------------------------------ |
| 0     | Urgente    | Tarefas que exigem atenção imediata  |
| 1     | Importante | Atividades com valor real ao projeto |
| 2     | Opcional   | Ideias e melhorias desejáveis        |

### Esquema de Cores (Tailwind)

**Tema Claro:**

- Background: `bg-white`, `bg-zinc-300`
- Texto: `text-zinc-800`, `text-zinc-700`
- Destaque: `bg-zinc-400`

**Tema Escuro:**

- Background: `dark:bg-zinc-900`, `dark:bg-zinc-800`
- Texto: `dark:text-zinc-300`, `dark:text-zinc-200`
- Destaque: `dark:bg-zinc-700`

### Breakpoints Responsivos

- **sm:** 640px (mobile landscape)
- **md:** 768px (tablet)
- **lg:** 1024px (desktop)
- **xl:** 1280px (wide desktop)
- **2xl:** 1536px (ultra-wide)

---

## Scripts Disponíveis

### Backend

```bash
# Desenvolvimento
python -m venv venv
.\venv\Scripts\Activate.ps1  # Windows
pip install -r requirements-dev.txt
uvicorn main:app --reload

# Testes
pytest
pytest -v                  # Verbose
pytest tests/test_main.py  # Específico

# Produção
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

### Frontend

```bash
# Desenvolvimento
npm install
npm run dev

# Build
npm run build

# Preview produção
npm run preview

# Testes
npm run test
npm run test:ui      # UI do Vitest
npm run coverage     # Cobertura

# Lint
npm run lint
```

### Docker

```bash
# Desenvolvimento completo
docker-compose up -d

# Logs
docker-compose logs -f

# Rebuild
docker-compose up -d --build

# Parar
docker-compose down

# Limpar volumes
docker-compose down -v
```

---

## Considerações de Segurança

### Autenticação

- JWT (JSON Web Tokens) para sessões stateless
- Tokens com expiração (30 minutos)
- Refresh tokens (7 dias)
- Senhas hasheadas com SHA-256

### CORS

- Origens explicitamente permitidas
- Credenciais habilitadas
- Métodos e headers liberados para API

### Variáveis Sensíveis

- SECRET_KEY deve ser forte e única
- Nunca commitar .env em produção
- Usar variáveis de ambiente no deploy

### Banco de Dados

- SQLAlchemy ORM previne SQL injection
- Transações automáticas
- Rollback em caso de erro

---

## Roadmap e TODOs

### Implementado

- [x] Sistema de autenticação JWT
- [x] CRUD de usuários
- [x] Estrutura de tarefas (backend)
- [x] Calendário interativo
- [x] Tema claro/escuro
- [x] Interface responsiva
- [x] Docker containerization
- [x] Testes iniciais

### Em Desenvolvimento

- [ ] CRUD completo de tarefas (frontend)
- [ ] Listagem de tarefas por data
- [ ] Filtros e busca
- [ ] Drag & drop de tarefas
- [ ] Notificações push
- [ ] Offline mode (PWA)

### Futuro

- [ ] Categorias/tags
- [ ] Subtarefas
- [ ] Compartilhamento
- [ ] Estatísticas
- [ ] Mobile app (React Native)
- [ ] CI/CD completo

---

## Contato

**Autor:** Leonardo Reiczak  
**Email:** leozak@gmail.com  
**GitHub:** https://github.com/leozak  
**LinkedIn:** https://www.linkedin.com/in/leonardo-reiczak/

---

## Licença

Este projeto é privado e de uso pessoal.

---

_Documentação gerada em: Fevereiro de 2026_  
_Versão do projeto: 0.4_
