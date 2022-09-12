const db = require("../models");
const Suporte = db.suporte;
const User = db.user;
const Op = db.Sequelize.Op;

exports.cadastrar = (req, res) => {
    if (!req.body.assunto) {
        res.status(400).send({
          message: "O assunto deve ser preenchido!"
        });
        return;
      }
      
      const dados = {
        assunto: req.body.assunto,
        descricao: req.body.descricao,
        foto: req.body.foto,
        situacao: req.body.situacao,
        userId: req.body.userId
      };
      
      Suporte.create(dados)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Um erro ocorreu ao criar o chamado."
          });
        });
};

exports.findAll = (req, res) => {

    Suporte.findAll({include: User})  
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao carregar os chamados."
      });
    });
};



exports.findOne = (req, res) => {
  const id = req.params.id

  return Suporte.findByPk(id)
    .then(data => {
     res.send(data)
    })
    .catch((err) => {
      console.log(">> Erro ao buscar o chamado: ", err);
    });   
};



exports.editar = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
        message: "Os dados para edição não podem ficar em branco!"
    })
  }

  const id = req.params.id

  Suporte.update({
    assunto: req.body.assunto,
    descricao: req.body.descricao,
    foto: req.body.foto,
    situacao: req.body.situacao,
    userId: req.body.userId
  }, {where: {id: id}})    
  .then(data => {
      if (!data) {
          res.status(404).send({
              message: `Não foi possível encontrar e/ou alterar o chamado com o id=${id}. `
          })
      } else res.send({
              message: "chamado alterado com sucesso!"                
          })        
  })
  .catch(err => {
      res.status(500).send({
          message: "Erro ao alterar o chamado com o id " + id
      })
  })     
};