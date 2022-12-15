"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
require("dotenv/config");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', (_, res) => {
    return res.status(http_status_codes_1.StatusCodes.ACCEPTED).send('Hello World');
});
router.post('/cidades', controllers_1.CidadeController.createValidation, controllers_1.CidadeController.create);
router.get('/cidades', controllers_1.CidadeController.getAllValidation, controllers_1.CidadeController.getAll);
router.get('/cidades/:id', controllers_1.CidadeController.getByIdValidation, controllers_1.CidadeController.getById);
router.put('/cidades/:id', controllers_1.CidadeController.updateByIdValidation, controllers_1.CidadeController.updateById);
router.delete('/cidades/:id', controllers_1.CidadeController.deleteByIdValidation, controllers_1.CidadeController.deleteById);
