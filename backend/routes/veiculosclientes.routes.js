module.exports = app => {
    const veiculosclientes = require("../controllers/veiculosclientes.controller.js");
  
    var router = require("express").Router();    
   
    router.get("/", veiculosclientes.findAll);

    router.get("/files", veiculosclientes.buscarImagens);

    router.get("/files/:id", veiculosclientes.buscarImagem);
  
    router.get("/:id", veiculosclientes.findOne);

    router.post("/", veiculosclientes.cadastrar);
    
    router.put("/:id", veiculosclientes.editar);

 //   router.post("/files", upload.single('file'), veiculosclientes.cadastrarImagem);
  
    app.use('/api/veiculosclientes', router);
  };