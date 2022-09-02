module.exports = app => {
    const email = require("../controllers/email.controller.js");
  
    var router = require("express").Router();    
   
    router.get("/", email.email);
   /* router.get("/", email.findAll);
  
    

    router.post("/", email.cadastrar)
    
    router.put("/:id", email.editar)
    */
  
    app.use('/api/email', router);
  };