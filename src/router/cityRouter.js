const express = require('express');
const {CityController} = require('../city')

const CityRouter = express.Router();

CityRouter.get('/', CityController.findAll);

CityRouter.get('/:id', CityController.findOne);

CityRouter.post('/', CityController.create);

CityRouter.post('/search', CityController.search);

CityRouter.put('/:id', CityController.update);

CityRouter.delete('/:id', CityController.delete);


module.exports = {CityRouter};
