module.exports = app => {
    const veiculosmanutencoes = require("../controllers/veiculosmanutencoes.controller.js");
  
    const router = require ('express').Router()
    const multer = require ('multer')
    const multerConfig = require ('../config/multer')
    
    const upload = multer(multerConfig)  
   
    router.get("/", veiculosmanutencoes.findAll);

    router.get("/files", veiculosmanutencoes.buscarImagens);

    router.get("/files/:id", veiculosmanutencoes.buscarImagem);
  
    router.get("/:id", veiculosmanutencoes.findOne);

    router.post("/", veiculosmanutencoes.cadastrar);
    
    router.put("/:id", veiculosmanutencoes.editar);

    router.post("/files", upload.single('file'), veiculosmanutencoes.cadastrarImagem);
  
    app.use('/api/veiculosmanutencoes', router);
  };