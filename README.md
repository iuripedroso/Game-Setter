#  Game Setter

Projeto Integrador desenvolvido para criar uma plataforma de avaliação de jogos (estilo Letterboxd).

##  Tecnologias

- **Front-end:** React + Vite
- **Back-end:** Node.js + Express + Sequelize
- **Banco de Dados:** PostgreSQL (Hospedado no Supabase)
- **Uploads:** Multer (Armazenamento local)

---

##  Como rodar o projeto

Siga os passos abaixo para configurar o ambiente na sua máquina.

### 1. Instalar dependências

O projeto é dividido em duas partes (raiz para o front e pasta backend). Você precisa instalar as bibliotecas em ambos.

Abra o terminal na raiz do projeto e rode:

```bash
# 1. Instala as dependências do Front-end e ferramentas gerais
npm install

# 2. Entra na pasta do backend e instala as dependências da API
cd backend
npm install

# 3. Volta para a raiz
cd ..