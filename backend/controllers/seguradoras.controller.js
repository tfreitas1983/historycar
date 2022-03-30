const db = require("../models");
const Seguradora = db.seguradora;
const Op = db.Sequelize.Op;

exports.cadastrar = (req, res) => {
    if (!req.body.descricao) {
        res.status(400).send({
          message: "O nome deve ser preenchido!"
        });
        return;
      }
      
      const dados = {
        descricao: req.body.descricao,
        situacao: req.body.situacao
      };
      
      Seguradora.create(dados)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Um erro ocorreu ao criar a seguradora."
          });
        });
};

exports.findAll = (req, res) => {
    Seguradora.findAll()  
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao carregar as seguradoras."
      });
    });
};



exports.findOne = (req, res) => {
  const id = req.params.id

  return Seguradora.findByPk(id)
    .then(data => {
     res.send(data)
    })
    .catch((err) => {
      console.log(">> Erro ao buscar a seguradora: ", err);
    });   
};



exports.editar = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
        message: "Os dados para edição não podem ficar em branco!"
    })
  }

  const id = req.params.id

  Seguradora.update({
    descricao: req.body.descricao,
    situacao: req.body.situacao
  }, {where: {id: id}})    
  .then(data => {
      if (!data) {
          res.status(404).send({
              message: `Não foi possível encontrar e/ou alterar a seguradora com o id=${id}. `
          })
      } else res.send({
              message: "Seguradora alterada com sucesso!"                
          })        
  })
  .catch(err => {
      res.status(500).send({
          message: "Erro ao alterar a seguradora com o id " + id
      })
  })     
};