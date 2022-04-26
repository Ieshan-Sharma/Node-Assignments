const multer = require('multer')
require('dotenv').config();


//image upload
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "public");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "" + Date.now() + "" + file.originalname);
    },
});

const upload = multer({
    storage: storage,
}).single("image");

module.exports = upload;

