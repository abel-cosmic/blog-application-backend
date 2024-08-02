import multer from "multer";
import path from "path";
import { Request } from "express";
import fs from "fs";

const uploadsDir = path.join(__dirname, "..", "uploads", "images");

const ensureUploadsDirExists = () => {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
};

ensureUploadsDirExists();

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req: Request, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

const fileFilter = (
  req: Request,
  file: { mimetype: string; originalname: string },
  cb: multer.FileFilterCallback
) => {
  const allowedFileTypes = /jpeg|jpg|png/;
  const mimetype = allowedFileTypes.test(file.mimetype);
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
};

export const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 20 },
  fileFilter,
});
