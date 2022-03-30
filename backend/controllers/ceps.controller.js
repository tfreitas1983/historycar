const db = require("../models");
const Cep = db.cep;
const Op = db.Sequelize.Op;

exports.cadastrar = (req, res) => {
    if (!req.body.cep) {
        res.status(400).send({
          message: "O CEP deve ser preenchido!"
        });
        return;
      }
      
      const dados = {
        cep: req.body.cep,
        endereco: req.body.endereco,
        numero: req.body.numero,
        complemento: req.body.complemento,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        uf: req.body.uf,
        situacao: req.body.situacao
      };
      
      Cep.create(dados)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Um erro ocorreu ao criar o CEP."
          });
        });
};

exports.findAll = (req, res) => {
    Cep.findAll()  
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao carregar os CEPS."
      });
    });
};



exports.findOne = (req, res) => {
  const id = req.params.id

  return Cep.findByPk(id)
    .then(data => {
     res.send(data)
    })
    .catch((err) => {
      console.log(">> Erro ao buscar o CEP: ", err);
    });   
};



exports.editar = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
        message: "Os dados para edição não podem ficar em branco!"
    })
  }

  const id = req.params.id

  Cep.update({
    cep: req.body.cep,
    endereco: req.body.endereco,
    numero: req.body.numero,
    complemento: req.body.complemento,
    bairro: req.body.bairro,
    cidade: req.body.cidade,
    uf: req.body.uf,
    situacao: req.body.situacao
  }, {where: {id: id}})    
  .then(data => {
      if (!data) {
          res.status(404).send({
              message: `Não foi possível encontrar e/ou alterar o CEP com o id=${id}. `
          })
      } else res.send({
              message: "CEP alterado com sucesso!"                
          })        
  })
  .catch(err => {
      res.status(500).send({
          message: "Erro ao alterar o CEP com o id " + id
      })
  })     
};