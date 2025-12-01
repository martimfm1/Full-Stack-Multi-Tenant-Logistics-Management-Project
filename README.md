# LogisticaPro - Sistema de Gestão Logística Multi-Tenant

Sistema completo e realista de gestão logística multi-tenant desenvolvido com Next.js, React e TypeScript.

## 🎯 Objetivos do Projeto

Este projeto tem como objetivo principal o **desenvolvimento de competências técnicas em backend e frontend**, através da implementação de um **sistema completo e realista de gestão logística multi-tenant**.

O projeto funciona também como **instrumento de avaliação técnica**, permitindo aferir o domínio de:

- Arquitetura de software e padrões de design
- Desenvolvimento full-stack (frontend + backend)
- Gestão de estado e fluxo de dados
- Multi-tenancy e isolamento de dados
- APIs RESTful e integração frontend-backend
- Banco de dados e modelagem de dados
- Autenticação e autorização
- Testes e qualidade de código
- DevOps e deploy

## 🏗️ Arquitetura

### Frontend

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19 + Tailwind CSS 4
- **Componentes**: shadcn/ui
- **Gestão de Estado**: Context API + useReducer
- **TypeScript**: Tipagem completa

### Backend (Estrutura Preparada)

- **API Routes**: Next.js API Routes
- **Autenticação**: Sistema de login com JWT (mock)
- **Multi-tenancy**: Isolamento por tenantId

## 📦 Módulos do Sistema

### 1. **Multi-Tenancy**
- Gestão de múltiplas organizações (tenants)
- Isolamento completo de dados por tenant
- Seletor de organização
- Context API para estado global

### 2. **Autenticação e Autorização**
- Sistema de login
- Gestão de usuários e roles
- Proteção de rotas
- Sessão persistente

### 3. **Gestão de Pedidos**
- Criação e edição de pedidos
- Status de pedidos
- Itens de pedido
- Histórico e rastreamento

### 4. **Gestão de Entregas**
- Criação de entregas
- Rastreamento em tempo real
- Status de entrega
- Eventos de entrega

### 5. **Gestão de Clientes**
- Cadastro de clientes
- Endereços e contatos
- Histórico de pedidos

### 6. **Gestão de Estoque**
- Controle de produtos
- Inventário por armazém
- Alertas de estoque baixo
- Movimentações

### 7. **Gestão de Rotas**
- Planejamento de rotas
- Otimização de entregas
- Acompanhamento em tempo real

### 8. **Relatórios e Analytics**
- Dashboard com métricas
- Relatórios personalizados
- Exportação de dados

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ ou superior
- pnpm (ou npm/yarn)

### Instalação

```bash
# Instalar dependências
pnpm install

# Executar em modo desenvolvimento
pnpm dev
```

A aplicação estará disponível em `http://localhost:3000`

### Credenciais de Teste

**Empresa 1:**
- Email: `admin@empresa1.com`
- Senha: qualquer senha

**Empresa 2:**
- Email: `admin@empresa2.com`
- Senha: qualquer senha

## 📁 Estrutura do Projeto

```
project-1/
├── app/
│   ├── (protected)/          # Rotas protegidas
│   │   ├── dashboard/        # Dashboard principal
│   │   ├── orders/           # Gestão de pedidos
│   │   ├── deliveries/       # Gestão de entregas
│   │   ├── customers/        # Gestão de clientes
│   │   ├── inventory/        # Gestão de estoque
│   │   ├── routes/           # Gestão de rotas
│   │   ├── reports/          # Relatórios
│   │   └── settings/         # Configurações
│   ├── api/                  # API Routes
│   │   └── auth/             # Autenticação
│   ├── login/                # Página de login
│   └── layout.tsx            # Layout raiz
├── components/
│   ├── ui/                   # Componentes UI base
│   ├── layout/               # Componentes de layout
│   └── dashboard/            # Componentes do dashboard
├── lib/
│   ├── types/                # Tipos TypeScript
│   │   └── logistics.ts      # Tipos do domínio logístico
│   ├── store/                # Gestão de estado
│   │   ├── tenant-context.tsx    # Context multi-tenant
│   │   └── logistics-context.tsx  # Context logístico
│   └── utils.ts              # Utilitários
└── public/                   # Arquivos estáticos
```

## 🎨 Design e UX

- **Design System**: Componentes coerentes e reutilizáveis
- **Responsividade**: Layout adaptativo para mobile e desktop
- **Acessibilidade**: ARIA labels e navegação por teclado
- **Dark Mode**: Suporte completo (preparado via CSS variables)

## 🔒 Segurança

- Isolamento de dados por tenant
- Autenticação e autorização
- Validação de dados
- Proteção de rotas

## 🧪 Próximos Passos

### Backend
- [ ] Integração com banco de dados (PostgreSQL/MongoDB)
- [ ] Autenticação JWT real
- [ ] API RESTful completa
- [ ] Validação de dados com Zod
- [ ] Middleware de autenticação

### Frontend
- [ ] Formulários completos (CRUD)
- [ ] Filtros e busca avançada
- [ ] Paginação
- [ ] Modais e diálogos
- [ ] Notificações
- [ ] Loading states

### Funcionalidades
- [ ] Rastreamento em tempo real
- [ ] Integração com APIs de transporte
- [ ] Geração de relatórios PDF
- [ ] Exportação de dados (CSV, Excel)
- [ ] Dashboard com gráficos

### Qualidade
- [ ] Testes unitários
- [ ] Testes de integração
- [ ] Testes E2E
- [ ] CI/CD
- [ ] Documentação da API

## 📝 Licença

Este projeto é um sistema de avaliação técnica e educacional.

## 👥 Contribuição

Este é um projeto de avaliação técnica. Para sugestões ou melhorias, abra uma issue.

---

**Desenvolvido com ❤️ usando Next.js, React e TypeScript**
