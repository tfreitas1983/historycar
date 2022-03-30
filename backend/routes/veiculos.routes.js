module.exports = app => {
    const veiculos = require("../controllers/veiculos.controller.js");
  
    var router = require("express").Router();    
   
    router.get("/", veiculos.findAll);
  
    router.get("/:id", veiculos.findOne);
    
    router.get("/renavam/:renavam", veiculos.buscaRenavam);

    router.post("/", veiculos.cadastrar)
    
    router.put("/:id", veiculos.editar)
  
    app.use('/api/veiculos', router);
  };