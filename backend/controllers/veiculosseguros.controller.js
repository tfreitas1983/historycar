const db = require("../models");
const VeiculosSeguros = db.veiculos_seguros;
const Op = db.Sequelize.Op;

exports.cadastrar = (req, res) => {
    if (!req.body.veiculoId) {
        res.status(400).send({
          message: "O veículo deve ser preenchido!"
        });
        return;
      }
      
      const dados = {
        vigenciainicio: req.body.vigenciainicio,
        vigenciafim: req.body.vigenciafim,
        seguradoraId: req.body.seguradoraId,
        veiculoId: req.body.veiculoId,
        situacao: req.body.situacao
      };
      
      VeiculosSeguros.create(dados)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Um erro ocorreu ao criar o seguro."
          });
        });
};

exports.findAll = (req, res) => {
    VeiculosSeguros.findAll({ include: ["veiculo", "seguradora"]})  
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao carregar os seguros."
      });
    });
};



exports.findOne = (req, res) => {
  const id = req.params.id

  return VeiculosSeguros.findByPk(id, { include: ["veiculo", "seguradora"] })
    .then(data => {
     res.send(data)
    })
    .catch((err) => {
      console.log(">> Erro ao buscar o seguro: ", err);
    });   
};



exports.editar = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
        message: "Os dados para edição não podem ficar em branco!"
    })
  }

  const id = req.params.id

  VeiculosSeguros.update({
    vigenciainicio: req.body.vigenciainicio,
    vigenciafim: req.body.vigenciafim,
    seguradoraId: req.body.seguradoraId,
    veiculoId: req.body.veiculoId,
    situacao: req.body.situacao
  }, {where: {id: id}})    
  .then(data => {
      if (!data) {
          res.status(404).send({
              message: `Não foi possível encontrar e/ou alterar o seguro com o id=${id}. `
          })
      } else res.send({
              message: "Seguro alterado com sucesso!"                
          })        
  })
  .catch(err => {
      res.status(500).send({
          message: "Erro ao alterar o seguro com o id " + id
      })
  })     
};