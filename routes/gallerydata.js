var express = require('express');
var router = express.Router();
var Gallery = require('../models/dbmodel').Gallery;

router.get('/', function(request, response) {

    response.render('createaboutdata.ejs');
});
//post format for aboutSchema
// {
//      "headingtext" : "entertainment"
//     ,"details" : ""
//     ,"imageUrl" :""
//
// }
router.post('/', function(request, response) {
  var   newGallerySchema = new Gallery();
        newGallerySchema.heading = request.body.headingtext;
        newGallerySchema.description = request.body.details;
        newGallerySchema.imageUrl = request.body.imageUrl;
        newGallerySchema.appCode = request.body.appCode;

        newGallerySchema.save(function (err) {

          if (err){
            //logger.error(message + '400 | Database insertion failed');
            return next(err);
          }
          else {
            response.setHeader('Content-Type', 'application/json');

            response.send(JSON.stringify("Succefully updated"));
          }
        });

});

module.exports = router;