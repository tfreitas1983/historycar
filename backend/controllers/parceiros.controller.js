const db = require("../models");
const Parceiro = db.parceiro;
const Image = db.image;
const Op = db.Sequelize.Op;
const fs = require('fs');
const path = require ('path')


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
        userId: req.body.userId,
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

  const cidade = req.query.cidade;
  const uf = req.query.uf;
  const sexo = req.query.sexo;
  const ramo = req.query.ramo;
  const userId = req.query.user;
  var query = null;


  if (userId) {
    query = { where: {userId: userId},  include: ["user", "parceiros_precos"]  }
  }

  if (!req.query) {
    query = { where: {situacao: 1}, include: ["user", "parceiros_precos"]} 
  }


  if (ramo === "1") {
    if (sexo && !uf && !cidade ) {
      query = { where: {sexo:sexo,  ramo: {[Op.or]: [1, 3]}, situacao: 1 },  include: ["user", "parceiros_precos"]  }
    }
  
    if (sexo && uf && !cidade) {
      query = { where: {sexo:sexo, uf: uf, ramo: {[Op.or]: [1, 3]}, situacao: 1  },  include: ["user", "parceiros_precos"]  }
    }
  
    if (sexo && uf && cidade) {
      query = { where: {sexo:sexo, uf: uf, cidade: cidade, ramo: {[Op.or]: [1, 3]}, situacao: 1  },  include: ["user", "parceiros_precos"]  }
    }
  
    if (!sexo && uf && cidade) {
      query = { where: {uf: uf, cidade: cidade, ramo: {[Op.or]: [1, 3]}, situacao: 1  },  include: ["user", "parceiros_precos"]  }
    }

    if (!sexo && uf && !cidade)  {
      query = { where: {uf: uf,  ramo: {[Op.or]: [1, 3]}, situacao: 1 },  include: ["user", "parceiros_precos"]  }
    }
  
    if (!sexo && !uf && !cidade) {    
      query =  { where: { ramo: {[Op.or]: [1, 3]}, situacao: 1  },include: ["user", "parceiros_precos"]  }
    }
  } 

  if (ramo === "2") {
    if (sexo && !uf && !cidade) {
      query = { where: {sexo:sexo, ramo: {[Op.or]: [2, 3]}, situacao: 1  },  include: ["user", "parceiros_precos"]  }
    }
  
    if (sexo && uf && !cidade) {
      query = { where: {sexo:sexo, uf: uf, ramo: {[Op.or]: [2, 3]}, situacao: 1  },  include: ["user", "parceiros_precos"]  }
    }
  
    if (sexo && uf && cidade) {
      query = { where: {sexo:sexo, uf: uf, cidade: cidade, ramo: {[Op.or]: [2, 3]}, situacao: 1  },  include: ["user", "parceiros_precos"]  }
    }
  
    if (!sexo && uf && cidade) {
      query = { where: {uf: uf, cidade: cidade, ramo: {[Op.or]: [2, 3]}, situacao: 1  },  include: ["user", "parceiros_precos"]  }
    }

    if (!sexo && uf && !cidade)  {
      query = { where: {uf: uf, ramo: {[Op.or]: [2, 3]}, situacao: 1  },  include: ["user", "parceiros_precos"]  }
    }
  
    if (!sexo && !uf && !cidade) {    
      query =  { where: { ramo: {[Op.or]: [2, 3]}, situacao: 1  },include: ["user", "parceiros_precos"]  }
    }
  }


  Parceiro.findAll(query)  
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

exports.findParceiro = (req, res) => {

 
  const userId = req.params.id;
  var query = {};

  if (userId) {
    query = {where: {userId: userId}, include: ["user", "parceiros_precos"] }
  }

  if (!req.params) {
    query = { include: ["user", "parceiros_precos"]} 
  }


  

  Parceiro.findAll(query)  
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
			res.json({'msg': 'File uploaded successfully!'});
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