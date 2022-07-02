const db = require("../models");
const Veiculo = db.veiculo;
const Placas = db.veiculos_placas;
const VeiculosClientes = db.veiculos_clientes;
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
        idfabricante: req.body.idfabricante,
        idmodelo: req.body.idmodelo,
        idano: req.body.idano,
        gnv: req.body.gnv,
        situacao: req.body.situacao
      };
      
      Veiculo.create(dados)
        .then(data => {
          VeiculosClientes.create({				
            clienteId: req.body.clienteId,
            veiculoId: data.id,
            dataaquisicao: req.body.dataaquisicao,
            kmaquisicao: req.body.kmaquisicao,
            datavenda: req.body.datavenda,
            kmvenda: req.body.kmvenda,
            fotocrv: req.body.fotocrv,
            situacao: req.body.situacao
          })
          Placas.create({
            veiculoId: data.id,
            placa: req.body.placa,           
            situacao: req.body.situacao
          })
        		
			
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

  return Veiculo.findOne({
     where: {renavam: renavam}, 
     include: {model:Placas, where: {situacao: true} } 
    })
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

exports.novocliente = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
        message: "Os dados para edição não podem ficar em branco!"
    })
  }

  const id = parseInt(req.params.id)

  VeiculosClientes.findOne({where: {veiculoId: id, situacao: 1}})
    .then(data => {
      if (data) {
        console.log(data);
        let message = 'Veículo ainda ativo em outro proprietário. Envie a foto do CRLV para nosso suporte.'
        res.send(message);
      } else {
        VeiculosClientes.create({				
          clienteId: req.body.clienteId,
          veiculoId: id,
          dataaquisicao: req.body.dataaquisicao,
          kmaquisicao: req.body.kmaquisicao,
          datavenda: req.body.datavenda,
          kmvenda: req.body.kmvenda,
          fotocrv: req.body.fotocrv,
          situacao: req.body.situacao          
        })
        .then(response => {
          console.log('response', response);
          res.send(response);
        })
        .catch(e => {
          console.error(e);
        })
      }
    })
    .catch((err) => {
      console.log(">> Erro ao buscar o veículo: ", err);
    });  
   
};