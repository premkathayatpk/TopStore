import multer from "multer";
import path from "path";
import fs from "fs";

const storage = (folderPath) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = path.resolve(folderPath);

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

      const fileExtension = path.extname(file.originalname);

      cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
    },
  });

export const uploadProduct = multer({
  storage: storage("public/uploads/products/"),
});

export const uploadAvatar = multer({
  storage: storage("public/uploads/avatars/"),
});
