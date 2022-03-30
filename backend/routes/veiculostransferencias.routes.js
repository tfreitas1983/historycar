module.exports = app => {
    const clientestransferencia = require("../controllers/clientestransferencia.controller.js");
  
    const router = require ('express').Router()
    const multer = require ('multer')
    const multerConfig = require ('../config/multer')
    
    const upload = multer(multerConfig)   
   
    router.get("/", clientestransferencia.findAll);

    router.get("/files", clientestransferencia.buscarImagens);

    router.get("/files/:id", clientestransferencia.buscarImagem);
  
    router.get("/:id", clientestransferencia.findOne);

    router.post("/", clientestransferencia.cadastrar);
    
    router.put("/:id", clientestransferencia.editar);

    router.post("/files", upload.single('file'), clientestransferencia.cadastrarImagem);
  
    app.use('/api/clientestransferencia', router);
  };