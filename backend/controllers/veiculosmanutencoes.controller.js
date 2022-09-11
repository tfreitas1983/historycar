const db = require("../models");
const VeiculosManutencoes = db.veiculos_manutencoes;
const Image = db.image;
const Op = db.Sequelize.Op;
const fs = require('fs');
const path = require ('path');
const { encode } = require("punycode");

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
        fotonf2: req.body.fotonf2,
        fotonf3: req.body.fotonf3,
        fotonf4: req.body.fotonf4,
        fotonf5: req.body.fotonf5,
        fotoservico: req.body.fotoservico,
        fotoservico2: req.body.fotoservico2,
        fotoservico3: req.body.fotoservico3,
        fotoservico4: req.body.fotoservico4,
        fotoservico5: req.body.fotoservico5,
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

  const veiculoId = req.query.veiculo

  if (veiculoId) {
    query = {where: {veiculoId: veiculoId, situacao: 1}, include: "veiculo",  order: [['datamanutencao', 'DESC']]}
  }

  VeiculosManutencoes.findAll(query)  
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
        fotonf2: req.body.fotonf,
        fotonf3: req.body.fotonf,
        fotonf4: req.body.fotonf,
        fotonf5: req.body.fotonf,
        fotoservico: req.body.fotoservico,
        fotoservico2: req.body.fotoservico,
        fotoservico3: req.body.fotoservico,
        fotoservico4: req.body.fotoservico,
        fotoservico5: req.body.fotoservico,
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

  console.log('req.file', req.file)
  
   if (!req.file) {
        res.status(400).send({ message: "A imagem deve ser enviada"})
        return
    }
   
  
    Image.create({
          type: req.file.mimetype,
          name: req.file.filename,
          url: path.resolve(__dirname +   '/uploads/' + req.file.filename)
      }).then(image => {
          try{
              fs.writeFileSync(__dirname  + '/uploads/' + image.name,image.url,  image.type);		

              
              // exit node.js app
              res.json({
                'name': image.name,
                'msg': 'Arquivo enviado com sucesso!'});
          }catch(e){
              console.log(e);
              res.json({'name': image.name,'err': e});
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
        console.log(">> Erro ao buscar a foto: ", err);
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
          err.message || "Ocorreu algum erro ao carregar as fotos."
      });
        });
}