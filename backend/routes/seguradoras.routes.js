module.exports = app => {
    const seguradoras = require("../controllers/seguradoras.controller.js");
  
    var router = require("express").Router();    
   
    router.get("/", seguradoras.findAll);
  
    router.get("/:id", seguradoras.findOne);

    router.post("/", seguradoras.cadastrar)
    
    router.put("/:id", seguradoras.editar)
  
    app.use('/api/seguradoras', router);
  };