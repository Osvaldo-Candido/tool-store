## 🛍️ Loja Online (Portfólio)
<div align="center"> <img src="https://img.shields.io/badge/status-active-success" alt="Status"> <img src="https://img.shields.io/badge/license-MIT-blue" alt="License"> <img src="https://img.shields.io/github/last-commit/Osvaldo-Candido/tool-store-frontend" alt="Último commit"> </div>
<h2>🌟 Sobre o Projeto</h2>
<div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;"> <p>Este projeto é uma loja online desenvolvida como portfólio para demonstrar minhas habilidades em desenvolvimento full-stack. O sistema implementa funcionalidades completas de e-commerce (sem gateway de pagamento real), seguindo boas práticas de programação e arquitetura limpa.</p> <h3>Links dos Repositórios</h3> <ul> <li><a href="https://github.com/Osvaldo-Candido/tool-store-frontend" target="_blank">Frontend Mobile</a></li> <li><a href="https://github.com/Osvaldo-Candido/tool-store-backend" target="_blank">Backend API</a></li> </ul> <div style="background-color: #e9ecef; padding: 15px; border-left: 4px solid #6200ee; margin-top: 15px;"> <strong>Objetivo Principal:</strong> Demonstrar a aplicação de conceitos avançados de programação em um projeto realista. </div> </div>
<h2>🛠️ Tecnologias Utilizadas</h2>
Backend
<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;"> <img src="https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white" alt="Node.js"> <img src="https://img.shields.io/badge/Fastify-000000?logo=fastify&logoColor=white" alt="Fastify"> <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript"> <img src="https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white" alt="Prisma"> <img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL"> <img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white" alt="Docker"> <img src="https://img.shields.io/badge/Zod-3E67B1" alt="Zod"> <img src="https://img.shields.io/badge/Cloudinary-3448C5?logo=cloudinary&logoColor=white" alt="Cloudinary"> </div>
Frontend (Mobile)
<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;"> <img src="https://img.shields.io/badge/React_Native-61DAFB?logo=react&logoColor=white" alt="React Native"> <img src="https://img.shields.io/badge/Expo-000020?logo=expo&logoColor=white" alt="Expo"> <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript"> <img src="https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white" alt="Axios"> </div>
<h2>🏗️ Arquitetura e Padrões</h2>
<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;"> <thead> <tr style="background-color: #6200ee; color: white;"> <th style="padding: 12px; text-align: left;">Padrão/Princípio</th> <th style="padding: 12px; text-align: left;">Descrição</th> </tr> </thead> <tbody> <tr style="border-bottom: 1px solid #ddd;"> <td style="padding: 12px;"><strong>SOLID</strong></td> <td style="padding: 12px;">Princípios fundamentais aplicados em todas camadas</td> </tr> <tr style="border-bottom: 1px solid #ddd;"> <td style="padding: 12px;"><strong>Repository</strong></td> <td style="padding: 12px;">Abstração do acesso a dados</td> </tr> <tr style="border-bottom: 1px solid #ddd;"> <td style="padding: 12px;"><strong>Factory</strong></td> <td style="padding: 12px;">Criação de objetos complexos</td> </tr> <tr style="border-bottom: 1px solid #ddd;"> <td style="padding: 12px;"><strong>Clean Code</strong></td> <td style="padding: 12px;">Código legível e de fácil manutenção</td> </tr> <tr> <td style="padding: 12px;"><strong>DDD</strong></td> <td style="padding: 12px;">Domain-Driven Design em partes do sistema</td> </tr> </tbody> </table>
🔍 Funcionalidades Principais
<div style="display: flex; gap: 20px; margin-bottom: 30px;"> <div style="flex: 1; background-color: #f8f9fa; padding: 20px; border-radius: 8px;"> <h3 style="color: #6200ee; margin-top: 0;">Para Clientes</h3> <ul style="padding-left: 20px;"> <li style="margin-bottom: 8px;">✅ Catálogo de produtos com imagens</li> <li style="margin-bottom: 8px;">✅ Carrinho de compras persistente</li> <li style="margin-bottom: 8px;">✅ Checkout simulado</li> <li style="margin-bottom: 8px;">✅ Histórico de pedidos</li> <li>✅ Detalhes de pedidos anteriores</li> </ul> </div> <div style="flex: 1; background-color: #f8f9fa; padding: 20px; border-radius: 8px;"> <h3 style="color: #6200ee; margin-top: 0;">Para Desenvolvedores</h3> <ul style="padding-left: 20px;"> <li style="margin-bottom: 8px;">✅ API RESTful bem documentada</li> <li style="margin-bottom: 8px;">✅ Validação com Zod (runtime + compile-time)</li> <li style="margin-bottom: 8px;">✅ Testes automatizados (em desenvolvimento)</li> <li style="margin-bottom: 8px;">✅ Dockerização completa</li> <li>✅ Variáveis de ambiente seguras</li> </ul> </div> </div><div style="background-color: #e9ecef; padding: 20px; border-radius: 8px; text-align: center; margin-top: 30px;"> </div> ```

## 🚀 Como Executar
### Banco de Dados
```bash
docker run --name tool-store -e POSTGRESQL_USERNAME=postgres -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=toolstore -p 5432:5432 bitnami/postgresql
```

### Backend
```bash
git clone https://github.com/Osvaldo-Candido/tool-store-backend.git
cd tool-store-backend
npm install
npx prisma migrate dev
npm run dev
```

### Frontend
```bash
git clone https://github.com/Osvaldo-Candido/tool-store-frontend.git
cd tool-store-frontend
npm install
expo start
```
