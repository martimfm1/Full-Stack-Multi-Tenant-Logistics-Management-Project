# Documentação da API - LogisticaPro

## Visão Geral

API RESTful centralizada para o sistema de gestão logística multi-tenant. Todos os endpoints requerem autenticação e isolam dados por tenant.

## Autenticação

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@empresa1.com",
  "password": "qualquer_senha"
}
```

**Resposta:**
```json
{
  "user": {
    "id": "1",
    "tenantId": "tenant-1",
    "email": "admin@empresa1.com",
    "name": "Admin Empresa 1",
    "role": "admin"
  },
  "tenant": {
    "id": "tenant-1",
    "name": "Empresa Logística ABC",
    "slug": "empresa-abc"
  },
  "token": "base64_encoded_token"
}
```

### Uso do Token

Todos os endpoints (exceto login) requerem o token no header:
```http
Authorization: Bearer {token}
```

## Endpoints

### Pedidos (Orders)

#### Listar Pedidos
```http
GET /api/orders?page=1&limit=10&status=pending&search=ORD-123
```

**Query Parameters:**
- `page` (number): Número da página (padrão: 1)
- `limit` (number): Itens por página (padrão: 10, máx: 100)
- `status` (string): Filtrar por status
- `search` (string): Buscar por número do pedido ou cliente
- `dateFrom` (string): Data inicial (ISO 8601)
- `dateTo` (string): Data final (ISO 8601)

**Resposta:**
```json
{
  "data": [
    {
      "id": "uuid",
      "tenantId": "tenant-1",
      "orderNumber": "ORD-1234567890-ABC",
      "customerId": "uuid",
      "status": "pending",
      "items": [...],
      "total": 1500.00,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

#### Criar Pedido
```http
POST /api/orders
Content-Type: application/json

{
  "customerId": "uuid",
  "items": [
    {
      "productId": "uuid",
      "quantity": 2,
      "unitPrice": 100.00
    }
  ],
  "shippingAddress": {
    "street": "Rua Exemplo",
    "number": "123",
    "neighborhood": "Centro",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01234567",
    "country": "Brasil"
  },
  "notes": "Observações opcionais"
}
```

#### Obter Pedido
```http
GET /api/orders/{id}
```

#### Atualizar Pedido
```http
PUT /api/orders/{id}
Content-Type: application/json

{
  "status": "confirmed",
  "notes": "Pedido confirmado"
}
```

#### Deletar Pedido
```http
DELETE /api/orders/{id}
```

### Entregas (Deliveries)

#### Listar Entregas
```http
GET /api/deliveries?page=1&limit=10&status=in_transit
```

#### Criar Entrega
```http
POST /api/deliveries
Content-Type: application/json

{
  "orderId": "uuid",
  "carrierId": "uuid",
  "trackingNumber": "TRACK123456",
  "origin": { ...address },
  "destination": { ...address },
  "estimatedDelivery": "2024-01-15T00:00:00.000Z"
}
```

### Clientes (Customers)

#### Listar Clientes
```http
GET /api/customers?page=1&limit=10&search=João
```

#### Criar Cliente
```http
POST /api/customers
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "+55 11 99999-9999",
  "document": "123.456.789-00",
  "address": { ...address }
}
```

### Produtos (Products)

#### Listar Produtos
```http
GET /api/products?page=1&limit=10&search=notebook
```

#### Criar Produto
```http
POST /api/products
Content-Type: application/json

{
  "sku": "PROD-001",
  "name": "Notebook Dell",
  "description": "Notebook Dell Inspiron 15",
  "category": "Eletrônicos",
  "unit": "unit",
  "weight": 2.5,
  "dimensions": {
    "length": 35,
    "width": 25,
    "height": 2
  },
  "price": 3500.00
}
```

## Validação de Dados

Todos os endpoints de criação/atualização validam os dados usando schemas Zod. Erros de validação retornam:

```json
{
  "error": "Dados inválidos",
  "details": [
    {
      "path": ["email"],
      "message": "Email inválido"
    }
  ]
}
```

## Isolamento Multi-Tenant

- Todos os dados são automaticamente filtrados por `tenantId`
- Usuários só podem acessar dados do seu próprio tenant
- Tentativas de acessar dados de outro tenant retornam 404 ou 403

## Estrutura de Respostas de Erro

### 400 - Bad Request
```json
{
  "error": "Dados inválidos",
  "details": [...]
}
```

### 401 - Unauthorized
```json
{
  "error": "Token de autenticação não fornecido"
}
```

### 404 - Not Found
```json
{
  "error": "Recurso não encontrado"
}
```

### 500 - Internal Server Error
```json
{
  "error": "Erro ao processar requisição"
}
```

## Cliente API (Frontend)

O frontend usa o cliente API em `lib/api/client.ts`:

```typescript
import { apiClient } from "@/lib/api/client"

// Listar pedidos
const result = await apiClient.getOrders({ page: 1, limit: 10 })

// Criar pedido
const result = await apiClient.createOrder(orderData)
```

O token é automaticamente incluído nas requisições a partir do localStorage.

## Próximos Passos

- [ ] Integração com banco de dados real (PostgreSQL/MongoDB)
- [ ] Autenticação JWT real
- [ ] Rate limiting
- [ ] Cache de respostas
- [ ] Webhooks para eventos
- [ ] Documentação OpenAPI/Swagger
- [ ] Testes automatizados da API

