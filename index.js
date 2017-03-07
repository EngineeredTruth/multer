var express =   require("express");
var bodyParser =    require("body-parser");
var multer  =   require('multer');
var app =   express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//actual code below

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    console.log('destination: ', req.body);
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    console.log('filename: ', req.body);
    if( file.mimetype === 'image/jpeg'){
      var name = Date.now() + "." + 'jpg'
    } else if (file.mimetype === 'image/png'){
      var name = Date.now() + "." + 'png'
    }
    callback(null, name);
  }
});

var limits = {
  fileSize: 10000000
}

var upload = multer({ storage : storage, limits : limits }).array('userPhoto',10)

// console.log(upload());

// app.get('/',function(req,res){
//       res.sendFile(__dirname + "/index.html");
// });

app.post('/api/photo', function(req,res){
  console.log('post request: ', req.body);

    upload(req,res,function(err) {
      //jumps up in the code
      console.log('after upload');
        console.log(req.body);
        console.log(req.files);
        if(err) {
            return res.end("Error uploading file: ", err);
        }
        // res.end("File is uploaded");
        res.json({"File Size": req.files.size});
    });
});

//Same end

app.listen(3000,function(){
    console.log("Working on port 3000");
});
