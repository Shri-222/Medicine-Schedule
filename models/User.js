
const mongoose = require("mongoose");

const userSchemas = new mongoose.Schema(
    {
        FirstName : {
            type: String,
            required: true,
            trim : true
        },

        LastName : {
            type: String,
            required: true,
            trim : true
        },

        Email : {
            type : String,
            required : true,
            trim : true,
            unique : true
        },

        Password : {
            type : String,
            required : true,
            trim : true
        }, 
        
        accountType : {
            type : String,
            enum : ['Admin', 'User'],
            default : 'User'
        },

        Medicine : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Medicine'
        }
    }
);


module.exports = mongoose.model('User', userSchemas);