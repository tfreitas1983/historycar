const db = require("../models");
const ClientesTransferencia = db.clientes_transferencia;
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
      datasolicitacao: req.body.datasolicitacao,
      descricao: req.body.descricao,
      fotocrv: req.body.fotocrv,
      situacao: req.body.situacao
    };
  
   
    ClientesTransferencia.create(dados)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorreu um erro ao cadastrar as transferências."
        });
      });
};


exports.findAll = (req, res) => { 
    ClientesTransferencia.findAll({ include: ["cliente", "veiculo" ]})    
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorreu algum erro ao carregar as transferências."
        });
      });
};



exports.findOne = (req, res) => {
    const id = req.params.id
  
    return ClientesTransferencia.findByPk(id, { include: ["cliente", "veiculo" ] })
      .then(data => {
       res.send(data)
      })
      .catch((err) => {
        console.log(">> Erro ao carregar as transferências: ", err);
      });   
};




exports.editar = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Os dados para edição não podem ficar em branco!"
        })
    }
  
    const id = req.params.id
  
    ClientesTransferencia.update({
        clienteId: req.body.clienteId,
        veiculoId: req.body.veiculoId,
        datasolicitacao: req.body.datasolicitacao,
        descricao: req.body.descricao,
        fotocrv: req.body.fotocrv,
        situacao: req.body.situacao
    }, {where: {id: id}})    
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Não foi possível encontrar e/ou alterar a transferência com o id=${id}. `
            })
        } else res.send({
                message: "Transferência alterada com sucesso!"
            })        
    })
    .catch(err => {
        res.status(500).send({
            message: "Erro ao alterar a transferência com o id " + id
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