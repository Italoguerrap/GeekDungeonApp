# Backend - Exemplo de Estrutura para ASP.NET Core

Este é um guia de como estruturar o backend da API para integrar com o painel admin.

## 📋 Estrutura Sugerida

```
EcommerceNerd.API/
├── Controllers/
│   ├── CategoriesController.cs
│   └── ProductsController.cs
├── Models/
│   ├── Category.cs
│   ├── Product.cs
│   └── ProductImage.cs
├── DTOs/
│   ├── CategoryDto.cs
│   ├── ProductDto.cs
│   └── ApiResponse.cs
├── Data/
│   └── ApplicationDbContext.cs
├── Services/
│   ├── ICategoryService.cs
│   ├── CategoryService.cs
│   ├── IProductService.cs
│   └── ProductService.cs
└── Program.cs
```

## 🔧 Modelos de Dados

### Category.cs
```csharp
public class Category
{
    public int Id { get; set; }
    
    [Required]
    [MaxLength(100)]
    public string Name { get; set; }
    
    [MaxLength(500)]
    public string? Description { get; set; }
    
    [MaxLength(100)]
    public string? Slug { get; set; }
    
    public bool IsActive { get; set; } = true;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? UpdatedAt { get; set; }
    
    // Relacionamentos
    public ICollection<Product> Products { get; set; }
}
```

### Product.cs
```csharp
public class Product
{
    public int Id { get; set; }
    
    [Required]
    [MaxLength(200)]
    public string Name { get; set; }
    
    [Required]
    public string Description { get; set; }
    
    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }
    
    [Required]
    public int CategoryId { get; set; }
    
    [MaxLength(50)]
    public string? Sku { get; set; }
    
    public int Stock { get; set; } = 0;
    
    public bool IsActive { get; set; } = true;
    
    public bool IsFeatured { get; set; } = false;
    
    public List<string>? Sizes { get; set; }
    
    public List<string>? Colors { get; set; }
    
    public List<string>? Tags { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? UpdatedAt { get; set; }
    
    // Relacionamentos
    public Category Category { get; set; }
    public ICollection<ProductImage> Images { get; set; }
}
```

### ProductImage.cs
```csharp
public class ProductImage
{
    public int Id { get; set; }
    
    [Required]
    public int ProductId { get; set; }
    
    [Required]
    [MaxLength(500)]
    public string Url { get; set; }
    
    [MaxLength(200)]
    public string? Alt { get; set; }
    
    public bool IsPrimary { get; set; } = false;
    
    public int Order { get; set; } = 0;
    
    // Relacionamentos
    public Product Product { get; set; }
}
```

## 🎯 Controller Exemplo - CategoriesController.cs

```csharp
[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _categoryService;
    
    public CategoriesController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }
    
    // GET: api/categories
    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<CategoryDto>>>> GetAll()
    {
        try
        {
            var categories = await _categoryService.GetAllAsync();
            return Ok(new ApiResponse<List<CategoryDto>>
            {
                Success = true,
                Data = categories
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<List<CategoryDto>>
            {
                Success = false,
                Message = ex.Message
            });
        }
    }
    
    // GET: api/categories/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<CategoryDto>>> GetById(int id)
    {
        try
        {
            var category = await _categoryService.GetByIdAsync(id);
            if (category == null)
            {
                return NotFound(new ApiResponse<CategoryDto>
                {
                    Success = false,
                    Message = "Categoria não encontrada"
                });
            }
            
            return Ok(new ApiResponse<CategoryDto>
            {
                Success = true,
                Data = category
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<CategoryDto>
            {
                Success = false,
                Message = ex.Message
            });
        }
    }
    
    // POST: api/categories
    [HttpPost]
    public async Task<ActionResult<ApiResponse<CategoryDto>>> Create([FromBody] CategoryDto categoryDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse<CategoryDto>
                {
                    Success = false,
                    Message = "Dados inválidos"
                });
            }
            
            var category = await _categoryService.CreateAsync(categoryDto);
            
            return CreatedAtAction(nameof(GetById), new { id = category.Id }, 
                new ApiResponse<CategoryDto>
                {
                    Success = true,
                    Data = category,
                    Message = "Categoria criada com sucesso"
                });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<CategoryDto>
            {
                Success = false,
                Message = ex.Message
            });
        }
    }
    
    // PUT: api/categories/5
    [HttpPut("{id}")]
    public async Task<ActionResult<ApiResponse<CategoryDto>>> Update(int id, [FromBody] CategoryDto categoryDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse<CategoryDto>
                {
                    Success = false,
                    Message = "Dados inválidos"
                });
            }
            
            var category = await _categoryService.UpdateAsync(id, categoryDto);
            if (category == null)
            {
                return NotFound(new ApiResponse<CategoryDto>
                {
                    Success = false,
                    Message = "Categoria não encontrada"
                });
            }
            
            return Ok(new ApiResponse<CategoryDto>
            {
                Success = true,
                Data = category,
                Message = "Categoria atualizada com sucesso"
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<CategoryDto>
            {
                Success = false,
                Message = ex.Message
            });
        }
    }
    
    // DELETE: api/categories/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponse<bool>>> Delete(int id)
    {
        try
        {
            var result = await _categoryService.DeleteAsync(id);
            if (!result)
            {
                return NotFound(new ApiResponse<bool>
                {
                    Success = false,
                    Message = "Categoria não encontrada"
                });
            }
            
            return Ok(new ApiResponse<bool>
            {
                Success = true,
                Data = true,
                Message = "Categoria excluída com sucesso"
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<bool>
            {
                Success = false,
                Message = ex.Message
            });
        }
    }
}
```

## 🔧 Program.cs - Configuração

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// CORS - IMPORTANTE para o frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder => builder
            .WithOrigins("http://localhost:3000") // URL do React
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});

// Services
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IProductService, ProductService>();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// CORS deve vir antes de Authorization
app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
```

## 📦 Pacotes NuGet Necessários

```powershell
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection
dotnet add package Swashbuckle.AspNetCore
```

## 🗃️ Migrations

```powershell
# Criar migration inicial
dotnet ef migrations add InitialCreate

# Aplicar ao banco
dotnet ef database update
```

## 📝 appsettings.json

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=EcommerceNerd;Trusted_Connection=True;MultipleActiveResultSets=true"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

## 🚀 Como Executar

```powershell
# Restaurar dependências
dotnet restore

# Aplicar migrations
dotnet ef database update

# Executar
dotnet run
```

A API estará disponível em: `https://localhost:5001` ou `http://localhost:5000`

---

Este é um exemplo básico. Você pode expandi-lo com:
- Autenticação JWT
- Upload de imagens para cloud (Azure Blob, AWS S3)
- Validações personalizadas
- Logging avançado
- Cache
- Rate limiting
