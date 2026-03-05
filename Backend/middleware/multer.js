// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// export const upload = multer({ storage });
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    if (file.fieldname === "photo") {
      cb(null, "uploads/photos");
    } 
    
    else if (file.fieldname === "resume") {
      cb(null, "uploads/resumes");
    }

    else {
      cb(null, "uploads");
    }

  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }

});

export const upload = multer({ storage });