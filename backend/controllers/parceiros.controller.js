const db = require("../models");
const Parceiro = db.parceiro;
const Files = db.files
const Op = db.Sequelize.Op;

exports.cadastrar = (req, res) => {
    if (!req.body.nome) {
        res.status(400).send({
          message: "O nome deve ser preenchido!"
        });
        return;
      }
      
      const dados = {
        nome: req.body.nome,
        tipo: req.body.tipo,
        apelido: req.body.apelido,
        sexo: req.body.sexo,
        cpf: req.body.cpf,
        cnpj: req.body.cnpj,
        celular: req.body.celular,
        cep: req.body.cep,
        endereco: req.body.endereco,
        numero: req.body.numero,
        complemento: req.body.complemento,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        uf: req.body.uf,
        ramo: req.body.ramo,
        mecanica: req.body.mecanica,
        funilaria: req.body.funilaria,
        equipamentos: req.body.equipamentos,
        vistoria: req.body.vistoria,
        precompra: req.body.precompra,
        resumo: req.body.resumo,
        reputacao: req.body.reputacao,
        foto: req.body.foto,
        situacao: req.body.situacao
      };
      
      Parceiro.create(dados)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Um erro ocorreu ao criar o parceiro."
          });
        });
};

exports.findAll = (req, res) => {
    Parceiro.findAll({ include: ["user", "parceiros_precos"]})  
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao carregar os parceiros."
      });
    });
};



exports.findOne = (req, res) => {
  const id = req.params.id

  return Parceiro.findByPk(id, { include: ["user", "parceiros_precos"]})
    .then(data => {
     res.send(data)
    })
    .catch((err) => {
      console.log(">> Erro ao buscar o parceiro: ", err);
    });   
};



exports.editar = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
        message: "Os dados para edição não podem ficar em branco!"
    })
  }

  const id = req.params.id

  Parceiro.update({
    nome: req.body.nome,
    tipo: req.body.tipo,
    apelido: req.body.apelido,
    sexo: req.body.sexo,
    cpf: req.body.cpf,
    cnpj: req.body.cnpj,
    celular: req.body.celular,
    cep: req.body.cep,
    endereco: req.body.endereco,
    numero: req.body.numero,
    complemento: req.body.complemento,
    bairro: req.body.bairro,
    cidade: req.body.cidade,
    uf: req.body.uf,
    ramo: req.body.ramo,
    mecanica: req.body.mecanica,
    funilaria: req.body.funilaria,
    equipamentos: req.body.equipamentos,
    vistoria: req.body.vistoria,
    precompra: req.body.precompra,
    resumo: req.body.resumo,
    reputacao: req.body.reputacao,
    foto: req.body.foto,
    situacao: req.body.situacao
  }, {where: {id: id}})    
  .then(data => {
      if (!data) {
          res.status(404).send({
              message: `Não foi possível encontrar e/ou alterar o parceiro com o id=${id}. `
          })
      } else res.send({
              message: "Parceiro alterado com sucesso!"                
          })        
  })
  .catch(err => {
      res.status(500).send({
          message: "Erro ao alterar o parceiro com o id " + id
      })
  })     
};

exports.cadastrarImagem = (req, res) => {
  const { originalname: original, filename: foto, size, location: url = "" } = req.file
  if (!foto) {
      res.status(400).send({ message: "A imagem deve ser enviada"})
      return
  }
 
  const file = new Files ({
     original,
     foto,
     size, 
     url
  })
  file    
      .save(file)
      .then(data => {
          res.send(data)
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Um erro ocorreu ao criar a imagem"
          })
      })
}

exports.buscarImagem = (req, res) => {
  const id = req.params.id

  Files.findById(id)   
      .then(data => {
          res.send(data)
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Um erro ocorreu ao buscar a imagem"
          })
      })
}

exports.buscarImagens = (req, res) => {   

  Files.find()   
      .then(data => {
          res.send(data)
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Um erro ocorreu ao buscar as imagens"
          })
      })
}