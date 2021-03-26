const express = require('express');
const {UserController} = require('../controller')

const UserRouter = express.Router();


UserRouter.get('/', UserController.findAll);

UserRouter.get('/:id', UserController.findOne);

module.exports = {UserRouter};
