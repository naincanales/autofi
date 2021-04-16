var mongoose = require('mongoose');
var schema = mongoose.Schema;

var vehicle = new schema({
    UUID : {type: String, default: ""},
    Make : {type: String, default: ""},
    Model : {type: String, default: ""},
    Mileage : Number ,
    Year : Number,
    Price : Number ,
    ZipCode : {type: String, default: ""},
    CreateDate : {
        type: Date
    },
    UpdateDate : {
        type: Date
    },
    Provider  : {type: String, default: ""}
});


module.exports = mongoose.model('vehicle', vehicle);
 