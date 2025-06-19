# Task Manager API

Teste técnico Engecomp Dev NodeJS
API GraphQL para gerenciamento de tarefas com autenticação JWT.
---

## Tecnologias

- Node.js v22
- TypeScript
- Express
- Apollo Server v4 (GraphQL)
- MongoDB + Mongoose
- Docker + Docker Compose
- Autenticação JWT
- Testes com Jest (unitários e integração com mocks)

---

## Detalhes da Implementação e Decisões Técnicas

### Stack escolhida
- **Node.js + TypeScript:** Segurança, tipagem estática e fácil manutenção.
- **Express + Apollo Server v4:** Versão mais recente e desacoplada, seguindo as melhores práticas.
- **GraphQL:** Flexível, permitindo consultas e mutações eficientes.
- **MongoDB + Mongoose:** Banco NoSQL eficiente para relacionamento simples entre usuários e tarefas.

---

### Arquitetura
- Estrutura modular e escalável:
  - **Models:** Modelos de dados (`User`, `Task`).
  - **Resolvers:** Lógica de negócio.
  - **Schemas/Types:** Definição dos tipos GraphQL.
  - **Utils:** Autenticação (`auth.ts`) e hash de senha (`hash.ts`).
  - **Config:** Conexão com banco e configuração do servidor.
  - **Tests:** Divididos em unitários, integração e erros.
- API stateless utilizando autenticação JWT.

---

### Autenticação
- Baseada em JWT, com validade de 7 dias.
- Envio do token no header:

```
Authorization: Bearer TOKEN_AQUI
```

---

### Containerização
- Uso de Docker e Docker Compose.
- Sobem os serviços:
  - API (Node.js + GraphQL)
  - MongoDB
  - Mongo Express (interface visual do Mongo)

---

### Testes
- **Unitários:** Para funções críticas (`auth.ts`, `hash.ts`).
- **Integração:** Resolvers completos simulando banco.
- **Cenários de erro:** Autenticação, dados não encontrados e outros fluxos inválidos.

---

### 💡 Decisões e Motivações
- ✅ Escolha por Apollo Server v4 por ser a versão mais atual e recomendada.
- ✅ Uso de Mongoose pela aderência natural ao MongoDB.
- ✅ Docker utilizado para garantir ambiente consistente e replicável.
- ✅ Foco na clareza do código, escalabilidade e padronização.
- ✅ Testes cobrindo tanto fluxo feliz quanto cenários de erro.(>=85%)

---

## Como executar

### **Rodando com Docker**

```bash
docker-compose up --build
```

### Acessos:

- 🔗 **API GraphQL Playground:**  
[http://localhost:4000/graphql](http://localhost:4000/graphql)

- 🔗 **Mongo Express:**  
[http://localhost:8081](http://localhost:8081)

---

## Autenticação

Adicione o token JWT no header das requisições GraphQL:

```
Authorization: Bearer TOKEN_AQUI
```

---

## Funcionalidades

### Queries

- `me` — Dados do usuário autenticado
- `tasks` — Lista de tarefas do usuário
- `task` — Retorna uma tarefa específica pelo ID

###  Mutations

- `register` — Cadastro de usuário
- `login` — Login de usuário (retorna token)
- `createTask` — Cria uma nova tarefa
- `updateTask` — Atualiza uma tarefa existente
- `deleteTask` — Deleta uma tarefa

---

## Executar os Testes

```bash
npm run test
npm run test:cov
```

→ Execute dentro do container da API ou na sua máquina local (se desejar).

---

## Licença

MIT