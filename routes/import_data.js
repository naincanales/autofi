const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest:'uploads/'});

const import_dataController = require('../controllers/import_dataController');
 


/* POST import data from CSV */
router.post('/csv' ,upload.single('file'),(req, res, next) => {
    import_dataController.importCSV(req, res);
});


module.exports = router;