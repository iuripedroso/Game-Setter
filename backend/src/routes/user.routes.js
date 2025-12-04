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

userRouter.post('/', UserController.create);

userRouter.get('/:user_id/following',validateId, FollowController.listFollowing);

userRouter.get('/:user_id/followers',validateId, FollowController.listFollowers);

userRouter.use(authMiddleware);

userRouter.get('/', UserController.index);
userRouter.get('/me', (req, res) => res.json({ userId: req.userId }));

userRouter.patch('/avatar', upload.single('avatar'), UserAvatarController.update);

userRouter.post('/:user_id/follow', authMiddleware,validateId, FollowController.toggleFollow);


module.exports = userRouter;