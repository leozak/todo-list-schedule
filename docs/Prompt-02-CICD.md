# Passo 2: Configurar Conta GCP

## Objetivo

Criar e configurar o projeto no Google Cloud Platform, habilitando os serviços necessários para o deploy da aplicação.

---

## 2.1 Criar Conta no Google Cloud

### Se você NÃO tem conta GCP:

1. Acesse [cloud.google.com](https://cloud.google.com)
2. Clique em **"Get started for free"**
3. Faça login com sua conta Google
4. Preencha os dados de faturamento (cartão de crédito)

### 💰 Créditos Gratuitos

| Benefício                | Valor                               |
| ------------------------ | ----------------------------------- |
| **Crédito inicial**      | $300 USD (90 dias)                  |
| **Free Tier permanente** | Diversos serviços com limite mensal |

> ⚠️ O cartão é necessário, mas **não será cobrado** automaticamente após os créditos acabarem. O GCP pede confirmação antes.

---

## 2.2 Criar Projeto

### Via Console Web

1. Acesse [console.cloud.google.com](https://console.cloud.google.com)
2. No topo da página, clique no **seletor de projetos**
3. Clique em **"New Project"**
4. Preencha:
   - **Project name:** `meu-projeto-app` (nome amigável)
   - **Project ID:** `meu-projeto-app-12345` (único globalmente)
   - **Organization:** Deixe como "No organization" se for pessoal

```
┌─────────────────────────────────────────┐
│           New Project                   │
├─────────────────────────────────────────┤
│  Project name:  meu-projeto-app         │
│  Project ID:    meu-projeto-app-12345   │
│  Location:      No organization         │
│                                         │
│              [ CREATE ]                 │
└─────────────────────────────────────────┘
```

### Via Terminal (gcloud CLI)

```bash
# Criar projeto
gcloud projects create meu-projeto-app-12345 --name="Meu Projeto App"

# Definir como projeto padrão
gcloud config set project meu-projeto-app-12345
```

---

## 2.3 Instalar Google Cloud CLI

### Linux / macOS

```bash
# Download e instalação
curl https://sdk.cloud.google.com | bash

# Reinicie o terminal ou execute:
source ~/.bashrc  # Linux
source ~/.zshrc   # macOS com zsh

# Verifique a instalação
gcloud --version
```

### Windows

1. Baixe o instalador: [cloud.google.com/sdk/docs/install](https://cloud.google.com/sdk/docs/install)
2. Execute o `.exe` e siga o assistente
3. Abra o **Google Cloud SDK Shell**

### Inicializar e Autenticar

```bash
# Fazer login (abre navegador)
gcloud auth login

# Configurar projeto padrão
gcloud config set project meu-projeto-app-12345

# Verificar configuração
gcloud config list
```

**Resultado esperado:**

```
[core]
account = seu-email@gmail.com
project = meu-projeto-app-12345
```

---

## 2.4 Habilitar APIs Necessárias

O GCP exige que você **habilite cada API** antes de usar.

### Via Terminal (Recomendado)

```bash
# Habilitar todas as APIs necessárias de uma vez
gcloud services enable \
    cloudbuild.googleapis.com \
    run.googleapis.com \
    artifactregistry.googleapis.com \
    secretmanager.googleapis.com \
    cloudresourcemanager.googleapis.com \
    iam.googleapis.com
```

### Via Console Web

1. Acesse **APIs & Services** > **Library**
2. Pesquise e habilite cada uma:

| API                            | Função                   |
| ------------------------------ | ------------------------ |
| **Cloud Build API**            | Pipeline CI/CD           |
| **Cloud Run API**              | Hospedar backend         |
| **Artifact Registry API**      | Armazenar imagens Docker |
| **Secret Manager API**         | Variáveis sensíveis      |
| **Cloud Resource Manager API** | Gerenciar recursos       |
| **IAM API**                    | Permissões               |

### Verificar APIs Habilitadas

```bash
gcloud services list --enabled
```

---

## 2.5 Configurar Billing (Faturamento)

### Verificar se Billing está Ativo

```bash
gcloud billing accounts list
```

### Vincular Billing ao Projeto

```bash
# Listar contas de faturamento
gcloud billing accounts list

# Vincular (substitua BILLING_ACCOUNT_ID)
gcloud billing projects link meu-projeto-app-12345 \
    --billing-account=BILLING_ACCOUNT_ID
```

### Criar Alerta de Orçamento (Importante!)

1. Acesse **Billing** > **Budgets & alerts**
2. Clique em **"Create Budget"**
3. Configure:

```
┌─────────────────────────────────────────┐
│           Create Budget                 │
├─────────────────────────────────────────┤
│  Name:           Alerta Mensal          │
│  Projects:       meu-projeto-app-12345  │
│  Amount:         $10 (ou valor desejado)│
│                                         │
│  Alerts at:                             │
│    ☑ 50%  - Email                       │
│    ☑ 90%  - Email                       │
│    ☑ 100% - Email                       │
│                                         │
│              [ CREATE ]                 │
└─────────────────────────────────────────┘
```

---

## 2.6 Configurar Região Padrão

```bash
# Ver regiões disponíveis
gcloud compute regions list

# Configurar região padrão (São Paulo)
gcloud config set run/region southamerica-east1

# Verificar
gcloud config get-value run/region
```

### Regiões Recomendadas para Brasil

| Região               | Localização     | Latência                    |
| -------------------- | --------------- | --------------------------- |
| `southamerica-east1` | São Paulo       | Melhor para BR              |
| `us-east1`           | Carolina do Sul | Boa opção, mais barato      |
| `us-central1`        | Iowa            | Muitos serviços disponíveis |

---

## 2.7 Configurar Service Account (Conta de Serviço)

O Cloud Build precisa de permissões para fazer deploy.

### Verificar Service Account do Cloud Build

```bash
# O Cloud Build cria automaticamente uma service account
# Formato: PROJECT_NUMBER@cloudbuild.gserviceaccount.com

# Descobrir o número do projeto
gcloud projects describe meu-projeto-app-12345 --format="value(projectNumber)"
```

### Adicionar Permissões Necessárias

```bash
# Variável com o número do projeto
PROJECT_NUMBER=$(gcloud projects describe meu-projeto-app-12345 --format="value(projectNumber)")

# Permissão para deploy no Cloud Run
gcloud projects add-iam-policy-binding meu-projeto-app-12345 \
    --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
    --role="roles/run.admin"

# Permissão para atuar como service account
gcloud projects add-iam-policy-binding meu-projeto-app-12345 \
    --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
    --role="roles/iam.serviceAccountUser"

# Permissão para acessar Storage (frontend)
gcloud projects add-iam-policy-binding meu-projeto-app-12345 \
    --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
    --role="roles/storage.admin"
```

---

## 2.8 Verificação Final

Execute estes comandos para verificar se tudo está configurado:

```bash
# 1. Verificar autenticação
gcloud auth list

# 2. Verificar projeto
gcloud config get-value project

# 3. Verificar região
gcloud config get-value run/region

# 4. Verificar APIs habilitadas
gcloud services list --enabled --filter="NAME:(cloudbuild OR run OR artifactregistry)"

# 5. Verificar billing
gcloud billing projects describe meu-projeto-app-12345
```

**Resultado esperado:**

```
✓ Conta autenticada
✓ Projeto: meu-projeto-app-12345
✓ Região: southamerica-east1
✓ APIs: cloudbuild, run, artifactregistry habilitadas
✓ Billing: ativo
```

---

## Checklist do Passo 2

- [ ] Conta GCP criada
- [ ] Projeto criado com ID único
- [ ] gcloud CLI instalado e autenticado
- [ ] APIs necessárias habilitadas
- [ ] Billing configurado e vinculado
- [ ] Alerta de orçamento criado
- [ ] Região padrão configurada
- [ ] Permissões do Cloud Build configuradas
- [ ] Verificação final executada com sucesso

---

## Custos Estimados (Free Tier)

| Serviço               | Limite Gratuito    | Seu Uso Estimado |
| --------------------- | ------------------ | ---------------- |
| **Cloud Run**         | 2M requisições/mês | ✅ Dentro        |
| **Cloud Build**       | 120 min/dia        | ✅ Dentro        |
| **Artifact Registry** | 500MB              | ✅ Dentro        |
| **Cloud Storage**     | 5GB                | ✅ Dentro        |

> 💡 Para projetos pequenos/médios, você provavelmente ficará dentro do Free Tier.

---

## Prompts Sugeridos para Esclarecer

1. **"O que é uma Service Account e por que preciso configurar?"**
2. **"Como funciona o billing do GCP? Posso ser cobrado sem querer?"**
3. **"Qual a diferença entre Project ID e Project Number?"**
4. **"Como remover um projeto GCP se eu não quiser mais usar?"**
5. **"Como dar permissões para outro desenvolvedor acessar o projeto?"**

---

## Prompt para Continuar

Quando terminar o Passo 2, use:

> **"Passo 2 concluído. Vamos para o Passo 3: Containerizar com Docker."**

---

Conseguiu criar o projeto e configurar tudo? Algum erro ou dúvida nos comandos?
