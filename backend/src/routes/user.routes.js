const express = require('express');
const multer = require('multer'); // Importar multer
const uploadConfig = require('../config/upload'); // Importar config
const UserController = require('../controllers/UserController');
const UserAvatarController = require('../controllers/UserAvatarController'); // Importar novo controller
const authMiddleware = require('../middlewares/auth');

const userRouter = express.Router();
const upload = multer(uploadConfig); // Inicializar multer

// Rota pública
userRouter.post('/', UserController.create);

// Rotas privadas
userRouter.use(authMiddleware);

userRouter.get('/', UserController.index);
userRouter.get('/me', (req, res) => res.json({ userId: req.userId }));

// --- NOVA ROTA DE AVATAR ---
// upload.single('avatar') significa que vamos mandar 1 arquivo no campo chamado 'avatar'
userRouter.patch('/avatar', upload.single('avatar'), UserAvatarController.update);

module.exports = userRouter;