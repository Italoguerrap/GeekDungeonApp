# 🎮 Guia Completo de Backend - Geek Dungeon Admin
## PARTE 3: Endpoints Completos para o Frontend

---

## 📝 CORREÇÃO: UserRole Enum

**Domain/Enums/UserRole.cs:**
```csharp
namespace GeekDungeon.Domain.Enums;

public enum UserRole
{
    Cliente = 0,  // Usuário da loja (frontend público)
    Admin = 1     // Administrador (painel admin)
}
```

---

## 🌐 TODOS OS ENDPOINTS NECESSÁRIOS

### 📌 Mapeamento Frontend → Backend

Vou listar **TODOS** os endpoints que o painel administrativo precisa consumir, organizados por módulo:

---

## 1️⃣ AUTENTICAÇÃO (`/api/auth`)

### POST `/api/auth/login`
**Usado em:** Tela de login  
**Request:**
```json
{
  "email": "admin@geekdungeon.com",
  "password": "senha123"
}
```
**Response:**
```json
{
  "user": {
    "id": "uuid",
    "name": "Admin",
    "email": "admin@geekdungeon.com",
    "role": "Admin",
    "avatar": "url"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "uuid-refresh-token"
}
```

### POST `/api/auth/refresh`
**Usado em:** Renovar token expirado  
**Request:**
```json
{
  "refreshToken": "uuid-refresh-token"
}
```
**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### POST `/api/auth/logout`
**Usado em:** Botão "Sair" no header  
**Request:**
```json
{
  "refreshToken": "uuid-refresh-token"
}
```
**Response:**
```json
{
  "message": "Logout realizado com sucesso"
}
```

### GET `/api/auth/profile`
**Usado em:** Página "Meu Perfil" e Header (foto/nome)  
**Headers:** `Authorization: Bearer {token}`  
**Response:**
```json
{
  "id": "uuid",
  "name": "Admin",
  "email": "admin@geekdungeon.com",
  "phone": "(11) 99999-9999",
  "role": "Admin",
  "avatar": "url",
  "lastLogin": "2025-10-22T10:30:00Z",
  "createdAt": "2024-01-15T08:00:00Z"
}
```

### PUT `/api/auth/profile`
**Usado em:** Editar perfil (Meu Perfil → Informações Pessoais)  
**Headers:** `Authorization: Bearer {token}`  
**Request:**
```json
{
  "name": "Novo Nome",
  "phone": "(11) 98888-8888",
  "avatar": "nova-url"
}
```
**Response:**
```json
{
  "id": "uuid",
  "name": "Novo Nome",
  "email": "admin@geekdungeon.com",
  "phone": "(11) 98888-8888",
  "avatar": "nova-url"
}
```

### PUT `/api/auth/change-password`
**Usado em:** Meu Perfil → Segurança → Alterar Senha  
**Headers:** `Authorization: Bearer {token}`  
**Request:**
```json
{
  "currentPassword": "senha123",
  "newPassword": "novaSenha456",
  "confirmPassword": "novaSenha456"
}
```
**Response:**
```json
{
  "message": "Senha alterada com sucesso"
}
```

---

## 2️⃣ CATEGORIAS (`/api/categories`)

### GET `/api/categories`
**Usado em:** Listagem de categorias + Select de categoria nos produtos  
**Headers:** `Authorization: Bearer {token}`  
**Query Params:** `?page=1&pageSize=10&search=jogos&onlyActive=true`  
**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "name": "Jogos de PS5",
      "slug": "jogos-ps5",
      "description": "Jogos exclusivos e cross-platform para PlayStation 5",
      "image": "url",
      "icon": "🎮",
      "parentId": null,
      "isActive": true,
      "order": 1,
      "productsCount": 45,
      "createdAt": "2024-01-15T08:00:00Z"
    }
  ],
  "totalCount": 8,
  "page": 1,
  "pageSize": 10,
  "totalPages": 1
}
```

### GET `/api/categories/{id}`
**Usado em:** Editar categoria (preencher formulário)  
**Headers:** `Authorization: Bearer {token}`  
**Response:**
```json
{
  "id": "uuid",
  "name": "Jogos de PS5",
  "slug": "jogos-ps5",
  "description": "Descrição...",
  "image": "url",
  "icon": "🎮",
  "parentId": null,
  "isActive": true,
  "order": 1
}
```

### POST `/api/categories`
**Usado em:** Criar nova categoria  
**Headers:** `Authorization: Bearer {token}`  
**Request:**
```json
{
  "name": "Jogos de Xbox",
  "slug": "jogos-xbox",
  "description": "Descrição...",
  "image": "url",
  "icon": "🎮",
  "parentId": null,
  "isActive": true,
  "order": 5
}
```
**Response:**
```json
{
  "id": "uuid-novo",
  "name": "Jogos de Xbox",
  "slug": "jogos-xbox",
  ...
}
```

### PUT `/api/categories/{id}`
**Usado em:** Editar categoria existente  
**Headers:** `Authorization: Bearer {token}`  
**Request:** (mesmo formato do POST)  
**Response:** Categoria atualizada

### DELETE `/api/categories/{id}`
**Usado em:** Excluir categoria  
**Headers:** `Authorization: Bearer {token}`  
**Response:**
```json
{
  "message": "Categoria excluída com sucesso"
}
```

---

## 3️⃣ PRODUTOS (`/api/products`)

### GET `/api/products`
**Usado em:** Listagem de produtos  
**Query Params:** `?page=1&pageSize=20&search=god&categoryId=uuid&onlyActive=true&sortBy=createdAt&sortOrder=desc`  
**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "name": "God of War Ragnarök",
      "slug": "god-of-war-ragnarok",
      "description": "Descrição completa...",
      "shortDescription": "Descrição curta",
      "price": 299.90,
      "compareAtPrice": 349.90,
      "cost": 150.00,
      "sku": "PS5-GOW-001",
      "barcode": "7891234567890",
      "stock": 45,
      "lowStockAlert": 10,
      "trackInventory": true,
      "isActive": true,
      "isFeatured": true,
      "images": ["url1", "url2", "url3"],
      "categoryId": "uuid",
      "categoryName": "Jogos de PS5",
      "weight": 0.15,
      "views": 1250,
      "sales": 89,
      "createdAt": "2024-10-01T10:00:00Z"
    }
  ],
  "totalCount": 156,
  "page": 1,
  "pageSize": 20,
  "totalPages": 8
}
```

### GET `/api/products/{id}`
**Usado em:** Editar produto  
**Response:** Produto completo (mesmo formato do array acima)

### POST `/api/products`
**Usado em:** Criar produto  
**Request:**
```json
{
  "name": "Produto Novo",
  "slug": "produto-novo",
  "description": "Descrição...",
  "shortDescription": "Curta",
  "price": 199.90,
  "compareAtPrice": 249.90,
  "cost": 100.00,
  "sku": "SKU-001",
  "barcode": "1234567890123",
  "stock": 50,
  "lowStockAlert": 10,
  "trackInventory": true,
  "isActive": true,
  "isFeatured": false,
  "images": ["url1", "url2"],
  "categoryId": "uuid",
  "weight": 0.5,
  "weightUnit": "kg",
  "dimensions": "20x15x5",
  "metaTitle": "Título SEO",
  "metaDescription": "Descrição SEO"
}
```

### PUT `/api/products/{id}`
**Usado em:** Editar produto  
**Request:** (mesmo formato do POST)

### DELETE `/api/products/{id}`
**Usado em:** Excluir produto  
**Response:** `{ "message": "Produto excluído" }`

### GET `/api/products/low-stock`
**Usado em:** Dashboard → Produtos com estoque baixo  
**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "name": "Produto X",
      "stock": 5,
      "lowStockAlert": 10,
      "sku": "SKU-001"
    }
  ],
  "totalCount": 34
}
```

---

## 4️⃣ CLIENTES (`/api/customers`)

### GET `/api/customers`
**Usado em:** Listagem de clientes  
**Query Params:** `?page=1&pageSize=20&search=joao&status=active&isBanned=false`  
**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "name": "João Silva",
      "email": "joao@email.com",
      "phone": "(11) 99999-9999",
      "document": "123.456.789-00",
      "birthDate": "1990-05-15",
      "avatar": "url",
      "isActive": true,
      "isBanned": false,
      "ordersCount": 12,
      "totalSpent": 2450.80,
      "averageOrderValue": 204.23,
      "lastOrderDate": "2025-10-15T14:30:00Z",
      "createdAt": "2024-01-10T08:00:00Z"
    }
  ],
  "totalCount": 1245,
  "page": 1,
  "pageSize": 20,
  "totalPages": 63
}
```

### GET `/api/customers/{id}`
**Usado em:** Detalhes do cliente + Editar  
**Response:**
```json
{
  "id": "uuid",
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "(11) 99999-9999",
  "document": "123.456.789-00",
  "birthDate": "1990-05-15",
  "avatar": "url",
  "isActive": true,
  "isBanned": false,
  "banReason": null,
  "bannedAt": null,
  "notes": "Cliente VIP",
  "address": {
    "street": "Rua Principal",
    "number": "100",
    "complement": "Apto 201",
    "neighborhood": "Centro",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01234-567",
    "country": "Brasil"
  },
  "stats": {
    "ordersCount": 12,
    "totalSpent": 2450.80,
    "averageOrderValue": 204.23
  },
  "createdAt": "2024-01-10T08:00:00Z"
}
```

### POST `/api/customers`
**Usado em:** Criar cliente  
**Request:**
```json
{
  "name": "Maria Santos",
  "email": "maria@email.com",
  "phone": "(11) 98888-8888",
  "document": "987.654.321-00",
  "birthDate": "1985-08-20",
  "isActive": true,
  "notes": "Cliente indicado",
  "address": {
    "street": "Av. Paulista",
    "number": "1000",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01310-100"
  }
}
```

### PUT `/api/customers/{id}`
**Usado em:** Editar cliente  
**Request:** (mesmo formato do POST)

### DELETE `/api/customers/{id}`
**Usado em:** Excluir cliente

### PUT `/api/customers/{id}/ban`
**Usado em:** Banir cliente  
**Request:**
```json
{
  "reason": "Fraude detectada"
}
```
**Response:**
```json
{
  "message": "Cliente banido com sucesso"
}
```

### PUT `/api/customers/{id}/unban`
**Usado em:** Desbanir cliente  
**Response:**
```json
{
  "message": "Cliente desbanido com sucesso"
}
```

---

## 5️⃣ PEDIDOS (`/api/orders`)

### GET `/api/orders`
**Usado em:** Listagem de pedidos  
**Query Params:** `?page=1&pageSize=20&status=processing&search=GD-2024&customerId=uuid&startDate=2024-01-01&endDate=2024-12-31`  
**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "orderNumber": "GD-2024-00156",
      "customerId": "uuid",
      "customerName": "João Silva",
      "customerEmail": "joao@email.com",
      "status": "Processing",
      "paymentMethod": "CreditCard",
      "subtotal": 599.80,
      "shippingCost": 25.00,
      "discount": 50.00,
      "tax": 0.00,
      "total": 574.80,
      "itemsCount": 3,
      "createdAt": "2025-10-20T14:30:00Z",
      "paidAt": "2025-10-20T14:35:00Z"
    }
  ],
  "totalCount": 875,
  "page": 1,
  "pageSize": 20,
  "totalPages": 44
}
```

### GET `/api/orders/{id}`
**Usado em:** Modal de detalhes do pedido  
**Response:**
```json
{
  "id": "uuid",
  "orderNumber": "GD-2024-00156",
  "customer": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "(11) 99999-9999"
  },
  "status": "Processing",
  "paymentMethod": "CreditCard",
  "paymentId": "PAY-123456",
  "paidAt": "2025-10-20T14:35:00Z",
  "subtotal": 599.80,
  "shippingCost": 25.00,
  "discount": 50.00,
  "tax": 0.00,
  "total": 574.80,
  "coupon": {
    "id": "uuid",
    "code": "PROMO10"
  },
  "items": [
    {
      "id": "uuid",
      "productId": "uuid",
      "productName": "God of War Ragnarök",
      "productSku": "PS5-GOW-001",
      "productImage": "url",
      "quantity": 2,
      "unitPrice": 299.90,
      "subtotal": 599.80
    }
  ],
  "shippingAddress": {
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "(11) 99999-9999",
    "street": "Rua Principal",
    "number": "100",
    "complement": "Apto 201",
    "neighborhood": "Centro",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01234-567",
    "country": "Brasil"
  },
  "trackingCode": "BR123456789",
  "shippingCarrier": "Correios",
  "shippedAt": null,
  "deliveredAt": null,
  "customerNotes": "Entregar após 18h",
  "adminNotes": "Cliente VIP",
  "createdAt": "2025-10-20T14:30:00Z"
}
```

### PUT `/api/orders/{id}/status`
**Usado em:** Atualizar status do pedido  
**Request:**
```json
{
  "status": "Shipped",
  "trackingCode": "BR987654321",
  "shippingCarrier": "Correios"
}
```

### PUT `/api/orders/{id}/cancel`
**Usado em:** Cancelar pedido  
**Request:**
```json
{
  "reason": "Produto indisponível"
}
```

---

## 6️⃣ CUPONS (`/api/coupons`)

### GET `/api/coupons`
**Query Params:** `?page=1&pageSize=20&onlyActive=true&search=PROMO`  
**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "code": "PROMO10",
      "description": "10% de desconto",
      "type": "Percentage",
      "value": 10.00,
      "minimumOrderValue": 100.00,
      "maximumDiscount": 50.00,
      "usageLimit": 100,
      "usageCount": 45,
      "startsAt": "2024-10-01T00:00:00Z",
      "expiresAt": "2024-12-31T23:59:59Z",
      "isActive": true,
      "createdAt": "2024-09-25T10:00:00Z"
    }
  ],
  "totalCount": 23,
  "page": 1,
  "pageSize": 20,
  "totalPages": 2
}
```

### GET `/api/coupons/{id}`
**Response:** Cupom completo

### POST `/api/coupons`
**Request:**
```json
{
  "code": "BLACKFRIDAY",
  "description": "Black Friday 2024",
  "type": "Percentage",
  "value": 25.00,
  "minimumOrderValue": 200.00,
  "maximumDiscount": 150.00,
  "usageLimit": 500,
  "startsAt": "2024-11-20T00:00:00Z",
  "expiresAt": "2024-11-30T23:59:59Z",
  "isActive": true
}
```

### PUT `/api/coupons/{id}`
### DELETE `/api/coupons/{id}`

---

## 7️⃣ BANNERS (`/api/banners`)

### GET `/api/banners`
**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "title": "Black Friday 2024",
      "subtitle": "Até 50% OFF",
      "description": "Promoções imperdíveis!",
      "imageUrl": "url-desktop",
      "imageMobileUrl": "url-mobile",
      "linkUrl": "/promocoes/black-friday",
      "buttonText": "Ver Ofertas",
      "type": "hero",
      "order": 1,
      "isActive": true,
      "startsAt": "2024-11-20T00:00:00Z",
      "expiresAt": "2024-11-30T23:59:59Z"
    }
  ]
}
```

### POST `/api/banners`
### PUT `/api/banners/{id}`
### DELETE `/api/banners/{id}`

---

## 8️⃣ RELATÓRIOS (`/api/reports`)

### GET `/api/reports/overview`
**Usado em:** Reports → Aba Visão Geral  
**Query Params:** `?period=month&startDate=2024-10-01&endDate=2024-10-31`  
**Response:**
```json
{
  "revenue": {
    "total": 15912.15,
    "growth": 12.5,
    "target": 20000.00,
    "targetProgress": 79.56
  },
  "profit": {
    "total": 6364.86,
    "margin": 40.0
  },
  "orders": {
    "total": 175,
    "growth": 8.2
  },
  "averageTicket": {
    "value": 90.93,
    "growth": 5.1
  },
  "salesByDay": [
    {
      "date": "2024-10-15",
      "orders": 28,
      "revenue": 2544.50,
      "cost": 1526.70,
      "profit": 1017.80
    }
  ],
  "categoryPerformance": [
    {
      "categoryName": "Jogos de PS5",
      "sales": 89,
      "revenue": 5234.80,
      "percentage": 32.9,
      "growth": 15.2
    }
  ]
}
```

### GET `/api/reports/financial`
**Usado em:** Reports → Aba Financeiro  
**Response:**
```json
{
  "income": {
    "grossRevenue": 15912.15,
    "costs": 9547.29,
    "grossProfit": 6364.86
  },
  "expenses": {
    "operational": 3500.00,
    "shipping": 1250.80,
    "marketing": 1500.00,
    "taxes": 2890.45,
    "refunds": 450.30
  },
  "netProfit": 6364.86,
  "netMargin": 40.0,
  "paymentMethods": [
    {
      "method": "CreditCard",
      "transactions": 120,
      "amount": 10899.67,
      "percentage": 68.5
    }
  ]
}
```

### GET `/api/reports/products`
**Response:** Top produtos, estoque, etc

### GET `/api/reports/customers`
**Response:** Métricas de clientes (LTV, retenção, etc)

### GET `/api/reports/operational`
**Response:** Status de pedidos, prazos, etc

---

## 9️⃣ CONFIGURAÇÕES (`/api/settings`)

### GET `/api/settings`
**Usado em:** Página de Configurações (carregar dados)  
**Response:**
```json
{
  "id": "uuid",
  "storeName": "Geek Dungeon",
  "storeDescription": "Sua loja geek favorita",
  "logoUrl": "url",
  "faviconUrl": "url",
  "primaryColor": "#667eea",
  "secondaryColor": "#764ba2",
  "socialMedia": {
    "facebook": "https://facebook.com/geekdungeon",
    "instagram": "https://instagram.com/geekdungeon",
    "twitter": "https://twitter.com/geekdungeon",
    "youtube": "https://youtube.com/geekdungeon"
  },
  "contact": {
    "whatsapp": "(11) 99999-9999",
    "email": "contato@geekdungeon.com",
    "phone": "(11) 3333-3333"
  },
  "maintenanceMode": false,
  "maintenanceMessage": null
}
```

### PUT `/api/settings`
**Usado em:** Salvar configurações  
**Request:** (mesmo formato do GET)

---

## 🔟 UPLOAD DE ARQUIVOS (`/api/upload`)

### POST `/api/upload/image`
**Usado em:** Upload de imagens (produtos, categorias, banners, avatar)  
**Content-Type:** `multipart/form-data`  
**Request:**
```
FormData {
  file: <arquivo>
  folder: "products" // ou "categories", "banners", "avatars"
}
```
**Response:**
```json
{
  "url": "https://storage.geekdungeon.com/products/uuid-image.jpg",
  "fileName": "uuid-image.jpg",
  "size": 245678,
  "mimeType": "image/jpeg"
}
```

---

## ✅ RESUMO: Endpoints vs Funcionalidades do Frontend

| **Página Frontend** | **Endpoints Necessários** |
|---------------------|--------------------------|
| Login | `POST /api/auth/login` |
| Meu Perfil | `GET /api/auth/profile`, `PUT /api/auth/profile`, `PUT /api/auth/change-password` |
| Dashboard | `GET /api/reports/overview` (parcial) |
| Categorias | `GET`, `POST`, `PUT`, `DELETE /api/categories` |
| Produtos | `GET`, `POST`, `PUT`, `DELETE /api/products` + `POST /api/upload/image` |
| Clientes | `GET`, `POST`, `PUT`, `DELETE /api/customers` + `PUT /api/customers/{id}/ban` |
| Pedidos | `GET`, `GET /{id}`, `PUT /{id}/status`, `PUT /{id}/cancel /api/orders` |
| Cupons | `GET`, `POST`, `PUT`, `DELETE /api/cupons` |
| Banners | `GET`, `POST`, `PUT`, `DELETE /api/banners` + `POST /api/upload/image` |
| Relatórios | `GET /api/reports/overview`, `/financial`, `/products`, `/customers`, `/operational` |
| Configurações | `GET /api/settings`, `PUT /api/settings` + `POST /api/upload/image` |

---

## 🎯 Total de Endpoints

- **Autenticação:** 6 endpoints
- **Categorias:** 5 endpoints
- **Produtos:** 6 endpoints
- **Clientes:** 7 endpoints
- **Pedidos:** 4 endpoints
- **Cupons:** 5 endpoints
- **Banners:** 4 endpoints
- **Relatórios:** 5 endpoints
- **Configurações:** 2 endpoints
- **Upload:** 1 endpoint

**TOTAL: 45 endpoints** para o painel admin funcionar completamente!

---

**💡 Agora você tem:**
- ✅ Contrato completo de API
- ✅ Todos os endpoints mapeados
- ✅ Request/Response de cada um
- ✅ Mapeamento Frontend ↔ Backend

**Próximo passo:** Implementar esses endpoints no backend seguindo a Parte 1 e 2!
