const db = require("../models");
const VeiculosClientes = db.veiculos_clientes;
const Image = db.image;
const Op = db.Sequelize.Op;
const fs = require('fs');
const path = require ('path')

exports.cadastrar = (req, res) => {
    
    if (!req.body.veiculoId || !req.body.clienteId) {
      res.status(400).send({
        message: "Nenhum cliente ou veículo foi selecionado!"
      });
      return;
    }
  
    
    const dados = {
      clienteId: req.body.clienteId,
      veiculoId: req.body.veiculoId,
      dataaquisicao: req.body.dataaquisicao,
      kmaquisicao: req.body.kmaquisicao,
      datavenda: req.body.datavenda,
      kmvenda: req.body.kmvenda,
      fotocrv: req.body.fotocrv,
      situacao: req.body.situacao
    };
  
   
    VeiculosClientes.create(dados)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorreu um erro ao cadastrar o veículo ao cliente."
        });
      });
};


exports.findAll = (req, res) => { 

  const cliente = req.query.cliente
  const veiculo = req.query.veiculo

  var query = {}

  if (cliente) {
    query = {where: {clienteId: cliente}, include: ["veiculo"], order: [['situacao', 'DESC']]}
  }

  if (cliente && veiculo) {
    query = {where: {clienteId: cliente, veiculoId: veiculo}, include: "veiculo"}
  }

  if (!cliente) {
    query = { include: ["cliente", "veiculo" ]}
  }
    VeiculosClientes.findAll(query)    
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorreu algum erro ao carregar o veículo ao cliente."
        });
      });
};



exports.findOne = (req, res) => {
    const id = req.params.id
  
    return VeiculosClientes.findByPk(id, { include: ["cliente", "veiculo" ] })
      .then(data => {
       res.send(data)
      })
      .catch((err) => {
        console.log(">> Erro ao carregar os dados: ", err);
      });   
};


exports.editar = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Os dados para edição não podem ficar em branco!"
        })
    }
  
    const id = req.params.id
  
    VeiculosClientes.update({
        clienteId: req.body.clienteId,
        veiculoId: req.body.veiculoId,
        dataaquisicao: req.body.dataaquisicao,
        kmaquisicao: req.body.kmaquisicao,
        datavenda: req.body.datavenda,
        kmvenda: req.body.kmvenda,
        situacao: req.body.situacao
    }, {where: {id: id}})    
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Não foi possível encontrar e/ou alterar o veículo ou cliente com o id=${id}. `
            })
        } else res.send({
                message: "Relação alterada com sucesso!"
            })        
    })
    .catch(err => {
        res.status(500).send({
            message: "Erro ao alterar o vínculo de veículo com cliente com o id " + id
        })
    })    
  }

exports.cadastrarImagem = (req, res) => {
  
    if (!req.file.originalname) {
        res.status(400).send({ message: "A imagem deve ser enviada"})
        return
    }
   
  
    Image.create({
          type: req.file.mimetype,
          name: req.file.filename,
          url: path.resolve(__dirname +   '/uploads/' + req.file.filename)
      }).then(image => {
          try{
              fs.writeFileSync(__dirname,  + '/uploads/' + image.name, image.url);		
              
              // exit node.js app
              res.json({'msg': 'Arquivo enviado com sucesso!'});
          }catch(e){
              console.log(e);
              res.json({'err': e});
          }
      })
  }
  
  exports.buscarImagem = (req, res) => {
    const id = req.params.id
  
    return Image.findByPk(id)
      .then(data => {
       res.send(data)
      })
      .catch((err) => {
        console.log(">> Erro ao buscar a foto do CRV: ", err);
      });  
  }
  
  exports.buscarImagens = (req, res) => {   
  
    Image.findAll()  
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao carregar as fotos dos CRVs."
      });
        });
  }