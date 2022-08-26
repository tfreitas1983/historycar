module.exports = app => {
    const comentarios = require("../controllers/comentarios.controller.js");
  
    var router = require("express").Router();    
   
    router.get("/", comentarios.findAll);
  
    router.get("/:id", comentarios.findOne);

    router.post("/", comentarios.cadastrar)
    
    router.put("/:id", comentarios.editar)
  
    app.use('/api/comentarios', router);
  };