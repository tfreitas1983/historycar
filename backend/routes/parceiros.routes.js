module.exports = app => {
    const parceiros = require("../controllers/parceiros.controller.js");
  
    var router = require("express").Router();    
   
    router.get("/", parceiros.findAll);
  
    router.get("/:id", parceiros.findOne);

    router.post("/", parceiros.cadastrar)
    
    router.put("/:id", parceiros.editar)
  
    app.use('/api/parceiros', router);
  };