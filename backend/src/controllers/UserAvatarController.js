const User = require('../models/User');
const AppError = require('../utils/AppError');
const path = require('path');
const fs = require('fs'); 
const uploadConfig = require('../config/upload');

module.exports = {
  async update(req, res) {
    const user_id = req.userId; 
    const avatarFilename = req.file.filename; 

    const user = await User.findByPk(user_id);

    if (!user) {
      throw new AppError('Usuário não autenticado.', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath).catch(() => false);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;
    await user.save();

    return res.json(user);
  },
};