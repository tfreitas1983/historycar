const db = require("../models");
const VeiculosPlacas = db.veiculos_placas;
const Op = db.Sequelize.Op;

exports.cadastrar = (req, res) => {
    if (!req.body.veiculoId) {
        res.status(400).send({
          message: "O veículo deve ser preenchido!"
        });
        return;
      }
      
      const dados = {
        placa: req.body.placa,
        veiculoId: req.body.veiculoId,
        situacao: req.body.situacao
      };
      
      VeiculosPlacas.create(dados)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Um erro ocorreu ao criar a placa."
          });
        });
};

exports.findAll = (req, res) => {
  const placa = req.query.placa

  var query = {}

  if (placa) {
    query = {where: {placa: placa}, include: "veiculo"}
  }

  if (!placa) {
    query = { include: "veiculo"}
  }


    VeiculosPlacas.findAll(query)  
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao carregar as placas."
      });
    });
};



exports.findOne = (req, res) => {
  const id = req.params.id

  return VeiculosPlacas.findByPk(id, { include: "veiculo"})
    .then(data => {
     res.send(data)
    })
    .catch((err) => {
      console.log(">> Erro ao buscar a placa: ", err);
    });   
};



exports.editar = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
        message: "Os dados para edição não podem ficar em branco!"
    })
  }

  const id = req.params.id

  VeiculosPlacas.update({
    placa: req.body.placa,
    veiculoId: req.body.veiculoId,
    situacao: req.body.situacao
  }, {where: {id: id}})    
  .then(data => {
      if (!data) {
          res.status(404).send({
              message: `Não foi possível encontrar e/ou alterar a placa com o id=${id}. `
          })
      } else res.send({
              message: "Placa alterada com sucesso!"                
          })        
  })
  .catch(err => {
      res.status(500).send({
          message: "Erro ao alterar a placa com o id " + id
      })
  })     
};