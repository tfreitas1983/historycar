module.exports = app => {
    const veiculosrecalls = require("../controllers/veiculosrecalls.controller.js");
  
    var router = require("express").Router();    
   
    router.get("/", veiculosrecalls.findAll);
  
    router.get("/:id", veiculosrecalls.findOne);

    router.post("/", veiculosrecalls.cadastrar)
    
    router.put("/:id", veiculosrecalls.editar)
  
    app.use('/api/veiculosrecalls', router);
  };