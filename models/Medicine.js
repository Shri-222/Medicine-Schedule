
const mongoose = require("mongoose");

const medicineSchemas = new mongoose.Schema({

    name : {
        type : String,
        // required : true,
        trim : true,
    },

    discription : {
        type : String,
        // required : true,
        trim : true
    },

    docess : {
        type : String,
        // required : true,
        trim : true
    },

    time : {
        type : Date,
        // require : true,
    },

    status : [
        {
            type : String,
            enum : ['taken', 'dismissed']
        }
    ],

    startAt : {
        type : Date,
        default : Date.now()
    },

    endAt : {
        type : Date,
        default : Date.now() + 20*24*60*60*1000
    }
 
});


module.exports = mongoose.model('Medicine', medicineSchemas);
