const express = require('express');
const {RoleController} = require('../role')

const RoleRouter = express.Router();

RoleRouter.get('/', RoleController.findAll);

RoleRouter.get('/:id', RoleController.findOne);

RoleRouter.post('/', RoleController.create);

RoleRouter.post('/search', RoleController.search);

RoleRouter.put('/:id', RoleController.update);

RoleRouter.delete('/:id', RoleController.delete);


module.exports = {RoleRouter};