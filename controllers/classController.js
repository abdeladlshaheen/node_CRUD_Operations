const {validationResult} = require('express-validator');
const classes = require('./../models/classModel');
function validate(req)
{
    let result = validationResult(req);
    if(!result.isEmpty())
    {
        errorMessage=result.array().reduce((sum,error)=>sum+error.msg+" ","");
        throw new Error(errorMessage);
    }
}
module.exports.index =(req,res,next) => {
    classes.find({})
    .then((data) => res.status(200).json({data}))
    .catch(error=> next(error));
};

module.exports.create =(req,res,next) => {
    validate(req);
    let Class = new classes({
        _id:req.body._id,
        name:req.body.name,
        supervisor: req.body.supervisor,
        children: req.body.children
    });
    Class.save()
    .then((data)=> res.status(201).json({message:"Teacher Created Successfully"}))
    .catch(error => next(error));
};

module.exports.show =(req,res)=>{
    validate(req);
    classes.findById(req.params.id)
    .then((data)=> {
        if(data)
            res.status(200).json(data);
        else
            res.status(404).json({message:"Not Found"});
    })
    .catch(error => next(error));
};

module.exports.edit =(req,res)=>{
    validate(req);
    classes.updateOne({_id:req.params.id},{$set:req.body})
    .then((data) => {
        if(data.matchedCount)
            res.status(200).json({message:"updated Successfully"});
        else
            res.status(404).json({message:"Not Found This Class"});
    })
    .catch(error => next(error));};

module.exports.destroy =(req,res)=>{
    validate(req);
    classes.findByIdAndDelete(req.params.id)
    .then((data)=> {
        if(data)
            res.status(200).json({message:"Teacher Deleted Successfully"});
        else
            res.status(404).json({message:"Teacher Not Found"});
    })
    .catch(error => next(error));
};

module.exports.getClassChildren = (req,res)=>{
    res.json({message:"get class children"});
};

module.exports.getClassTeachers = (req,res)=>{
    res.json({message:"get class teachers"})
};