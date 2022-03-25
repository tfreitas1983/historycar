module.exports = app => {
    const parceiros = require("../controllers/parceiros.controller.js");

    
    const router = require ('express').Router()
    const multer = require ('multer')
    const multerConfig = require ('../config/multer')
    
    const upload = multer(multerConfig)  
    
   
    router.get("/", parceiros.findAll);
  
    router.get("/files", parceiros.buscarImagens)
    router.get("/files/:id", parceiros.buscarImagem)
    router.get("/:id", parceiros.findOne);

    router.post("/", parceiros.cadastrar)
    
    router.put("/:id", parceiros.editar)
  
    router.post("/files", upload.single('file'), parceiros.cadastrarImagem)
    
    

    app.use('/api/parceiros', router);
  };