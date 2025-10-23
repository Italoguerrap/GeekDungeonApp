# 🎮 Guia Completo de Backend - Geek Dungeon Admin
## PARTE 2: Entidades Restantes, Infraestrutura e Aplicação

---

## 📦 CAMADA DOMAIN (Continuação)

### 5. Entidades Restantes

**Domain/Entities/Product.cs:**
```csharp
using GeekDungeon.Domain.Common;

namespace GeekDungeon.Domain.Entities;

public class Product : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? ShortDescription { get; set; }
    public decimal Price { get; set; }
    public decimal? CompareAtPrice { get; set; }
    public decimal Cost { get; set; }
    public string? Sku { get; set; }
    public string? Barcode { get; set; }
    public int Stock { get; set; }
    public int? LowStockAlert { get; set; }
    public bool TrackInventory { get; set; } = true;
    public bool IsActive { get; set; } = true;
    public bool IsFeatured { get; set; } = false;
    public decimal Weight { get; set; }
    public string? WeightUnit { get; set; } = "kg";
    public string? Dimensions { get; set; }
    public string? MetaTitle { get; set; }
    public string? MetaDescription { get; set; }
    public int Views { get; set; } = 0;
    public int Sales { get; set; } = 0;

    // Imagens (armazenadas como JSON array ou tabela separada)
    public string? Images { get; set; } // ["url1", "url2", "url3"]

    // Categoria
    public Guid CategoryId { get; set; }
    public Category Category { get; set; } = null!;

    // Relacionamentos
    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
```

**Domain/Entities/Customer.cs:**
```csharp
using GeekDungeon.Domain.Common;

namespace GeekDungeon.Domain.Entities;

public class Customer : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string? Document { get; set; } // CPF/CNPJ
    public DateTime? BirthDate { get; set; }
    public string? Avatar { get; set; }
    public bool IsActive { get; set; } = true;
    public bool IsBanned { get; set; } = false;
    public string? BanReason { get; set; }
    public DateTime? BannedAt { get; set; }
    public string? Notes { get; set; }

    // Endereço principal (ou criar tabela CustomerAddress)
    public string? AddressStreet { get; set; }
    public string? AddressNumber { get; set; }
    public string? AddressComplement { get; set; }
    public string? AddressNeighborhood { get; set; }
    public string? AddressCity { get; set; }
    public string? AddressState { get; set; }
    public string? AddressZipCode { get; set; }
    public string? AddressCountry { get; set; } = "Brasil";

    // Relacionamentos
    public ICollection<Order> Orders { get; set; } = new List<Order>();
}
```

**Domain/Entities/Order.cs:**
```csharp
using GeekDungeon.Domain.Common;
using GeekDungeon.Domain.Enums;

namespace GeekDungeon.Domain.Entities;

public class Order : BaseEntity
{
    public string OrderNumber { get; set; } = string.Empty; // Ex: GD-2024-00001
    public Guid CustomerId { get; set; }
    public Customer Customer { get; set; } = null!;
    public OrderStatus Status { get; set; } = OrderStatus.Pending;
    public PaymentMethod PaymentMethod { get; set; }
    public string? PaymentId { get; set; } // ID da transação no gateway
    public DateTime? PaidAt { get; set; }
    
    // Valores
    public decimal Subtotal { get; set; }
    public decimal ShippingCost { get; set; }
    public decimal Discount { get; set; }
    public decimal Tax { get; set; }
    public decimal Total { get; set; }

    // Cupom
    public Guid? CouponId { get; set; }
    public Coupon? Coupon { get; set; }
    public string? CouponCode { get; set; }

    // Endereço de entrega
    public string ShippingName { get; set; } = string.Empty;
    public string ShippingEmail { get; set; } = string.Empty;
    public string? ShippingPhone { get; set; }
    public string ShippingStreet { get; set; } = string.Empty;
    public string ShippingNumber { get; set; } = string.Empty;
    public string? ShippingComplement { get; set; }
    public string ShippingNeighborhood { get; set; } = string.Empty;
    public string ShippingCity { get; set; } = string.Empty;
    public string ShippingState { get; set; } = string.Empty;
    public string ShippingZipCode { get; set; } = string.Empty;
    public string ShippingCountry { get; set; } = "Brasil";

    // Rastreamento
    public string? TrackingCode { get; set; }
    public string? ShippingCarrier { get; set; }
    public DateTime? ShippedAt { get; set; }
    public DateTime? DeliveredAt { get; set; }
    public DateTime? CancelledAt { get; set; }
    public string? CancellationReason { get; set; }

    // Notas
    public string? CustomerNotes { get; set; }
    public string? AdminNotes { get; set; }

    // Relacionamentos
    public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
}
```

**Domain/Entities/OrderItem.cs:**
```csharp
using GeekDungeon.Domain.Common;

namespace GeekDungeon.Domain.Entities;

public class OrderItem : BaseEntity
{
    public Guid OrderId { get; set; }
    public Order Order { get; set; } = null!;
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    
    public string ProductName { get; set; } = string.Empty; // Snapshot do nome
    public string? ProductSku { get; set; }
    public string? ProductImage { get; set; }
    
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal Subtotal { get; set; }
}
```

**Domain/Entities/Coupon.cs:**
```csharp
using GeekDungeon.Domain.Common;
using GeekDungeon.Domain.Enums;

namespace GeekDungeon.Domain.Entities;

public class Coupon : BaseEntity
{
    public string Code { get; set; } = string.Empty;
    public string? Description { get; set; }
    public CouponType Type { get; set; }
    public decimal Value { get; set; } // Percentual ou valor fixo
    public decimal? MinimumOrderValue { get; set; }
    public decimal? MaximumDiscount { get; set; }
    public int? UsageLimit { get; set; }
    public int UsageCount { get; set; } = 0;
    public DateTime? StartsAt { get; set; }
    public DateTime? ExpiresAt { get; set; }
    public bool IsActive { get; set; } = true;

    // Relacionamentos
    public ICollection<Order> Orders { get; set; } = new List<Order>();
}
```

**Domain/Entities/Banner.cs:**
```csharp
using GeekDungeon.Domain.Common;

namespace GeekDungeon.Domain.Entities;

public class Banner : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string? Subtitle { get; set; }
    public string? Description { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public string? ImageMobileUrl { get; set; }
    public string? LinkUrl { get; set; }
    public string? ButtonText { get; set; }
    public string Type { get; set; } = "hero"; // hero, secondary, promo
    public int Order { get; set; } = 0;
    public bool IsActive { get; set; } = true;
    public DateTime? StartsAt { get; set; }
    public DateTime? ExpiresAt { get; set; }
}
```

**Domain/Entities/StoreSettings.cs:**
```csharp
using GeekDungeon.Domain.Common;

namespace GeekDungeon.Domain.Entities;

public class StoreSettings : BaseEntity
{
    public string StoreName { get; set; } = "Geek Dungeon";
    public string? StoreDescription { get; set; }
    public string? LogoUrl { get; set; }
    public string? FaviconUrl { get; set; }
    public string PrimaryColor { get; set; } = "#667eea";
    public string SecondaryColor { get; set; } = "#764ba2";
    public string? FacebookUrl { get; set; }
    public string? InstagramUrl { get; set; }
    public string? TwitterUrl { get; set; }
    public string? YoutubeUrl { get; set; }
    public string? WhatsApp { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public bool MaintenanceMode { get; set; } = false;
    public string? MaintenanceMessage { get; set; }
}
```

### 6. Interfaces de Repositório Restantes

**Domain/Interfaces/Repositories/IProductRepository.cs:**
```csharp
using GeekDungeon.Domain.Entities;

namespace GeekDungeon.Domain.Interfaces.Repositories;

public interface IProductRepository : IRepository<Product>
{
    Task<Product?> GetBySlugAsync(string slug);
    Task<IEnumerable<Product>> GetByCategoryAsync(Guid categoryId);
    Task<IEnumerable<Product>> GetFeaturedAsync(int count = 10);
    Task<IEnumerable<Product>> GetLowStockAsync();
}
```

**Domain/Interfaces/Repositories/ICustomerRepository.cs:**
```csharp
using GeekDungeon.Domain.Entities;

namespace GeekDungeon.Domain.Interfaces.Repositories;

public interface ICustomerRepository : IRepository<Customer>
{
    Task<Customer?> GetByEmailAsync(string email);
    Task<bool> EmailExistsAsync(string email);
}
```

**Domain/Interfaces/Repositories/IOrderRepository.cs:**
```csharp
using GeekDungeon.Domain.Entities;
using GeekDungeon.Domain.Enums;

namespace GeekDungeon.Domain.Interfaces.Repositories;

public interface IOrderRepository : IRepository<Order>
{
    Task<Order?> GetByOrderNumberAsync(string orderNumber);
    Task<IEnumerable<Order>> GetByCustomerAsync(Guid customerId);
    Task<IEnumerable<Order>> GetByStatusAsync(OrderStatus status);
    Task<string> GenerateOrderNumberAsync();
}
```

---

## 🗄️ CAMADA INFRASTRUCTURE

### 1. ApplicationDbContext

**Infrastructure/Data/ApplicationDbContext.cs:**
```csharp
using GeekDungeon.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GeekDungeon.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
        : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<Coupon> Coupons { get; set; }
    public DbSet<Banner> Banners { get; set; }
    public DbSet<StoreSettings> StoreSettings { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Aplicar todas as configurações do assembly
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        // Atualizar UpdatedAt automaticamente
        var entries = ChangeTracker.Entries()
            .Where(e => e.State == EntityState.Modified);

        foreach (var entry in entries)
        {
            if (entry.Entity is Domain.Common.BaseEntity entity)
            {
                entity.UpdatedAt = DateTime.UtcNow;
            }
        }

        return base.SaveChangesAsync(cancellationToken);
    }
}
```

### 2. Entity Configurations (Fluent API)

**Infrastructure/Data/Configurations/UserConfiguration.cs:**
```csharp
using GeekDungeon.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GeekDungeon.Infrastructure.Data.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");

        builder.HasKey(u => u.Id);

        builder.Property(u => u.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(u => u.Email)
            .IsRequired()
            .HasMaxLength(100);

        builder.HasIndex(u => u.Email)
            .IsUnique();

        builder.Property(u => u.PasswordHash)
            .IsRequired();

        builder.Property(u => u.Phone)
            .HasMaxLength(20);

        builder.Property(u => u.Avatar)
            .HasMaxLength(500);

        builder.Property(u => u.Role)
            .IsRequired()
            .HasConversion<string>();

        // Relacionamentos
        builder.HasMany(u => u.RefreshTokens)
            .WithOne(rt => rt.User)
            .HasForeignKey(rt => rt.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
```

**Infrastructure/Data/Configurations/CategoryConfiguration.cs:**
```csharp
using GeekDungeon.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GeekDungeon.Infrastructure.Data.Configurations;

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.ToTable("Categories");

        builder.HasKey(c => c.Id);

        builder.Property(c => c.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.HasIndex(c => c.Name)
            .IsUnique();

        builder.Property(c => c.Slug)
            .IsRequired()
            .HasMaxLength(100);

        builder.HasIndex(c => c.Slug)
            .IsUnique();

        builder.Property(c => c.Description)
            .HasMaxLength(500);

        builder.Property(c => c.Image)
            .HasMaxLength(500);

        builder.Property(c => c.Icon)
            .HasMaxLength(100);

        // Auto-relacionamento (hierarquia)
        builder.HasOne(c => c.Parent)
            .WithMany(c => c.Children)
            .HasForeignKey(c => c.ParentId)
            .OnDelete(DeleteBehavior.Restrict);

        // Relacionamento com Products
        builder.HasMany(c => c.Products)
            .WithOne(p => p.Category)
            .HasForeignKey(p => p.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
```

**Infrastructure/Data/Configurations/ProductConfiguration.cs:**
```csharp
using GeekDungeon.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GeekDungeon.Infrastructure.Data.Configurations;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("Products");

        builder.HasKey(p => p.Id);

        builder.Property(p => p.Name)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(p => p.Slug)
            .IsRequired()
            .HasMaxLength(200);

        builder.HasIndex(p => p.Slug)
            .IsUnique();

        builder.Property(p => p.Description)
            .HasMaxLength(5000);

        builder.Property(p => p.ShortDescription)
            .HasMaxLength(500);

        builder.Property(p => p.Price)
            .HasPrecision(18, 2);

        builder.Property(p => p.CompareAtPrice)
            .HasPrecision(18, 2);

        builder.Property(p => p.Cost)
            .HasPrecision(18, 2);

        builder.Property(p => p.Sku)
            .HasMaxLength(50);

        builder.HasIndex(p => p.Sku);

        builder.Property(p => p.Barcode)
            .HasMaxLength(50);

        builder.Property(p => p.Images)
            .HasColumnType("nvarchar(max)");
    }
}
```

### 3. Repositórios

**Infrastructure/Repositories/BaseRepository.cs:**
```csharp
using GeekDungeon.Domain.Interfaces;
using GeekDungeon.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace GeekDungeon.Infrastructure.Repositories;

public class BaseRepository<T> : IRepository<T> where T : class
{
    protected readonly ApplicationDbContext _context;
    protected readonly DbSet<T> _dbSet;

    public BaseRepository(ApplicationDbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    public virtual async Task<T?> GetByIdAsync(Guid id)
    {
        return await _dbSet.FindAsync(id);
    }

    public virtual async Task<IEnumerable<T>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }

    public virtual async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
    {
        return await _dbSet.Where(predicate).ToListAsync();
    }

    public virtual async Task<T> AddAsync(T entity)
    {
        await _dbSet.AddAsync(entity);
        return entity;
    }

    public virtual Task UpdateAsync(T entity)
    {
        _dbSet.Update(entity);
        return Task.CompletedTask;
    }

    public virtual Task DeleteAsync(T entity)
    {
        _dbSet.Remove(entity);
        return Task.CompletedTask;
    }

    public virtual async Task<int> CountAsync(Expression<Func<T, bool>>? predicate = null)
    {
        return predicate == null 
            ? await _dbSet.CountAsync() 
            : await _dbSet.CountAsync(predicate);
    }

    public virtual async Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate)
    {
        return await _dbSet.AnyAsync(predicate);
    }
}
```

**Infrastructure/Repositories/UserRepository.cs:**
```csharp
using GeekDungeon.Domain.Entities;
using GeekDungeon.Domain.Interfaces.Repositories;
using GeekDungeon.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GeekDungeon.Infrastructure.Repositories;

public class UserRepository : BaseRepository<User>, IUserRepository
{
    public UserRepository(ApplicationDbContext context) : base(context) { }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _dbSet
            .FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());
    }

    public async Task<bool> EmailExistsAsync(string email)
    {
        return await _dbSet
            .AnyAsync(u => u.Email.ToLower() == email.ToLower());
    }
}
```

**Infrastructure/Repositories/CategoryRepository.cs:**
```csharp
using GeekDungeon.Domain.Entities;
using GeekDungeon.Domain.Interfaces.Repositories;
using GeekDungeon.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GeekDungeon.Infrastructure.Repositories;

public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
{
    public CategoryRepository(ApplicationDbContext context) : base(context) { }

    public async Task<Category?> GetBySlugAsync(string slug)
    {
        return await _dbSet
            .Include(c => c.Parent)
            .Include(c => c.Children)
            .FirstOrDefaultAsync(c => c.Slug == slug);
    }

    public async Task<IEnumerable<Category>> GetRootCategoriesAsync()
    {
        return await _dbSet
            .Where(c => c.ParentId == null && c.IsActive)
            .OrderBy(c => c.Order)
            .ToListAsync();
    }

    public async Task<IEnumerable<Category>> GetChildrenAsync(Guid parentId)
    {
        return await _dbSet
            .Where(c => c.ParentId == parentId && c.IsActive)
            .OrderBy(c => c.Order)
            .ToListAsync();
    }
}
```

### 4. Unit of Work

**Infrastructure/UnitOfWork/UnitOfWork.cs:**
```csharp
using GeekDungeon.Domain.Interfaces;
using GeekDungeon.Infrastructure.Data;

namespace GeekDungeon.Infrastructure.UnitOfWork;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;

    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> CommitAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public Task RollbackAsync()
    {
        // EF Core não tem rollback explícito, apenas não chame SaveChanges
        return Task.CompletedTask;
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}
```

---

## ✅ Checklist da Parte 2

- [ ] Criar entidades Product, Customer, Order, OrderItem, Coupon, Banner, StoreSettings
- [ ] Criar interfaces de repositório restantes
- [ ] Criar ApplicationDbContext
- [ ] Criar Entity Configurations (UserConfiguration, CategoryConfiguration, ProductConfiguration, etc)
- [ ] Criar BaseRepository
- [ ] Criar repositórios específicos (UserRepository, CategoryRepository)
- [ ] Criar UnitOfWork
- [ ] Adicionar connection string no appsettings.json
- [ ] Gerar primeira migration: `dotnet ef migrations add InitialCreate`
- [ ] Aplicar migration: `dotnet ef database update`

---

## 🎯 Próxima Etapa

**Continue para a PARTE 3** que incluirá:
- ✅ Camada de Aplicação (DTOs, Services, Validators)
- ✅ JWT Token Service
- ✅ Implementação do AuthService completo
- ✅ Controllers (AuthController, CategoriesController)
- ✅ Middlewares de erro e logging
- ✅ Configuração do Program.cs
- ✅ Testes dos endpoints

---

**💡 Dica:** Sempre rode `dotnet build` após criar configurações para verificar erros!
