module.exports = app => {
    const veiculosplacas = require("../controllers/veiculosplacas.controller.js");
  
    var router = require("express").Router();    
   
    router.get("/", veiculosplacas.findAll);
  
    router.get("/:id", veiculosplacas.findOne);

    router.post("/", veiculosplacas.cadastrar)
    
    router.put("/:id", veiculosplacas.editar)
  
    app.use('/api/veiculosplacas', router);
  };