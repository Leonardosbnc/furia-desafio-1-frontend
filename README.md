# 🌐 FuriaBot Frontend - Next.js + WebSocket

Interface web do FuriaBot construída com [Next.js](https://nextjs.org/), permitindo autenticação, registro e conversa em tempo real com o chatbot via WebSocket.

---

## 🚀 Tecnologias Utilizadas

- [Next.js (React)](https://nextjs.org/)
- JavaScript (ES6+)
- WebSocket
- Tailwind

---

## 📁 Funcionalidades

- ✅ Página de Login (`/`)
- ✅ Registro de Usuário (`/register`)
- ✅ Página de Chat com FuriaBot (`/chat`)
- ✅ Comunicação via WebSocket com backend FastAPI

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env.local` com o seguinte conteúdo:

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:8000        # URL da API FastAPI
NEXT_PUBLIC_WSS_SERVER_URL=ws://localhost:8000      # URL do WebSocket
```

---

## 💻 Execução Local

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

> A aplicação estará disponível em: `http://localhost:3000`

---

## 🧭 Rotas da Aplicação

| Rota        | Descrição                            |
| ----------- | ------------------------------------ |
| `/`         | Página de login                      |
| `/register` | Registro de novo usuário             |
| `/chat`     | Interface de conversa com o FuriaBot |

---

## 🌐 Comunicação com Backend

- O frontend envia requisições HTTP para autenticação e registro.
- Após login, o token JWT é salvo (`localStorage`).
- A página `/chat` se conecta ao WebSocket usando `NEXT_PUBLIC_WSS_SERVER_URL` para conversar com o FuriaBot.
