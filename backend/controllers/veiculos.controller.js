const db = require("../models");
const Veiculo = db.veiculo;
const Op = db.Sequelize.Op;

exports.cadastrar = (req, res) => {
    if (!req.body.modelo) {
        res.status(400).send({
          message: "O modelo deve ser preenchido!"
        });
        return;
      }
      
      const dados = {
        renavam: req.body.renavam,
        chassi: req.body.chassi,
        fabricante: req.body.fabricante,
        modelo: req.body.modelo,
        modelodescricao: req.body.modelodescricao,
        ano: req.body.ano,
        combustivel: req.body.combustivel,
        gnv: req.body.gnv,
        situacao: req.body.situacao
      };
      
      Veiculo.create(dados)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Um erro ocorreu ao criar o veículo."
          });
        });
};

exports.findAll = (req, res) => {
    Veiculo.findAll()  
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao carregar os veículos."
      });
    });
};



exports.findOne = (req, res) => {
  const id = req.params.id

  return Veiculo.findByPk(id)
    .then(data => {
     res.send(data)
    })
    .catch((err) => {
      console.log(">> Erro ao buscar o veículo: ", err);
    });   
};

exports.buscaRenavam = (req, res) => {
  const renavam = req.params.renavam

  return Veiculo.findOne({ where: {renavam: renavam} })
    .then(data => {
     res.send(data)
    })
    .catch((err) => {
      console.log(">> Erro ao buscar o renavam: ", err);
    });   
};



exports.editar = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
        message: "Os dados para edição não podem ficar em branco!"
    })
  }

  const id = req.params.id

  Veiculo.update({
    renavam: req.body.renavam,
    chassi: req.body.chassi,
    fabricante: req.body.fabricante,
    modelo: req.body.modelo,
    modelodescricao: req.body.modelodescricao,
    ano: req.body.ano,
    combustivel: req.body.combustivel,
    gnv: req.body.gnv,
    situacao: req.body.situacao
  }, {where: {id: id}})    
  .then(data => {
      if (!data) {
          res.status(404).send({
              message: `Não foi possível encontrar e/ou alterar o veículo com o id=${id}. `
          })
      } else res.send({
              message: "Veículo alterado com sucesso!"                
          })        
  })
  .catch(err => {
      res.status(500).send({
          message: "Erro ao alterar o veículo com o id " + id
      })
  })     
};