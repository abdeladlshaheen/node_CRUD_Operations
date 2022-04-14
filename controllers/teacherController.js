const {validationResult} = require('express-validator');
const teachers = require('./../models/teacherModel')
function validate(req)
{
    let result = validationResult(req);
    if(!result.isEmpty())
    {
        errorMessage=result.array().reduce((sum,error)=>sum+error.msg+" ","");
        throw new Error(errorMessage);
    }
}
module.exports.index = (req,res,next) => {
    teachers.find({})
    .then((data) => res.status(200).json({data}))
    .catch(error=> next(error));
};

module.exports.show = (req,res,next) => {    
    validate(req);
    teachers.findById(req.params.id)
    .then((data)=> {
        if(data)
            res.status(200).json(data);
        else
            res.status(404).json({message:"Not Found"});
    })
    .catch(error => next(error));

};

module.exports.create = (req,res,next) => {
    validate(req);
    let teacher = new teachers({
        full_name: req.body.full_name,
        email : req.body.email,
        password : req.body.password,
        image : req.body.image
    });
    teacher.save()
    .then((data)=> res.status(201).json({message:"Teacher Created Successfully"}))
    .catch(error => next(error));
};

module.exports.edit = (req,res,next) => {
    validate(req);
    
    teachers.updateOne({_id:req.params.id},{$set:req.body})
    .then((data) => {
        if(data.matchedCount)
            res.status(200).json({message:"updated Successfully"});
        else
            res.status(404).json({message:"Not Found This teacher"});
    })
    .catch(error => next(error));
   
};

module.exports.destroy = (req,res,next) => {
    validate(req);
    teachers.findByIdAndDelete(req.params.id)
    .then((data)=> {
        if(data)
            res.status(200).json({message:"Teacher Deleted Successfully"});
        else
            res.status(404).json({message:"Teacher Not Found"});
    })
    .catch(error => next(error));
}