var mongoose = require('mongoose')
, Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

var userSchema = new Schema({

    local            : {
        email        : String,
        password     : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};
var appCategorySchema =  new Schema({

    category : {
            music : {
                     playlist : {type : String ,required :true},
                     genres   : {type : String ,required :true},
                     artist   : {type : String ,required :true},
                     albums   : {type : String ,required :true},
                     songs    : {type : String ,required :true}
                    },
            hisaab : {
                     groups : {type : String ,required :true},
                     balance   : {type : String ,required :true}
                   },
            trending :
                {
                      types :
                      {
                            politics        : {type : String ,required :true},
                            entertainment   : {type : String ,required :true},
                            sports          : {type : String ,required :true},
                            science         : {type : String ,required :true},
                            health          : {type : String ,required :true}
                      }
                }


    }

});

var drawerListSchema = new Schema({
    app : {
                  name1 :  {type : String ,required :true}
          }
});

var trendingListSchema = new Schema({
     category : { type: String, required: true}
    ,creationDate : {type : Date}
    ,quetions :{
              qId : {type : String ,required :true}
             ,postedById : {type : String , required :true}
             ,description : {type : String ,required :true}
             ,answers :{
                        postedById : {type : String }
                       ,description :{type :String }
                       ,date : {type :Date}
                     }
            }

});

var dbLoggingSchema = new Schema({
      logTime          : { type: Date, required: true, default : Date.now()}
    , token 			     : { type: String, required: true, index: { unique: true }}
    , transactionType  : { type: String}
    , expiryDate       : { type: String}
});



var fileUpload = new Schema({
      url              : { type: String}
    , thumbnailUrl     : { type: String}
    , name             : { type: String}
    , type             : { type: String}
    , size             : { type: String}
    , deleteUrl        : { type: String}
    , deleteType       : { type: String}

});

var productSchema   = new Schema({

    idProduct: {
        type: mongoose.Schema.Types.ObjectId,
        index: true
    },
    category: {type: String},
    product: {type: String},
    model: {type: String},
    brand: {type: String},
    size: {type: String},
    price: {type: String},
    description: {type: String},
    color : {type: String},
    quantity: {type: Number},
    image: { data: Buffer, contentType: String },
    uploadDate: {type: Date, default: Date.now}
});

var user = mongoose.model('User',userSchema);
var appCategory = mongoose.model('appCategory',appCategorySchema);
var drawerList = mongoose.model('drawerList',drawerListSchema);
var trendingList =mongoose.model('trendingList',trendingListSchema);
var dbLogger = mongoose.model('dbLogger', dbLoggingSchema);
var fileUpload=mongoose.model('fileupload',fileUpload);
var product =mongoose.model('product',productSchema)

module.exports = {
  User         : user,
  AppCategory  : appCategory,
  DrawerList   : drawerList,
  TrendingList : trendingList,
  DBLogger     : dbLogger,
  fileUpload   :fileUpload,
  Product      :product

};
// location: {
//     geometryType:{type :String}  ,
//     coordinates:
//     [{
//        longitude :{type : Number}
//       ,latitude :{type :Number}
//     }]
//  }
