module.exports = app => {
    const parceirosprecos = require("../controllers/parceirosprecos.controller.js");
  
    var router = require("express").Router();    
   
    router.get("/", parceirosprecos.findAll);
  
    router.get("/:id", parceirosprecos.findOne);

    router.post("/", parceirosprecos.cadastrar)
    
    router.put("/:id", parceirosprecos.editar)
  
    app.use('/api/parceirosprecos', router);
  };