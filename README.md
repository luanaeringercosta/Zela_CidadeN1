# 🚀 API ZelaCidade
## 📌 Sobre o Projeto
A API **ZelaCidade** foi criada para registrar e gerenciar problemas urbanos, como:

- Buracos
- Vazamentos
- Lixo
- Iluminação

Essa API nos permite criar, visualizar, atualizar e deletar ocorrências.

## 🛠️ Tecnologias utilizadas

- Node.js
- Express
- SQLite
- SQLite3
- Postman
- Nodemon

---
 ## 📦 Instalação
 `npm install`

 ---
 ## ▶️ Como Executar
 ```bash
 npm run dev
 ```
` http://localhost:3000 `

[Clique Aqui] (http://localhost:3000)

---

## 🗄️ Banco de Dados
O banco de dados é criado automaticamente ao iniciar o projeto.

```
database.db
```

## 🧾 Tabela

|Campo              |Descrição |
|-------------------|---------------|
|id                 |Identificador único|
|tipo_problema      |Tipo do problema|
localizacao         |Onde ocorreu|
|descricao          |Detalhes do incidente|
|prioridade         |Baixa, Média ou Alta|
|nome_solicitante   |Quem registrou|
|data_registro      |Data do registro|
|hora_registro      |Hora do Registro|
|status_resolucao   |Status (Padrão: Pendente)|

---
##  🔗 Endpoints
### Rota inicial

```http
GET /
```
Retorna uma página HTML simples com informações DA aPI.

---

### Rota para listar todos os incidentes
```http
GET  /incidentes
```
Retorna todos os registros do banco de dados.

---
### Rota para buscar um incidente específico (ID)
```http
GET  /incidentes/:id
```
Retorna uma ocorrência específica.

---
### Rota para criar um novo incidente 
```http
POST  /incidentes
```
Cria uma nova ocorrência.

---
### Body (JSON)

```json
{
        "tipo_problema": "Galho de arvore na rede eletrica",
        "localizacao": "Tamoios",
        "descricao": "Rua sem energia",
        "prioridade": "Alta",
        "nome_solicitante": "José Bonifácio",
        "data_registro": "16/03/2026",
        "hora_registro": "13:00",
        "status_resolucao": "Em Análise"
    }
```
---
### Rota para atualizar um incidente
```json
PUT /incidentes/:id
```
---

### Body (JSON)

```json
{
        "descricao": "Rua sem energia",
        "prioridade": "Alta",
        "status_resolucao": "Em Análise"
    }
```
---
### Rota para deletar um incidente
    ```http
    DELETE /incidente/:id
```
---
### 🔐 Segurança
A API utiliza `?`nas queries SQL:

```sql
WHERE id = ?
```
Isso evita o SQL Injection

---
### 📚 Conceitos 
- CRUD (Create, Read, Update e Delete)
- Rotas com Express
---

### 👩‍💻 Projeto Educacional
Este projeto foi desenvolvido para fins de aprendizado em back-end com Node.js

<!--## Esses emojis é um padrão em praticamente TODO README:

## 🚀 Nome da API / Projeto
## 📌 Sobre o Projeto
## 🎯 Objetivo
## 🛠️ Tecnologias
## 📦 Instalação
## ▶️ Como Executar
## ⚙️ Configurações
## 🗄️ Banco de Dados
## 🔗 Endpoints
## 🔐 Segurança
## 📚 Conceitos
## 💡Dicas / Melhorias
## 👩‍💻 Autor
---
## 📖 Descrição
## 🔧 Ferramentas
## 💻 Ambiente
## 📊 Dados
## 🧾 Tabela
## 📡 Requisições
## 📥 Entrada de dados
## 📤 Saída de dados
## 🚫 Bloqueios / proteção
## 🧠 Aprendizado
## 🎓 Educacional
## ⚠️ Atenção
## ❗Importante
## 🤝 Contribuição
## 📄 Licença -->