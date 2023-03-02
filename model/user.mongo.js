const mongoose = require('mongoose')
const usr = new mongoose.Schema({
    FIRST_NAME:{
        type:String,
        required:true
    },
    MIDDLE_NAME:{
        type:String,
        default:''
    },
    LAST_NAME:{
        type:String,
        required:true
    },
    EMAIL:{
        type:String,
        required:true
    },
    PASSWORD:{
        type:String,
        required:true
    },
    ROLE:{
        type:String,
        required:true
    },
    CREATED_AT:{
        type:String,
        required:true
    },
    UPDATED_AT:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('user',usr)
