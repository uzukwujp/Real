import multer from "multer";
import { join } from "path";

const fileFilter = (req, file, cb) => {
  try {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "application/pdf" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } catch (error) {
    error = new Error("mimetype not supported");
    throw error;
  }
};

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(__dirname, "../images"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const photoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(__dirname, "../avatars"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const planStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(__dirname, "../projectPlans"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const uploadPlan = multer({
  storage: planStorage,
  fileFilter: fileFilter,
}).single("plan");

export const uploadProjectPhotos = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
}).array("photos");

export const uploadProfileImage = multer({
  storage: photoStorage,
  fileFilter: fileFilter,
}).single("avatar");
