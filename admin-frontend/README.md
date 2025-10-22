# 🎮 Geek Dungeon - Painel Administrativo

Painel administrativo moderno e completo para gerenciamento da loja Geek Dungeon - sua masmorra geek para produtos incríveis!

## 🎯 Funcionalidades Implementadas

### ✅ Gerenciamento de Categorias
- ➕ Criar novas categorias
- ✏️ Editar categorias existentes
- 🗑️ Excluir categorias
- 🔍 Busca em tempo real
- ✅ Ativar/Desativar categorias
- 📋 Listagem com informações completas

### ✅ Gerenciamento de Produtos
- ➕ Cadastrar novos produtos
- ✏️ Editar produtos existentes
- 🗑️ Excluir produtos
- 📷 Upload de múltiplas imagens
- 🔍 Busca e filtro por categoria
- 💰 Definir preços e estoque por tamanho
- 📏 Gerenciar tamanhos com estoque individual
- ⭐ Marcar produtos em destaque
- 📊 Controle completo de estoque

### ✅ Gerenciamento de Clientes
- 👥 Listagem completa de clientes
- 👁️ Visualizar detalhes e histórico
- ✏️ Editar dados cadastrais
- 🚫 Banir/Desbanir clientes
- 🗑️ Excluir clientes
- 📍 Gerenciar múltiplos endereços

### ✅ Gerenciamento de Pedidos
- 📦 Listagem de todos os pedidos
- 🔍 Busca e filtros avançados
- 📋 Detalhes completos do pedido
- 🚚 Controle de status (6 estados)
- 💰 Visualização de valores e produtos
- 📍 Informações de entrega

### ✅ Cupons de Desconto
- �️ Criar cupons personalizados
- 💸 Desconto percentual ou fixo
- 📅 Definir validade
- 🔢 Limite de uso
- 💵 Valor mínimo de compra

### ✅ Banners Promocionais
- 🖼️ Upload de imagens
- 📱 Gerenciar banners ativos
- 🔄 Definir ordem de exibição
- 🔗 Links personalizados

### ✅ Relatórios e Analytics
- 📊 Gráficos de vendas
- 💰 Estatísticas financeiras
- 🏆 Produtos mais vendidos
- 📈 Análise de desempenho

### ✅ Configurações da Loja
- 🏪 Nome e informações gerais
- 🎨 Personalizar cores do site
- 📞 Dados de contato
- 📱 Links de redes sociais
- ⚙️ Configurações avançadas

### ✅ Perfil do Usuário
- 👤 Editar dados pessoais
- 🔒 Alterar senha
- 🔐 Autenticação em dois fatores
- 📸 Foto de perfil

### ✅ Interface Moderna
- � Design responsivo otimizado para 100% zoom
- �🌈 Gradientes e animações suaves
- 📱 Totalmente mobile-friendly
- 🚀 Navegação intuitiva
- 💫 Feedback visual em todas as ações
- 🔔 Sistema de notificações
- ⚙️ Menu de usuário com dropdown

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. **Navegue até a pasta do projeto:**
```powershell
cd c:\Users\igpinheiro\source\repos\EcommerceNerd\admin-frontend
```

2. **Instale as dependências:**
```powershell
npm install --legacy-peer-deps
```

3. **Inicie o servidor de desenvolvimento:**
```powershell
npm start
```

4. **Acesse no navegador:**
```
http://localhost:3001
```

## 📁 Estrutura do Projeto

```
admin-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   ├── Sidebar/
│   │   └── Header/
│   ├── pages/
│   │   ├── Dashboard/
│   │   ├── Categories/
│   │   ├── Products/
│   │   ├── Customers/
│   │   ├── Orders/
│   │   ├── Coupons/
│   │   ├── Banners/
│   │   ├── Reports/
│   │   ├── Settings/
│   │   └── Profile/
│   ├── services/
│   │   ├── api.ts
│   │   ├── categoryService.ts
│   │   └── productService.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── index.tsx
├── package.json
└── README.md
```

## 🎨 Tecnologias Utilizadas

- **React 18.2.0** - Framework principal
- **TypeScript 5.3.3** - Tipagem estática
- **React Router 6.20.0** - Navegação entre páginas
- **Axios 1.6.2** - Requisições HTTP
- **CSS3** - Estilização moderna com variáveis CSS
- **React Icons 4.12.0** - Biblioteca de ícones

## 📝 Dados Mock

Atualmente o projeto utiliza dados mock (simulados) para demonstração do frontend. Quando você conectar com o backend real:

1. Remova os dados mock dos arquivos das páginas
2. Implemente as chamadas reais para a API
3. Configure autenticação e proteção de rotas

## 🔐 Próximos Passos

1. **Integração com Backend**
   - Conectar com API REST
   - Implementar autenticação JWT
   - Upload real de imagens

2. **Dashboard Completo**
   - Adicionar estatísticas reais
   - Gráficos dinâmicos
   - Métricas de performance

3. **Frontend da Loja**
   - Criar loja virtual para clientes
   - Carrinho de compras
   - Sistema de checkout

## 💡 Recursos Especiais

- **Responsividade Total**: Otimizado para funcionar perfeitamente em 100% de zoom
- **Notificações em Tempo Real**: Sistema de alertas e notificações
- **Validações Completas**: Todos os formulários com validação
- **Feedback Visual**: Animações e transições suaves
- **Menu de Usuário**: Dropdown com acesso rápido ao perfil

## 🐛 Solução de Problemas

### Erros de Instalação
Use sempre `--legacy-peer-deps` ao instalar dependências:
```powershell
npm install --legacy-peer-deps
```

### Porta em Uso
O projeto usa a porta 3001. Se houver conflito:
```powershell
# Encontrar processo
netstat -ano | findstr :3001
# Matar processo
taskkill /PID <PID> /F
```

---

**🎮 Desenvolvido com ❤️ para a Geek Dungeon - Sua masmorra geek!**
