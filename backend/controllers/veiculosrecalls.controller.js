const db = require("../models");
const VeiculosRecalls = db.veiculos_recalls;
const Op = db.Sequelize.Op;

exports.cadastrar = (req, res) => {
    if (!req.body.veiculoId) {
        res.status(400).send({
          message: "O veículo deve ser preenchido!"
        });
        return;
      }
      
      const dados = {
        peca: req.body.peca,
        datareparo: req.body.datareparo,
        concessionaria: req.body.concessionaria,
        veiculoId: req.body.veiculoId,
        situacao: req.body.situacao
      };
      
      VeiculosRecalls.create(dados)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Um erro ocorreu ao criar o recall."
          });
        });
};

exports.findAll = (req, res) => {
    VeiculosRecalls.findAll({ include: "veiculo"})  
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao carregar os recalls."
      });
    });
};



exports.findOne = (req, res) => {
  const id = req.params.id

  return VeiculosRecalls.findByPk(id, { include: "veiculo"})
    .then(data => {
     res.send(data)
    })
    .catch((err) => {
      console.log(">> Erro ao buscar o recall: ", err);
    });   
};



exports.editar = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
        message: "Os dados para edição não podem ficar em branco!"
    })
  }

  const id = req.params.id

  VeiculosRecalls.update({
    placa: req.body.placa,
    veiculoId: req.body.veiculoId,
    situacao: req.body.situacao
  }, {where: {id: id}})    
  .then(data => {
      if (!data) {
          res.status(404).send({
              message: `Não foi possível encontrar e/ou alterar o recall com o id=${id}. `
          })
      } else res.send({
              message: "Recall alterado com sucesso!"                
          })        
  })
  .catch(err => {
      res.status(500).send({
          message: "Erro ao alterar o recall com o id " + id
      })
  })     
};