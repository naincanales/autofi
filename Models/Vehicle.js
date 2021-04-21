
import mongoose from 'mongoose';
const schema = mongoose.Schema;

const vehicle = new schema({
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


exports.default = mongoose.model('vehicle', vehicle);
 