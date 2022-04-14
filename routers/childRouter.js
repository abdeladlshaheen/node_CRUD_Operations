const express = require('express');
const childRouter = express.Router();
const {index,create, edit , show ,destroy} = require('./../controllers/childController');
const {childValidator, idValidator} = require('./../validation/validation')

childRouter.route('/child')
.get(index)
.post(childValidator,create);

childRouter.route('/child/:id')
.get(idValidator,show)
.put(idValidator,childValidator,edit)
.delete(idValidator,destroy);

module.exports.childRouter = childRouter;