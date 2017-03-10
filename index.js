//used instructions from here https://code.msdn.microsoft.com/upload-files-or-to-server-15f69aaa
//firstly code was written when actually file uploads really - this variant is in comments
// then rewritten when it not uploads
var PORT = process.env.PORT || 3000;
var fs = require("fs");
var express = require("express");
var app = express();
var multer  = require('multer');
var upload = multer({dest:'uploads/'});
var path = require("path");
var bodyParser = require('body-parser'); 
app.use(bodyParser.json()); 


/*var Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + "_" + file.originalname)
  }
})
 
var upload = multer({ storage: Storage }).array("imgUploader", 1);
*/
app.get("/", function (req, res) { 
    res.sendFile(__dirname + "/index.html"); 
});

app.post('/api/Upload',upload.single('imgUploader'),function(req,res){
    fs.unlink(req.file.path,function(err){
        if(err){
            return console.log(err);
        } else {
            console.log(req.file.filename+' deleted');
        }
    });
    res.json({'file name': req.file.originalname, size: req.file.size + ' bytes'})
});


/*app.post("/api/Upload", function (req, res) { 
    upload(req, res, function (err) { 
        if (err) { 
            return res.end("Something went wrong!" + err); 
        } 
        return res.end(JSON.stringify({'file name': req.files[0].originalname, size: req.files[0].size + ' bytes'})); 
    }); 
});*/ 

app.listen(PORT, function() {
  console.log('listening on port', PORT);
});