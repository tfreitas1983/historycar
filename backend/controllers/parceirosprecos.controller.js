const db = require("../models");
const Op = db.Sequelize.Op;
const ParceirosPrecos = db.parceiros_precos;


exports.findAll = (req, res) => { 
    ParceirosPrecos.findAll({ include: "parceiros" })    
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorreu algum erro ao carregar os preços."
        });
      });
};



exports.findOne = (req, res) => {
    const id = req.params.id
  
    return ParceirosPrecos.findByPk(id, { include: "parceiros" })
      .then(data => {
       res.send(data)
      })
      .catch((err) => {
        console.log(">> Erro ao carregar os preços: ", err);
      });   
  };



exports.cadastrar = (req, res) => {
    
    if (!req.body.parceiroId) {
      res.status(400).send({
        message: "Nenhum parceiro foi selecionado!"
      });
      return;
    }
  
    
    const dados = {
      parceiroId: req.body.parceiroId,
      remoto: req.body.remoto,
      remotoinicio: req.body.remotoinicio,
      remotofim: req.body.remotofim,
      presencial: req.body.presencial,
      presencialinicio: req.body.presencialinicio,
      presencialfim: req.body.presencialfim,
      situacao: req.body.situacao
    };
  
   
    ParceirosPrecos.create(dados)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorreu um erro ao cadastrar os preços."
        });
      });
};

  exports.editar = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Os dados para edição não podem ficar em branco!"
        })
    }
  
    const id = req.params.id
  
    ParceirosPrecos.update({
        parceiroId: req.body.parceiroId,
        remoto: req.body.remoto,
        remotoinicio: req.body.remotoinicio,
        remotofim: req.body.remotofim,
        presencial: req.body.presencial,
        presencialinicio: req.body.presencialinicio,
        presencialfim: req.body.presencialfim,
        situacao: req.body.situacao
    }, {where: {id: id}})    
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Não foi possível encontrar e/ou alterar os preços com o id=${id}. `
            })
        } else res.send({
                message: "Preços alterados com sucesso!"
            })        
    })
    .catch(err => {
        res.status(500).send({
            message: "Erro ao alterar os preços com o id " + id
        })
    })    
  }