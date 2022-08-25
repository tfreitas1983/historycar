module.exports = app => {
    const suporte = require("../controllers/suporte.controller.js");
  
    var router = require("express").Router();    
   
    router.get("/", suporte.findAll);
  
    router.get("/:id", suporte.findOne);

    router.post("/", suporte.cadastrar)
    
    router.put("/:id", suporte.editar)
  
    app.use('/api/suporte', router);
  };