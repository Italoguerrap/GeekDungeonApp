# ⚡ Comandos Úteis - Copie e Cole

## 🚀 Início Rápido

### Iniciar o Painel Admin
```powershell
cd c:\Users\igpinheiro\source\repos\EcommerceNerd\admin-frontend
npm install
npm start
```

## 📦 Gerenciamento de Pacotes

### Instalar Dependências
```powershell
npm install
```

### Instalar Pacote Específico
```powershell
npm install nome-do-pacote
```

### Atualizar Pacotes
```powershell
npm update
```

### Limpar Cache
```powershell
npm cache clean --force
```

## 🔧 Desenvolvimento

### Iniciar Servidor de Desenvolvimento
```powershell
npm start
```

### Build para Produção
```powershell
npm run build
```

### Testar Build de Produção Localmente
```powershell
npm install -g serve
serve -s build
```

## 🗄️ Backend (ASP.NET Core)

### Criar Novo Projeto API
```powershell
dotnet new webapi -n EcommerceNerd.API
cd EcommerceNerd.API
```

### Adicionar Pacotes Entity Framework
```powershell
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.EntityFrameworkCore.Design
```

### Adicionar Outros Pacotes Úteis
```powershell
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection
dotnet add package Swashbuckle.AspNetCore
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
```

### Criar Migration
```powershell
dotnet ef migrations add InitialCreate
```

### Aplicar Migration ao Banco
```powershell
dotnet ef database update
```

### Remover Última Migration
```powershell
dotnet ef migrations remove
```

### Restaurar Dependências
```powershell
dotnet restore
```

### Executar Projeto
```powershell
dotnet run
```

### Executar com Hot Reload
```powershell
dotnet watch run
```

### Build do Projeto
```powershell
dotnet build
```

### Publicar para Produção
```powershell
dotnet publish -c Release -o ./publish
```

## 🔍 Debugging e Troubleshooting

### Verificar Porta em Uso
```powershell
netstat -ano | findstr :3000
netstat -ano | findstr :5000
```

### Matar Processo por PID
```powershell
taskkill /PID <número-do-pid> /F
```

### Verificar Versão do Node
```powershell
node --version
```

### Verificar Versão do npm
```powershell
npm --version
```

### Verificar Versão do .NET
```powershell
dotnet --version
```

### Listar Projetos .NET Instalados
```powershell
dotnet --list-sdks
```

## 📁 Gerenciamento de Arquivos

### Criar Diretório
```powershell
mkdir nome-da-pasta
```

### Navegar para Diretório
```powershell
cd caminho\da\pasta
```

### Voltar um Diretório
```powershell
cd..
```

### Listar Arquivos
```powershell
dir
```

### Remover Pasta (com confirmação)
```powershell
rmdir /s nome-da-pasta
```

### Copiar Arquivos
```powershell
copy origem destino
```

### Mover Arquivos
```powershell
move origem destino
```

## 🌐 Git (Controle de Versão)

### Inicializar Repositório
```powershell
git init
```

### Verificar Status
```powershell
git status
```

### Adicionar Todos os Arquivos
```powershell
git add .
```

### Commit
```powershell
git commit -m "Mensagem do commit"
```

### Ver Histórico
```powershell
git log
```

### Criar Branch
```powershell
git branch nome-da-branch
```

### Mudar de Branch
```powershell
git checkout nome-da-branch
```

### Criar e Mudar para Nova Branch
```powershell
git checkout -b nome-da-branch
```

### Conectar com Repositório Remoto
```powershell
git remote add origin https://github.com/usuario/repositorio.git
```

### Push para Repositório Remoto
```powershell
git push -u origin main
```

### Pull do Repositório Remoto
```powershell
git pull origin main
```

### Clonar Repositório
```powershell
git clone https://github.com/usuario/repositorio.git
```

## 🔐 Variáveis de Ambiente

### Criar arquivo .env
```powershell
New-Item .env -ItemType File
notepad .env
```

### Adicionar ao .env (exemplo)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENVIRONMENT=development
```

## 🧪 Testes

### Executar Testes React
```powershell
npm test
```

### Executar Testes .NET
```powershell
dotnet test
```

### Executar Testes com Coverage
```powershell
dotnet test --collect:"XPlat Code Coverage"
```

## 📊 Análise e Qualidade de Código

### ESLint (JavaScript/TypeScript)
```powershell
npm run lint
```

### Formatar Código com Prettier
```powershell
npx prettier --write .
```

## 🚀 Deploy

### Build de Produção React
```powershell
npm run build
```

### Deploy no Netlify
```powershell
npm install -g netlify-cli
netlify deploy --prod
```

### Deploy no Vercel
```powershell
npm install -g vercel
vercel --prod
```

## 🗄️ Banco de Dados

### Abrir SQL Server Management Studio
```powershell
"C:\Program Files (x86)\Microsoft SQL Server Management Studio 18\Common7\IDE\Ssms.exe"
```

### Backup do Banco
```sql
BACKUP DATABASE [EcommerceNerd] 
TO DISK = 'C:\Backup\EcommerceNerd.bak'
```

### Restaurar Banco
```sql
RESTORE DATABASE [EcommerceNerd] 
FROM DISK = 'C:\Backup\EcommerceNerd.bak'
```

## 🔧 Ferramentas Úteis

### Abrir VS Code na Pasta Atual
```powershell
code .
```

### Abrir Explorador de Arquivos na Pasta Atual
```powershell
explorer .
```

### Abrir PowerShell Admin
```powershell
Start-Process powershell -Verb runAs
```

### Limpar Terminal
```powershell
cls
```

## 📦 Verificar o que está Instalado

### Listar Pacotes npm Globais
```powershell
npm list -g --depth=0
```

### Listar Pacotes npm do Projeto
```powershell
npm list --depth=0
```

### Ver informações do Projeto
```powershell
npm info
```

## 🔄 Atualizações

### Atualizar npm
```powershell
npm install -g npm@latest
```

### Atualizar React Scripts
```powershell
npm install react-scripts@latest
```

### Verificar Pacotes Desatualizados
```powershell
npm outdated
```

## 🛠️ Resolução de Problemas

### Remover node_modules e Reinstalar
```powershell
rm -r node_modules
rm package-lock.json
npm install
```

### Resetar Configurações do npm
```powershell
npm config delete prefix
npm config delete cache
```

### Verificar Configuração do npm
```powershell
npm config list
```

## 📝 Comandos do Projeto

### Estrutura Completa do Projeto
```powershell
# Admin Frontend
cd c:\Users\igpinheiro\source\repos\EcommerceNerd\admin-frontend
npm install
npm start

# Backend (quando criar)
cd c:\Users\igpinheiro\source\repos\EcommerceNerd\backend
dotnet restore
dotnet ef database update
dotnet run
```

---

## 🎯 Sequência Recomendada de Comandos

### 1️⃣ Primeiro Uso
```powershell
# Navegar para a pasta
cd c:\Users\igpinheiro\source\repos\EcommerceNerd\admin-frontend

# Instalar dependências
npm install

# Iniciar
npm start
```

### 2️⃣ Uso Diário
```powershell
# Navegar para a pasta
cd c:\Users\igpinheiro\source\repos\EcommerceNerd\admin-frontend

# Iniciar
npm start
```

### 3️⃣ Ao Criar o Backend
```powershell
# Criar projeto
dotnet new webapi -n EcommerceNerd.API

# Navegar
cd EcommerceNerd.API

# Adicionar pacotes
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools

# Criar migration
dotnet ef migrations add InitialCreate

# Aplicar ao banco
dotnet ef database update

# Executar
dotnet run
```

---

## 💡 Dicas

- **Ctrl + C** no terminal para parar um servidor
- Use **Tab** para autocompletar caminhos
- Use **seta para cima** para repetir comandos anteriores
- Copie comandos direto deste arquivo!

---

**📋 Mantenha este arquivo aberto para referência rápida!**
