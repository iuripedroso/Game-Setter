const path = require('path');
const multer = require('multer');
const crypto = require('crypto');

const TMP_FOLDER = path.resolve(__dirname, '..', '..', 'uploads');

module.exports = {
  directory: TMP_FOLDER,
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(req, file, callback) {
      // Gera um hash aleatório para garantir que nenhum arquivo tenha o mesmo nome
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};