const db = require("../models");
const Cliente = db.cliente;
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
        userId: req.body.userId,
        situacao: req.body.situacao
      };
      
      Cliente.create(dados)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Um erro ocorreu ao criar o cliente."
          });
        });
};

exports.findAll = (req, res) => {
  const user = req.query.userId

  var query = {}

  if (user) {
    query = {where: {userId: user}, include: "user" }
  }

  if (!user) {
    query = { include: "user"}
  }
  Cliente.findAll(query)  
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao carregar os clientes."
      });
    });
};



exports.findOne = (req, res) => {
  const id = req.params.id

  return Cliente.findByPk(id, { include: ["user"]})
    .then(data => {
     res.send(data)
    })
    .catch((err) => {
      console.log(">> Erro ao buscar o cliente: ", err);
    });   
};



exports.editar = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
        message: "Os dados para edição não podem ficar em branco!"
    })
  }

  const id = req.params.id

  Cliente.update({
    nome: req.body.nome,
    tipo: req.body.tipo,
    apelido: req.body.apelido,
    cpf: req.body.cpf,
    cnpj: req.body.cnpj,
    celular: req.body.celular,
    sexo: req.body.sexo,
    cep: req.body.cep,
    endereco: req.body.endereco,
    numero: req.body.numero,
    complemento: req.body.complemento,
    bairro: req.body.bairro,
    cidade: req.body.cidade,
    uf: req.body.uf,
    foto: req.body.foto,
    situacao: req.body.situacao
  }, {where: {id: id}})    
  .then(data => {
      if (!data) {
          res.status(404).send({
              message: `Não foi possível encontrar e/ou alterar o cliente com o id=${id}. `
          })
      } else res.send({
              message: "Cliente alterado com sucesso!"                
          })        
  })
  .catch(err => {
      res.status(500).send({
          message: "Erro ao alterar o cliente com o id " + id
      })
  })     
};