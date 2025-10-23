# 🎮 Guia Completo de Backend - Geek Dungeon Admin
## PARTE 1: Fundação, Arquitetura e Autenticação (.NET + SQL Server)

---

## 📋 Visão Geral do Sistema

### Stack Tecnológica
- **Framework**: .NET 8 (ASP.NET Core Web API)
- **Banco de Dados**: SQL Server 2019+
- **ORM**: Entity Framework Core 8
- **Arquitetura**: Clean Architecture (Domain, Application, Infrastructure, API)
- **Autenticação**: JWT + Refresh Tokens
- **Validação**: FluentValidation
- **Mapeamento**: AutoMapper
- **Upload**: IFormFile + Azure Blob Storage (ou local)
- **Documentação**: Swagger/OpenAPI
- **Logging**: Serilog
- **Padrões**: Repository Pattern, Unit of Work, CQRS (opcional)

### Por que Clean Architecture?
✅ **Independência de Frameworks**: Facilita migração para outras tecnologias  
✅ **Independência de Banco**: Trocar SQL Server por PostgreSQL/MongoDB é simples  
✅ **Testabilidade**: Facilita testes unitários e de integração  
✅ **Separação de Responsabilidades**: Código organizado e manutenível  
✅ **Inversão de Dependências**: Camadas externas dependem de abstrações

---

## 🏗️ Estrutura do Projeto (Clean Architecture)

```
GeekDungeon.Backend/
├── src/
│   ├── GeekDungeon.Domain/              # Camada de Domínio (Entidades, Enums, Interfaces)
│   │   ├── Entities/
│   │   │   ├── User.cs
│   │   │   ├── RefreshToken.cs
│   │   │   ├── Category.cs
│   │   │   ├── Product.cs
│   │   │   ├── Customer.cs
│   │   │   ├── Order.cs
│   │   │   ├── OrderItem.cs
│   │   │   ├── Coupon.cs
│   │   │   ├── Banner.cs
│   │   │   └── StoreSettings.cs
│   │   ├── Enums/
│   │   │   ├── UserRole.cs
│   │   │   ├── OrderStatus.cs
│   │   │   ├── PaymentMethod.cs
│   │   │   └── CouponType.cs
│   │   ├── Interfaces/
│   │   │   ├── IRepository.cs
│   │   │   ├── IUnitOfWork.cs
│   │   │   └── Repositories/
│   │   │       ├── IUserRepository.cs
│   │   │       ├── ICategoryRepository.cs
│   │   │       ├── IProductRepository.cs
│   │   │       └── ... (outros repositórios)
│   │   └── Common/
│   │       └── BaseEntity.cs
│   │
│   ├── GeekDungeon.Application/         # Camada de Aplicação (Casos de Uso, DTOs, Validações)
│   │   ├── DTOs/
│   │   │   ├── Auth/
│   │   │   │   ├── LoginRequestDto.cs
│   │   │   │   ├── RegisterRequestDto.cs
│   │   │   │   ├── AuthResponseDto.cs
│   │   │   │   └── RefreshTokenRequestDto.cs
│   │   │   ├── Category/
│   │   │   ├── Product/
│   │   │   ├── Customer/
│   │   │   └── ... (outros DTOs)
│   │   ├── Services/
│   │   │   ├── Interfaces/
│   │   │   │   ├── IAuthService.cs
│   │   │   │   ├── ICategoryService.cs
│   │   │   │   └── ... (outros serviços)
│   │   │   └── Implementations/
│   │   │       ├── AuthService.cs
│   │   │       ├── CategoryService.cs
│   │   │       └── ... (implementações)
│   │   ├── Validators/
│   │   │   ├── Auth/
│   │   │   │   ├── LoginRequestValidator.cs
│   │   │   │   └── RegisterRequestValidator.cs
│   │   │   └── ... (outros validators)
│   │   ├── Mappings/
│   │   │   └── MappingProfile.cs
│   │   └── Common/
│   │       ├── Result.cs
│   │       └── PaginatedList.cs
│   │
│   ├── GeekDungeon.Infrastructure/      # Camada de Infraestrutura (EF Core, Repositórios)
│   │   ├── Data/
│   │   │   ├── ApplicationDbContext.cs
│   │   │   ├── Configurations/        # Entity Configurations
│   │   │   │   ├── UserConfiguration.cs
│   │   │   │   ├── CategoryConfiguration.cs
│   │   │   │   └── ... (outras configs)
│   │   │   └── Migrations/
│   │   ├── Repositories/
│   │   │   ├── BaseRepository.cs
│   │   │   ├── UserRepository.cs
│   │   │   ├── CategoryRepository.cs
│   │   │   └── ... (outros repositórios)
│   │   ├── UnitOfWork/
│   │   │   └── UnitOfWork.cs
│   │   ├── Services/
│   │   │   ├── JwtTokenService.cs
│   │   │   ├── FileStorageService.cs
│   │   │   └── EmailService.cs
│   │   └── DependencyInjection.cs
│   │
│   └── GeekDungeon.API/                 # Camada de Apresentação (Controllers, Middlewares)
│       ├── Controllers/
│       │   ├── AuthController.cs
│       │   ├── CategoriesController.cs
│       │   ├── ProductsController.cs
│       │   ├── CustomersController.cs
│       │   ├── OrdersController.cs
│       │   ├── CouponsController.cs
│       │   ├── BannersController.cs
│       │   ├── ReportsController.cs
│       │   └── SettingsController.cs
│       ├── Middlewares/
│       │   ├── ExceptionHandlingMiddleware.cs
│       │   └── RequestLoggingMiddleware.cs
│       ├── Filters/
│       │   └── ValidationFilter.cs
│       ├── Extensions/
│       │   └── ServiceCollectionExtensions.cs
│       ├── appsettings.json
│       ├── appsettings.Development.json
│       └── Program.cs
│
└── tests/                               # Testes
    ├── GeekDungeon.UnitTests/
    └── GeekDungeon.IntegrationTests/
```

---

## 🚀 FASE 1: Setup Inicial dos Projetos

### 1.1 Criar Solution e Projetos

```bash
# Criar solution
dotnet new sln -n GeekDungeon.Backend

# Criar projetos
dotnet new classlib -n GeekDungeon.Domain -o src/GeekDungeon.Domain
dotnet new classlib -n GeekDungeon.Application -o src/GeekDungeon.Application
dotnet new classlib -n GeekDungeon.Infrastructure -o src/GeekDungeon.Infrastructure
dotnet new webapi -n GeekDungeon.API -o src/GeekDungeon.API

# Adicionar projetos à solution
dotnet sln add src/GeekDungeon.Domain/GeekDungeon.Domain.csproj
dotnet sln add src/GeekDungeon.Application/GeekDungeon.Application.csproj
dotnet sln add src/GeekDungeon.Infrastructure/GeekDungeon.Infrastructure.csproj
dotnet sln add src/GeekDungeon.API/GeekDungeon.API.csproj

# Configurar referências entre projetos
cd src/GeekDungeon.Application
dotnet add reference ../GeekDungeon.Domain/GeekDungeon.Domain.csproj

cd ../GeekDungeon.Infrastructure
dotnet add reference ../GeekDungeon.Domain/GeekDungeon.Domain.csproj
dotnet add reference ../GeekDungeon.Application/GeekDungeon.Application.csproj

cd ../GeekDungeon.API
dotnet add reference ../GeekDungeon.Application/GeekDungeon.Application.csproj
dotnet add reference ../GeekDungeon.Infrastructure/GeekDungeon.Infrastructure.csproj
```

### 1.2 Instalar Pacotes NuGet

**Domain** (sem dependências externas)

**Application:**
```bash
cd src/GeekDungeon.Application
dotnet add package AutoMapper
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection
dotnet add package FluentValidation
dotnet add package FluentValidation.DependencyInjectionExtensions
```

**Infrastructure:**
```bash
cd src/GeekDungeon.Infrastructure
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.Extensions.Configuration
dotnet add package BCrypt.Net-Next
dotnet add package System.IdentityModel.Tokens.Jwt
```

**API:**
```bash
cd src/GeekDungeon.API
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package Swashbuckle.AspNetCore
dotnet add package Serilog.AspNetCore
dotnet add package Serilog.Sinks.Console
dotnet add package Serilog.Sinks.File
```

---

## 📦 CAMADA 1: DOMAIN (Entidades e Interfaces)

### 1. BaseEntity.cs
```csharp
namespace GeekDungeon.Domain.Common;

public abstract class BaseEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
```

### 2. Enums (UserRole.cs, OrderStatus.cs, etc)

**Domain/Enums/UserRole.cs:**
```csharp
namespace GeekDungeon.Domain.Enums;

public enum UserRole
{
    SuperAdmin = 0,
    Admin = 1,
    Manager = 2,
    Support = 3
}
```

**Domain/Enums/OrderStatus.cs:**
```csharp
namespace GeekDungeon.Domain.Enums;

public enum OrderStatus
{
    Pending = 0,
    Processing = 1,
    Shipped = 2,
    Delivered = 3,
    Cancelled = 4,
    Refunded = 5
}
```

**Domain/Enums/PaymentMethod.cs:**
```csharp
namespace GeekDungeon.Domain.Enums;

public enum PaymentMethod
{
    CreditCard = 0,
    DebitCard = 1,
    PIX = 2,
    Boleto = 3,
    PayPal = 4
}
```

**Domain/Enums/CouponType.cs:**
```csharp
namespace GeekDungeon.Domain.Enums;

public enum CouponType
{
    Percentage = 0,
    FixedAmount = 1,
    FreeShipping = 2
}
```

### 3. Entidades Principais

**Domain/Entities/User.cs:**
```csharp
using GeekDungeon.Domain.Common;
using GeekDungeon.Domain.Enums;

namespace GeekDungeon.Domain.Entities;

public class User : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string? Avatar { get; set; }
    public UserRole Role { get; set; } = UserRole.Admin;
    public bool IsActive { get; set; } = true;
    public DateTime? LastLogin { get; set; }
    public bool TwoFactorEnabled { get; set; } = false;
    public string? TwoFactorSecret { get; set; }

    // Relacionamentos
    public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
}
```

**Domain/Entities/RefreshToken.cs:**
```csharp
using GeekDungeon.Domain.Common;

namespace GeekDungeon.Domain.Entities;

public class RefreshToken : BaseEntity
{
    public string Token { get; set; } = string.Empty;
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public DateTime ExpiresAt { get; set; }
    public bool IsRevoked { get; set; } = false;
}
```

**Domain/Entities/Category.cs:**
```csharp
using GeekDungeon.Domain.Common;

namespace GeekDungeon.Domain.Entities;

public class Category : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Image { get; set; }
    public string? Icon { get; set; }
    public Guid? ParentId { get; set; }
    public Category? Parent { get; set; }
    public bool IsActive { get; set; } = true;
    public int Order { get; set; } = 0;

    // Relacionamentos
    public ICollection<Category> Children { get; set; } = new List<Category>();
    public ICollection<Product> Products { get; set; } = new List<Product>();
}
```

### 4. Interfaces de Repositório

**Domain/Interfaces/IRepository.cs:**
```csharp
using System.Linq.Expressions;

namespace GeekDungeon.Domain.Interfaces;

public interface IRepository<T> where T : class
{
    Task<T?> GetByIdAsync(Guid id);
    Task<IEnumerable<T>> GetAllAsync();
    Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);
    Task<T> AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(T entity);
    Task<int> CountAsync(Expression<Func<T, bool>>? predicate = null);
    Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate);
}
```

**Domain/Interfaces/IUnitOfWork.cs:**
```csharp
namespace GeekDungeon.Domain.Interfaces;

public interface IUnitOfWork : IDisposable
{
    Task<int> CommitAsync();
    Task RollbackAsync();
}
```

**Domain/Interfaces/Repositories/IUserRepository.cs:**
```csharp
using GeekDungeon.Domain.Entities;

namespace GeekDungeon.Domain.Interfaces.Repositories;

public interface IUserRepository : IRepository<User>
{
    Task<User?> GetByEmailAsync(string email);
    Task<bool> EmailExistsAsync(string email);
}
```

**Domain/Interfaces/Repositories/ICategoryRepository.cs:**
```csharp
using GeekDungeon.Domain.Entities;

namespace GeekDungeon.Domain.Interfaces.Repositories;

public interface ICategoryRepository : IRepository<Category>
{
    Task<Category?> GetBySlugAsync(string slug);
    Task<IEnumerable<Category>> GetRootCategoriesAsync();
    Task<IEnumerable<Category>> GetChildrenAsync(Guid parentId);
}
```

---

## ✅ Checklist da Parte 1 (Fundação)

- [ ] Criar solution e projetos (.NET 8)
- [ ] Configurar referências entre projetos
- [ ] Instalar pacotes NuGet em cada projeto
- [ ] Criar BaseEntity
- [ ] Criar Enums (UserRole, OrderStatus, PaymentMethod, CouponType)
- [ ] Criar entidades User, RefreshToken, Category
- [ ] Criar interfaces IRepository, IUnitOfWork
- [ ] Criar interfaces específicas (IUserRepository, ICategoryRepository)

---

## 🎯 Próxima Etapa

**Continue para a PARTE 2** que incluirá:
- ✅ Restante das entidades (Product, Customer, Order, Coupon, Banner)
- ✅ Camada de Infraestrutura (DbContext, Configurations, Repositórios)
- ✅ Camada de Aplicação (DTOs, Services, Validators)
- ✅ JWT Token Service
- ✅ Migrations do EF Core

---

**💡 Dica:** Compile o projeto após criar as entidades para verificar erros!
