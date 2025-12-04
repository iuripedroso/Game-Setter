const express = require('express');
const multer = require('multer'); 
const uploadConfig = require('../config/upload'); 
const UserController = require('../controllers/UserController');
const UserAvatarController = require('../controllers/UserAvatarController'); 
const authMiddleware = require('../middlewares/auth');
const validateId = require('../middlewares/validateId');
const FollowController = require('../controllers/FollowController');

const userRouter = express.Router();
const upload = multer(uploadConfig); 
const User = require('../models/User');

userRouter.post('/', UserController.create);

userRouter.get('/:user_id/following',validateId, FollowController.listFollowing);

userRouter.get('/:user_id/followers',validateId, FollowController.listFollowers);

userRouter.use(authMiddleware);

userRouter.get('/', UserController.index);
userRouter.get('/me', async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ['id', 'name', 'email', 'avatar', 'biography', 'is_admin'], // Não retornar senha/hash
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Database error' });
  }
});

userRouter.get('/:id', authMiddleware, UserController.show);
userRouter.patch('/avatar', upload.single('avatar'), UserAvatarController.update);

userRouter.post('/:user_id/follow', authMiddleware,validateId, FollowController.toggleFollow);

userRouter.put('/', UserController.update);


module.exports = userRouter;