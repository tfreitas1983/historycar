module.exports = app => {
    const ceps = require("../controllers/ceps.controller.js");
  
    var router = require("express").Router();    
   
    router.get("/", ceps.findAll);
  
    router.get("/:id", ceps.findOne);

    router.post("/", ceps.cadastrar)
    
    router.put("/:id", ceps.editar)
  
    app.use('/api/ceps', router);
  };