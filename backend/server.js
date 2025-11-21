const express = require('express');
const cors = require('cors');
const app = express();

// Configuração para ler JSON
app.use(express.json());

// Configuração do CORS (Liberar acesso do Front)
app.use(cors());

// Rota de Teste
app.get('/', (req, res) => {
    res.send('Back-end do Game Setter está rodando! 🚀');
});

// Aqui futuramente virão as rotas de Login e Jogos
// Ex: app.use('/api/users', userRoutes);

const PORT = 3001; // Usamos 3001 porque o React geralmente usa a 3000 ou 5173
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});