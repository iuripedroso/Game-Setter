const express = require('express');
const cors = require('cors');
const routes = require('./src/routes/index');
const AppError = require('./src/utils/AppError');
const uploadConfig = require('./src/config/upload');
require('./src/database'); 

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes); // <--- Usa na raiz, sem prefixo extra

app.use('/files', express.static(uploadConfig.directory));

app.use((err, req, res, next) => {
  // Se for um erro que a gente conhece (AppError)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // Se for um erro desconhecido (bug, banco fora do ar, código errado)
  console.error(err); // Imprime no terminal pra gente arrumar

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});