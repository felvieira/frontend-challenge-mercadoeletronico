# 🛒 Orders Management System

> Uma aplicação moderna e robusta para gerenciamento de pedidos, desenvolvida com Vue 3, TypeScript e as melhores práticas do mercado.

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

---

## 📋 Sumário

- [✨ Características](#-características)
- [🚀 Início Rápido](#-início-rápido)
- [🏗️ Arquitetura](#️-arquitetura)
- [🎨 Padrões e Convenções](#-padrões-e-convenções)
- [🧪 Testes](#-testes)
- [📱 Responsividade](#-responsividade)
- [⚡ Performance](#-performance)
- [🔧 Configuração](#-configuração)
- [📦 Scripts Disponíveis](#-scripts-disponíveis)
- [🚀 Deploy](#-deploy)
- [🤝 Contribuição](#-contribuição)

## ✨ Características

### 🎯 Funcionalidades Principais
- **Listagem de Pedidos**: Visualização em cards com informações essenciais
- **Detalhes do Pedido**: Página completa com informações detalhadas
- **Pesquisa e Filtros**: Interface intuitiva para encontrar pedidos
- **Responsividade**: Adaptação perfeita para todos os dispositivos
- **Estados de Loading**: Feedback visual durante carregamento
- **Tratamento de Erros**: Mensagens claras e possibilidade de retry

### 🛠️ Stack Tecnológica

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **Vue 3** | `^3.5.13` | Framework reativo com Composition API |
| **TypeScript** | `~5.8.3` | Tipagem estática e IntelliSense |
| **Vite** | `^5.4.19` | Build tool rápido com HMR |
| **Tailwind CSS** | `^3.4.17` | Framework CSS utilitário |
| **Vue Router** | `^4.4.5` | Roteamento SPA |
| **TanStack Query** | `^5.61.5` | Cache e sincronização de estado |
| **Axios** | `^1.11.0` | Cliente HTTP com interceptadores |
| **Zod** | `^3.25.76` | Validação de schemas |
| **Vitest** | `^2.1.8` | Framework de testes unitários |
| **Playwright** | `^1.49.1` | Testes end-to-end |

---

## 🚀 Início Rápido

### Pré-requisitos
- **Node.js** >= 18.0.0 (recomendado LTS 20.x)
- **npm** >= 8.0.0 ou **pnpm** >= 8.0.0 (preferível)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/frontend-challenge-mercadoeletronico.git

# Navegue até o diretório
cd frontend-challenge-mercadoeletronico

# Instale as dependências
npm install
# ou
pnpm install
```

### Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
# Configuração da API
VITE_API_BASE_URL=https://api.mercadoe.space

# Configurações opcionais
VITE_APP_TITLE=Orders Management
VITE_APP_DESCRIPTION=Sistema de gerenciamento de pedidos
```

### Executar em Desenvolvimento

```bash
npm run dev
# ou
pnpm dev
```

A aplicação estará disponível em `http://localhost:5173`

---

## 🏗️ Arquitetura

### Estrutura de Diretórios

```
src/
├── app/                      # Configurações da aplicação
│   ├── App.vue              # Componente raiz
│   ├── main.ts              # Entry point
│   ├── providers/           # Provedores globais
│   ├── router/              # Configuração de rotas
│   └── styles/              # Estilos globais
├── modules/                 # Módulos de domínio
│   └── orders/              # Módulo de pedidos
│       ├── api/             # Serviços de API
│       ├── components/      # Componentes específicos
│       ├── composables/     # Hooks reutilizáveis
│       ├── pages/           # Páginas do módulo
│       ├── types/           # Tipos TypeScript
│       └── tests/           # Testes do módulo
└── shared/                  # Recursos compartilhados
    ├── components/          # Componentes reutilizáveis
    ├── composables/         # Hooks globais
    ├── constants/           # Constantes da aplicação
    ├── services/            # Serviços utilitários
    └── utils/               # Funções auxiliares
```

### Princípios de Design

#### 🎯 Clean Architecture
- **Separação de Responsabilidades**: Cada módulo tem sua própria responsabilidade
- **Inversão de Dependências**: Camadas superiores não dependem de detalhes
- **Testabilidade**: Arquitetura facilita testes unitários e de integração

#### 🔄 Composição sobre Herança
- Uso extensivo da Composition API
- Composables reutilizáveis para lógica compartilhada
- Componentes pequenos e focados

#### 📦 Modularidade
- Código organizado por domínios (orders, users, etc.)
- Imports explícitos e path aliases
- Lazy loading para otimização

## 🎨 Padrões e Convenções

### 📝 Nomenclatura BEM (Block Element Modifier)

Aplicamos a metodologia BEM para CSS, garantindo consistência e manutenibilidade:

```vue
<template>
  <!-- Block -->
  <div class="order-card">
    <!-- Element -->
    <div class="order-card__header">
      <!-- Element with Modifier -->
      <h2 class="order-card__title order-card__title--large">
        {{ title }}
      </h2>
    </div>
  </div>
</template>

<style scoped>
/* Block */
.order-card {
  @apply bg-white rounded-lg shadow;
}

/* Element */
.order-card__header {
  @apply p-4 border-b;
}

/* Element with Modifier */
.order-card__title--large {
  @apply text-xl font-bold;
}
</style>
```

### 🔧 Princípios DRY (Don't Repeat Yourself)

#### Constantes Reutilizáveis
```typescript
// ❌ Repetição
const statusColors = {
  confirmed: 'text-green-600',
  pending: 'text-yellow-600'
}

// ✅ DRY
import { STATUS_COLORS } from '@/shared/constants'
const statusColor = STATUS_COLORS[status] || STATUS_COLORS.default
```

#### Composables Reutilizáveis
```typescript
// useLoadingState.ts - Reutilizável em qualquer componente
export function useLoadingState() {
  const isLoading = ref(false)
  const error = ref(null)
  // ... lógica compartilhada
  return { isLoading, error, setLoading, setError }
}
```

### 🧹 Clean Code

#### Funções Pequenas e Focadas
```typescript
// ❌ Função grande fazendo muitas coisas
function processOrder(order) {
  // validação
  // formatação
  // envio
  // logging
}

// ✅ Funções focadas
function validateOrder(order) { /* ... */ }
function formatOrder(order) { /* ... */ }
function sendOrder(order) { /* ... */ }
function logOrder(order) { /* ... */ }
```

#### Nomes Descritivos
```typescript
// ❌ Nomes vagos
const data = await api.get('/orders')
const result = processData(data)

// ✅ Nomes descritivos
const orders = await ordersApi.getOrders()
const formattedOrders = formatOrdersForDisplay(orders)
```

---

## 🧪 Testes

### Estratégia de Testes

#### 🔧 Testes Unitários (Vitest)
- **Componentes**: Renderização e comportamento
- **Composables**: Lógica reativa
- **Utilitários**: Funções puras

```bash
# Executar todos os testes
npm run test

# Modo watch
npm run test:watch

# Coverage
npm run test:coverage
```

#### 🌐 Testes E2E (Playwright)
- **Fluxos críticos**: Navegação entre páginas
- **Interações**: Clicks, formulários
- **Estados**: Loading, erro, sucesso

```bash
# Executar E2E
npm run test:e2e

# Modo interativo
npm run test:e2e:ui

# Debug
npm run test:e2e:debug
```

### Exemplos de Testes

#### Teste Unitário
```typescript
// OrderCard.spec.ts
import { mount } from '@vue/test-utils'
import OrderCard from '../OrderCard.vue'

describe('OrderCard', () => {
  it('formata o valor corretamente', () => {
    const wrapper = mount(OrderCard, {
      props: {
        order: { amount: 20000, currency: 'USD' }
      }
    })
    
    expect(wrapper.text()).toContain('$20,000')
  })
})
```

#### Teste E2E
```typescript
// orders.spec.ts
import { test, expect } from '@playwright/test'

test('navega para detalhes do pedido', async ({ page }) => {
  await page.goto('/orders')
  await page.click('[data-testid="order-card-1"]')
  
  await expect(page).toHaveURL('/orders/1')
  await expect(page.getByRole('heading')).toContainText('Order Details')
})
```

---

## 📱 Responsividade

### Breakpoints Tailwind

| Breakpoint | Largura | Uso |
|------------|---------|-----|
| `sm` | 640px+ | Tablet portrait |
| `md` | 768px+ | Tablet landscape |
| `lg` | 1024px+ | Desktop pequeno |
| `xl` | 1280px+ | Desktop médio |
| `2xl` | 1536px+ | Desktop grande |

### Estratégia Mobile-First

```vue
<template>
  <!-- Base: mobile -->
  <div class="grid grid-cols-1 gap-4
    <!-- Tablet: 2 colunas -->
    sm:grid-cols-2 sm:gap-6
    <!-- Desktop: 3 colunas -->
    lg:grid-cols-3 lg:gap-8">
    
    <!-- Cards responsivos -->
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Conteúdo se adapta -->
    </div>
  </div>
</template>
```

---

## ⚡ Performance

### Otimizações Implementadas

#### 🚀 Code Splitting
- Lazy loading de rotas
- Componentes carregados sob demanda
- Chunks otimizados pelo Vite

#### 💾 Cache Inteligente
- TanStack Query para cache de API
- Cache local com TTL configurável
- Invalidação automática

#### 🖼️ Lazy Loading
- Imagens carregadas quando visíveis
- Skeleton loading para melhor UX
- Intersection Observer API

#### 📦 Bundle Optimization
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          ui: ['@headlessui/vue', '@heroicons/vue']
        }
      }
    }
  }
})
```

---

## 🔧 Configuração

### Variáveis de Ambiente

```env
# .env.local
VITE_API_BASE_URL=https://api.mercadoe.space
VITE_APP_TITLE=Orders Management
VITE_APP_VERSION=1.0.0

# Desenvolvimento
VITE_LOG_LEVEL=debug
VITE_ENABLE_MOCK=false

# Produção
VITE_LOG_LEVEL=error
VITE_ENABLE_ANALYTICS=true
```

### Configurações do Editor

#### VS Code (recomendado)
```json
// .vscode/settings.json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

#### Extensões Recomendadas
- Vue Language Features (Volar)
- TypeScript Vue Plugin (Volar)
- ESLint
- Prettier
- Tailwind CSS IntelliSense

---

## 📦 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `dev` | Servidor de desenvolvimento |
| `build` | Build para produção |
| `preview` | Preview do build |
| `lint` | Verificar e corrigir código |
| `lint:check` | Apenas verificar (CI) |
| `format` | Formatar código |
| `test` | Testes unitários |
| `test:coverage` | Coverage dos testes |
| `test:e2e` | Testes E2E |
| `typecheck` | Verificação de tipos |

### Hooks Git (Husky)
- **pre-commit**: ESLint + Prettier + testes rápidos
- **commit-msg**: Validação do padrão Conventional Commits

## 🚀 Deploy

### Plataformas Recomendadas

#### Vercel (Recomendado)
```bash
# Deploy automático via GitHub
1. Conecte o repositório ao Vercel
2. Configure as variáveis de ambiente:
   - VITE_API_BASE_URL=https://api.mercadoe.space
3. Deploy automático a cada push
```

#### Netlify
```bash
# Build settings
Build command: npm run build
Publish directory: dist
Environment variables: VITE_API_BASE_URL
```

#### Docker
```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint:check
      - run: npm run typecheck
      - run: npm run test
      - run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 🤝 Contribuição

### Workflow de Contribuição

1. **Fork** o repositório
2. **Clone** sua fork localmente
3. **Crie** uma branch para sua feature: `git checkout -b feat/nova-funcionalidade`
4. **Desenvolva** seguindo os padrões estabelecidos
5. **Teste** suas alterações: `npm run test && npm run test:e2e`
6. **Commit** seguindo Conventional Commits: `git commit -m "feat: adiciona nova funcionalidade"`
7. **Push** para sua branch: `git push origin feat/nova-funcionalidade`
8. **Abra** um Pull Request

### Padrões de Commit

Seguimos o [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Tipos principais
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: tarefas de build/configuração

# Exemplos
feat(orders): adiciona filtro por status
fix(api): corrige timeout de requisições
docs: atualiza README com novos scripts
```

### Code Review

#### Checklist para PRs
- [ ] Código segue os padrões estabelecidos (ESLint + Prettier)
- [ ] Componentes seguem nomenclatura BEM
- [ ] Funções seguem princípios DRY e Clean Code
- [ ] Testes unitários para nova funcionalidade
- [ ] Testes E2E para fluxos críticos
- [ ] TypeScript sem erros
- [ ] Build passa sem erros
- [ ] Performance não foi degradada

### Estrutura de Branches

```
main              # Branch principal (produção)
├── develop       # Branch de desenvolvimento
├── feat/*        # Features em desenvolvimento
├── fix/*         # Correções de bugs
├── hotfix/*      # Correções urgentes
└── release/*     # Preparação de releases
```

### Relatório de Bugs

Ao reportar bugs, inclua:

1. **Descrição clara** do problema
2. **Passos para reproduzir**
3. **Comportamento esperado vs atual**
4. **Screenshots/vídeos** se aplicável
5. **Ambiente** (browser, OS, versão)
6. **Console logs** relevantes

### Solicitação de Features

Para solicitar novas funcionalidades:

1. **Contexto** e justificativa
2. **Casos de uso** específicos
3. **Mockups/wireframes** se disponível
4. **Prioridade** e impacto
5. **Alternativas consideradas**

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

## 🙏 Agradecimentos

- **Vue.js Team** pelo framework fantástico
- **Tailwind Labs** pelo sistema de design
- **TanStack** pelas ferramenias de estado
- **Vite Team** pela experiência de desenvolvimento

---

## 📞 Suporte

- 📧 **Email**: suporte@projeto.com
- 💬 **Discord**: [Link do servidor](https://discord.gg/projeto)
- 📖 **Documentação**: [Link da documentação](https://docs.projeto.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/usuario/projeto/issues)

---

<div align="center">

**Desenvolvido com ❤️ usando as melhores práticas do mercado**

[![Vue.js](https://img.shields.io/badge/Made%20with-Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>