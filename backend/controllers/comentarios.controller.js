const db = require("../models");
const Comentario = db.comentarios;
const Parceiro = db.parceiro;
const Op = db.Sequelize.Op;

exports.cadastrar = (req, res) => {
    if (!req.body.nota) {
        res.status(400).send({
          message: "A nota deve ser preenchida!"
        });
        return;
      }


      
      const dados = {
        comentario: req.body.comentario,
        nota: req.body.nota,
        situacao: req.body.situacao,
        userId: req.body.userId,
        parceiroId: req.body.parceiroId
      };

   
      
      Comentario.create(dados)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Um erro ocorreu ao criar o comentário."
          });
        });
};

exports.findAll = (req, res) => {

  const parceiroId = req.query.parceiro;
  var query = null;

  if (parceiroId) {
    query = {where: {parceiroId: parceiroId},  include: Parceiro}
  } else {
    query = {include: Parceiro}
  }

    Comentario.findAll(query)  
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao carregar os comentários."
      });
    });
};



exports.findOne = (req, res) => {
  const id = req.params.id

  return Comentario.findByPk(id)
    .then(data => {
     res.send(data)
    })
    .catch((err) => {
      console.log(">> Erro ao buscar o comentário: ", err);
    });   
};



exports.editar = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
        message: "Os dados para edição não podem ficar em branco!"
    })
  }

  const id = req.params.id

  Comentario.update({
    comentario: req.body.comentario,
    nota: req.body.nota,
    situacao: req.body.situacao,
    parceiroId: req.body.parceiroId
  }, {where: {id: id}})    
  .then(data => {
      if (!data) {
          res.status(404).send({
              message: `Não foi possível encontrar e/ou alterar o comentário com o id=${id}. `
          })
      } else res.send({
              message: "comentário alterado com sucesso!"                
          })        
  })
  .catch(err => {
      res.status(500).send({
          message: "Erro ao alterar o comentário com o id " + id
      })
  })     
};