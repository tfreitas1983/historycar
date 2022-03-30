module.exports = app => {
    const veiculosseguros = require("../controllers/veiculosseguros.controller.js");
  
    var router = require("express").Router();    
   
    router.get("/", veiculosseguros.findAll);
  
    router.get("/:id", veiculosseguros.findOne);

    router.post("/", veiculosseguros.cadastrar)
    
    router.put("/:id", veiculosseguros.editar)
  
    app.use('/api/veiculosseguros', router);
  };