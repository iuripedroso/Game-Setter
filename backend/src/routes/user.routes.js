const express = require('express');
const multer = require('multer'); // Importar multer
const uploadConfig = require('../config/upload'); // Importar config
const UserController = require('../controllers/UserController');
const UserAvatarController = require('../controllers/UserAvatarController'); // Importar novo controller
const authMiddleware = require('../middlewares/auth');
const validateId = require('../middlewares/validateId');
const FollowController = require('../controllers/FollowController');

const userRouter = express.Router();
const upload = multer(uploadConfig); // Inicializar multer

// Rota pública
userRouter.post('/', UserController.create);

// Ver quem o usuário X segue (Público)
userRouter.get('/:user_id/following',validateId, FollowController.listFollowing);

// Ver quem segue o usuário X (Público)
userRouter.get('/:user_id/followers',validateId, FollowController.listFollowers);

// Rotas privadas
userRouter.use(authMiddleware);

userRouter.get('/', UserController.index);
userRouter.get('/me', (req, res) => res.json({ userId: req.userId }));

userRouter.patch('/avatar', upload.single('avatar'), UserAvatarController.update);

// Seguir / Deixar de seguir alguém (Precisa estar logado)
userRouter.post('/:user_id/follow', authMiddleware,validateId, FollowController.toggleFollow);


module.exports = userRouter;