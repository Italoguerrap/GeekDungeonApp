# ⚡ Início Rápido - 5 Minutos

## 🚀 Execute Agora!

### Passo 1: Abra o PowerShell
```powershell
# Pressione Win + X e escolha "Windows PowerShell"
```

### Passo 2: Navegue até a pasta
```powershell
cd c:\Users\igpinheiro\source\repos\EcommerceNerd\admin-frontend
```

### Passo 3: Instale as dependências
```powershell
npm install
```
⏱️ *Isso levará 2-3 minutos*

### Passo 4: Inicie o servidor
```powershell
npm start
```
✨ *O navegador abrirá automaticamente em http://localhost:3000*

---

## 🎮 Teste Rápido

### 1. Criar Categoria (30 segundos)
1. Clique em **"📁 Categorias"** no menu lateral
2. Clique no botão **"➕ Nova Categoria"**
3. Digite:
   - Nome: `Camisetas`
   - Descrição: `Camisetas geek e nerd`
4. Clique em **"➕ Criar Categoria"**

### 2. Criar Produto (1 minuto)
1. Clique em **"👕 Produtos"** no menu lateral
2. Clique no botão **"➕ Novo Produto"**
3. Preencha:
   - Nome: `Camiseta Dragon Ball`
   - Descrição: `Camiseta 100% algodão com estampa do Goku`
   - Categoria: `Camisetas`
   - Preço: `89.90`
   - Estoque: `50`
   - Tamanhos: `P, M, G, GG`
   - Cores: `Preto, Branco`
4. Clique em **"📷 Clique para adicionar imagens"** e selecione uma imagem
5. Clique em **"➕ Criar Produto"**

### 3. Explorar Dashboard
1. Clique em **"📊 Dashboard"** no menu lateral
2. Veja as estatísticas
3. Explore as ações rápidas

---

## 📱 Acesso Rápido

### Principais Páginas
- 🏠 **Dashboard**: http://localhost:3000/dashboard
- 📁 **Categorias**: http://localhost:3000/categories
- 👕 **Produtos**: http://localhost:3000/products

---

## 🔥 Recursos Principais

### ✨ O que você pode fazer AGORA:

✅ **Gerenciar Categorias**
- Criar, editar, excluir
- Buscar em tempo real
- Ativar/desativar

✅ **Gerenciar Produtos**
- Cadastro completo
- Upload de múltiplas imagens
- Controle de estoque
- Tamanhos e cores
- Produtos em destaque

✅ **Interface Moderna**
- Design profissional
- Animações suaves
- 100% responsivo

---

## 🐛 Problemas Comuns

### ❌ Erro: "npm não é reconhecido"
**Solução:** Instale o Node.js
1. Acesse: https://nodejs.org
2. Baixe a versão LTS
3. Instale e reinicie o terminal

### ❌ Erro: "Porta 3000 em uso"
**Solução:** Mate o processo
```powershell
netstat -ano | findstr :3000
taskkill /PID <número> /F
```

### ❌ Erro ao instalar dependências
**Solução:** Limpe o cache
```powershell
npm cache clean --force
npm install
```

---

## 📖 Documentação Completa

Para mais detalhes, consulte:

- 📘 **[README.md](./README.md)** - Visão geral completa
- 📗 **[admin-frontend/README.md](./admin-frontend/README.md)** - Documentação técnica
- 📙 **[admin-frontend/GUIA_DE_USO.md](./admin-frontend/GUIA_DE_USO.md)** - Tutorial detalhado
- 📕 **[BACKEND_GUIDE.md](./BACKEND_GUIDE.md)** - Como criar a API
- 📓 **[FRONTEND_LOJA_GUIDE.md](./FRONTEND_LOJA_GUIDE.md)** - Como criar o site

---

## 🎯 Próximos Passos

Depois de testar o admin:

### 1️⃣ Desenvolver Backend
- Siga o **BACKEND_GUIDE.md**
- Crie a API em ASP.NET Core
- Configure o banco de dados

### 2️⃣ Conectar com Backend
- Configure a URL da API no `.env`
- Descomente as chamadas aos services
- Teste a integração

### 3️⃣ Criar Frontend da Loja
- Siga o **FRONTEND_LOJA_GUIDE.md**
- Crie as páginas públicas
- Implemente carrinho e checkout

---

## 💡 Dicas Rápidas

### 🎨 Personalizar Cores
Edite `src/index.css` e altere as variáveis:
```css
:root {
  --primary-color: #6366f1;  /* Sua cor aqui */
  --secondary-color: #ec4899; /* Sua cor aqui */
}
```

### 📸 Usar Imagens Reais
1. Prepare imagens em alta qualidade (800x800px mínimo)
2. Faça upload ao cadastrar produtos
3. Use formatos JPG ou PNG

### 🔧 Alterar Porta
Se quiser usar outra porta:
```powershell
set PORT=3001 && npm start
```

---

## ⚡ Comandos Úteis

```powershell
# Instalar
npm install

# Rodar desenvolvimento
npm start

# Build para produção
npm run build

# Limpar cache
npm cache clean --force

# Atualizar dependências
npm update
```

---

## 🎉 Pronto!

Você agora tem um **painel administrativo completo** funcionando!

### 👉 Próximos 3 passos:
1. ✅ Teste todas as funcionalidades
2. 🔧 Desenvolva o backend (guia disponível)
3. 🌐 Crie o frontend da loja (guia disponível)

---

**💪 Boa sorte com seu e-commerce!**

**Dúvidas? Consulte a documentação completa! 📚**
