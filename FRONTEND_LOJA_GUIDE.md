# 🌐 Frontend da Loja - Guia de Implementação

Este guia mostra como criar o site público (frontend da loja) onde os clientes vão comprar.

## 📋 Páginas Necessárias

### 1. Home Page (/)
**Elementos:**
- Header com logo e menu
- Banner principal (carousel de ofertas)
- Categorias em destaque
- Produtos em destaque
- Novidades
- Depoimentos
- Newsletter
- Footer

### 2. Listagem de Produtos (/produtos)
**Elementos:**
- Filtros laterais (categoria, preço, tamanho, cor)
- Grid de produtos
- Ordenação (mais vendidos, preço, novidades)
- Paginação

### 3. Detalhes do Produto (/produtos/:id)
**Elementos:**
- Galeria de imagens
- Nome e descrição
- Preço e promoções
- Seleção de tamanho e cor
- Botão adicionar ao carrinho
- Produtos relacionados
- Avaliações

### 4. Carrinho (/carrinho)
**Elementos:**
- Lista de produtos no carrinho
- Atualizar quantidade
- Remover itens
- Calcular frete
- Total
- Botão finalizar compra

### 5. Checkout (/checkout)
**Elementos:**
- Dados pessoais
- Endereço de entrega
- Forma de pagamento
- Resumo do pedido
- Finalizar

## 🎨 Exemplo de Estrutura (React)

```
frontend-loja/
├── src/
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   └── Header.css
│   │   ├── Footer/
│   │   │   ├── Footer.tsx
│   │   │   └── Footer.css
│   │   ├── ProductCard/
│   │   │   ├── ProductCard.tsx
│   │   │   └── ProductCard.css
│   │   ├── CategoryCard/
│   │   ├── Cart/
│   │   └── SearchBar/
│   ├── pages/
│   │   ├── Home/
│   │   ├── ProductList/
│   │   ├── ProductDetail/
│   │   ├── Cart/
│   │   └── Checkout/
│   ├── context/
│   │   └── CartContext.tsx
│   ├── services/
│   │   ├── api.ts
│   │   └── productService.ts
│   └── App.tsx
```

## 💻 Exemplo: ProductCard Component

```typescript
// src/components/ProductCard/ProductCard.tsx
import React from 'react';
import { Product } from '../../types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.images?.[0]?.url} 
          alt={product.name}
          className="product-image"
        />
        {product.isFeatured && (
          <span className="badge-featured">⭐ Destaque</span>
        )}
      </div>

      <div className="product-info">
        <div className="product-category">{product.category?.name}</div>
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-price">
          R$ {product.price.toFixed(2)}
        </div>

        <button 
          className="btn-add-cart"
          onClick={() => onAddToCart(product)}
        >
          🛒 Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
```

## 🎨 Exemplo: ProductCard CSS

```css
/* src/components/ProductCard/ProductCard.css */
.product-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.product-image-container {
  position: relative;
  width: 100%;
  padding-top: 100%; /* Aspect ratio 1:1 */
  overflow: hidden;
  background: #f9fafb;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.1);
}

.badge-featured {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #f59e0b;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  z-index: 1;
}

.product-info {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-category {
  color: #6366f1;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.product-name {
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 12px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-price {
  font-size: 24px;
  font-weight: 700;
  color: #10b981;
  margin-bottom: 16px;
  margin-top: auto;
}

.btn-add-cart {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-add-cart:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}
```

## 🛒 Context de Carrinho

```typescript
// src/context/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types';

interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size?: string, color?: string) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size?: string, color?: string) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.id === product.id && 
                item.selectedSize === size && 
                item.selectedColor === color
      );

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && 
          item.selectedSize === size && 
          item.selectedColor === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1, selectedSize: size, selectedColor: color }];
    });
  };

  const removeItem = (productId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      total,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
```

## 🏠 Página Home Exemplo

```typescript
// src/pages/Home/Home.tsx
import React, { useEffect, useState } from 'react';
import { Product, Category } from '../../types';
import ProductCard from '../../components/ProductCard/ProductCard';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import { useCart } from '../../context/CartContext';
import './Home.css';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { addItem } = useCart();

  useEffect(() => {
    // Carregar produtos em destaque e categorias da API
    loadData();
  }, []);

  const loadData = async () => {
    // Implementar chamadas à API
  };

  return (
    <div className="home">
      {/* Hero Banner */}
      <section className="hero">
        <div className="hero-content">
          <h1>Bem-vindo à Nerd Universe! 🚀</h1>
          <p>As melhores camisetas, moletons e produtos geek</p>
          <button className="btn-hero">Ver Produtos</button>
        </div>
      </section>

      {/* Categorias */}
      <section className="section-categories">
        <h2 className="section-title">Qual peça você procura? 📁</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="section-products">
        <h2 className="section-title">Produtos em Destaque ⭐</h2>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              onAddToCart={addItem}
            />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <h2>Fique por dentro das novidades! 📧</h2>
        <p>Receba ofertas exclusivas e lançamentos</p>
        <form className="newsletter-form">
          <input 
            type="email" 
            placeholder="Seu e-mail"
            className="newsletter-input"
          />
          <button type="submit" className="btn-newsletter">
            Inscrever
          </button>
        </form>
      </section>
    </div>
  );
};

export default Home;
```

## 📱 Responsividade

```css
/* Mobile First */
.products-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  padding: 20px;
}

/* Tablet */
@media (min-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    padding: 30px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    padding: 40px;
  }
}
```

## 🎯 Funcionalidades Essenciais

### 1. Filtros de Produtos
```typescript
const [filters, setFilters] = useState({
  category: 'all',
  minPrice: 0,
  maxPrice: 1000,
  sizes: [],
  colors: []
});

const filteredProducts = products.filter(product => {
  if (filters.category !== 'all' && product.categoryId !== filters.category) {
    return false;
  }
  if (product.price < filters.minPrice || product.price > filters.maxPrice) {
    return false;
  }
  // ... outros filtros
  return true;
});
```

### 2. Busca de Produtos
```typescript
const [searchTerm, setSearchTerm] = useState('');

const searchResults = products.filter(product =>
  product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  product.description.toLowerCase().includes(searchTerm.toLowerCase())
);
```

### 3. Paginação
```typescript
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 12;

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
```

## 🚀 Próximos Passos

1. **Criar o projeto React**:
   ```bash
   npx create-react-app frontend-loja --template typescript
   ```

2. **Instalar dependências**:
   ```bash
   npm install react-router-dom axios
   ```

3. **Implementar as páginas** seguindo os exemplos acima

4. **Integrar com a API** do backend

5. **Adicionar sistema de pagamento**:
   - Mercado Pago
   - PagSeguro
   - Stripe

6. **Deploy**:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront

## 💡 Dicas Importantes

- Use **lazy loading** para imagens
- Implemente **SEO** (meta tags, sitemap)
- Adicione **Google Analytics**
- Configure **PWA** para instalação mobile
- Implemente **cache** para melhor performance
- Use **CDN** para imagens

---

**Agora você tem tudo para criar um e-commerce completo! 🎉**
