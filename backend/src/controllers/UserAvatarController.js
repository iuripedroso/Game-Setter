const User = require('../models/User');
const AppError = require('../utils/AppError');
const path = require('path');
const fs = require('fs'); // File System do Node
const uploadConfig = require('../config/upload');

module.exports = {
  async update(req, res) {
    const user_id = req.userId; // Vem do token
    const avatarFilename = req.file.filename; // Vem do Multer

    const user = await User.findByPk(user_id);

    if (!user) {
      throw new AppError('Usuário não autenticado.', 401);
    }

    // Se já tiver avatar, deletar o arquivo antigo
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      
      // Verifica se o arquivo existe
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath).catch(() => false);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath); // Deleta
      }
    }

    // Atualiza o campo avatar no banco
    user.avatar = avatarFilename;
    await user.save();

    return res.json(user);
  },
};