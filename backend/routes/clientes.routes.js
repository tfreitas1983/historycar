module.exports = app => {
    const clientes = require("../controllers/clientes.controller.js");
  
    var router = require("express").Router();    
   
    router.get("/", clientes.findAll);
  
    router.get("/:id", clientes.findOne);

    router.post("/", clientes.cadastrar)
    
    router.put("/:id", clientes.editar)
  
    app.use('/api/clientes', router);
  };