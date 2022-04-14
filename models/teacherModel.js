const mongoose = require('mongoose');
const TeacherSchema = new mongoose.Schema(
    {
        full_name: {type : String,required:true},
        email : {type : String,required:true},
        password : {type : String,required:true},
        image : {type : String,required:false},
    }
);
module.exports = mongoose.model("teachers",TeacherSchema);