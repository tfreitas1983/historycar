const db = require("../models");
const VeiculosManutencoes = db.veiculos_manutencoes;
const Image = db.image;
const Op = db.Sequelize.Op;
const fs = require('fs');
const path = require ('path')

exports.cadastrar = (req, res) => {
    if (!req.body.veiculoId) {
        res.status(400).send({
          message: "O veículo deve ser preenchido!"
        });
        return;
      }
      
      const dados = {
        tipo: req.body.tipo,
        km: req.body.km,
        datamanutencao: req.body.datamanutencao,
        garantia: req.body.garantia,
        detalhes: req.body.detalhes,
        mecanica: req.body.mecanica,
        responsavel: req.body.responsavel,
        fotokm: req.body.fotokm,
        fotonf: req.body.fotonf,
        fotoservico: req.body.fotoservico,
        cep: req.body.cep,
        endereco: req.body.endereco,
        numero: req.body.numero,
        complemento: req.body.complemento,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        uf: req.body.uf,
        veiculoId: req.body.veiculoId,
        situacao: req.body.situacao
      };
      
      VeiculosManutencoes.create(dados)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Um erro ocorreu ao criar a manutenção."
          });
        });
};

exports.findAll = (req, res) => {
    VeiculosManutencoes.findAll({ include: "veiculo"})  
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao carregar as manutenções."
      });
    });
};



exports.findOne = (req, res) => {
  const id = req.params.id

  return VeiculosManutencoes.findByPk(id, { include: "veiculo"})
    .then(data => {
     res.send(data)
    })
    .catch((err) => {
      console.log(">> Erro ao buscar a manutenção: ", err);
    });   
};



exports.editar = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
        message: "Os dados para edição não podem ficar em branco!"
    })
  }

  const id = req.params.id

  VeiculosManutencoes.update({
    tipo: req.body.tipo,
        km: req.body.km,
        datamanutencao: req.body.datamanutencao,
        garantia: req.body.garantia,
        detalhes: req.body.detalhes,
        mecanica: req.body.mecanica,
        responsavel: req.body.responsavel,
        fotokm: req.body.fotokm,
        fotonf: req.body.fotonf,
        fotoservico: req.body.fotoservico,
        cep: req.body.cep,
        endereco: req.body.endereco,
        numero: req.body.numero,
        complemento: req.body.complemento,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        uf: req.body.uf,
        veiculoId: req.body.veiculoId,
        situacao: req.body.situacao
  }, {where: {id: id}})    
  .then(data => {
      if (!data) {
          res.status(404).send({
              message: `Não foi possível encontrar e/ou alterar a manutenção com o id=${id}. `
          })
      } else res.send({
              message: "Manutenção alterada com sucesso!"                
          })        
  })
  .catch(err => {
      res.status(500).send({
          message: "Erro ao alterar a manutenção com o id " + id
      })
  })     
};

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
        console.log(">> Erro ao buscar a foto do parceiro: ", err);
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
          err.message || "Ocorreu algum erro ao carregar os fotos dos parceiros."
      });
        });
}