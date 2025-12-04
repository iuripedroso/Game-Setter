const express = require('express');
const cors = require('cors');
const routes = require('./src/routes/index');
const AppError = require('./src/utils/AppError');
const uploadConfig = require('./src/config/upload');
require('./src/database'); 

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes); 

app.use('/files', express.static(uploadConfig.directory));

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err); 

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});