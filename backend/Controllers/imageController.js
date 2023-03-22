const asyncHandeler = require("express-async-handler");
const path = require("path");
const fs = require("fs");

const getImage = asyncHandeler  (async (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../uploads', filename);
  console.log(filePath)
    // Check if the file exists
    fs.access(filePath, fs.F_OK, (err) => {
      if (err) {
        console.error(err);
        res.status(404).send('File not found');
        return;
      }
  
      // Stream the file to the response
      res.setHeader('Content-Type', 'image/png');
      fs.createReadStream(filePath).pipe(res);
    });

});


module.exports={
  getImage,
}