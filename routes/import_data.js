var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest:'uploads/'});

var import_dataController = require('../controllers/import_dataController');
 


/* POST import data from CSV */
router.post('/csv' ,upload.single('file'),function(req, res, next) {
      import_dataController.importCSV(req, res);
  });
  
module.exports = router;