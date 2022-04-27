const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    tipo: req.body.tipo,
    situacao: req.body.situacao
  })
  .then(user => {
    if (req.body.roles) {
      Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      }).then(roles => {
        user.setRoles(roles).then(() => {
          res.send({ message: "Usuário registrado com sucesso!" });
        });
      });
    } else {
      // user role = 1
      user.setRoles([1]).then(() => {
        res.send({ message: "Usuário registrado com sucesso!" });
      });
    }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Senha Inválida!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          email: user.email,
          tipo: user.tipo,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.buscarTodos = (req, res) => {   
  
  User.findAll()   
      .then(data => {
          res.send(data)
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Um erro ocorreu ao buscar o usuários"
          })
      })
}

exports.buscarUm = (req, res) => { 
  const id = req.params.id

  return User.findByPk(id)  
      .then(data => {
        res.send(data)
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || `Um erro ocorreu ao buscar o usuário ${email}`
          })
      })
}

exports.editar = (req, res) => {   
  const id = req.params.id
  const email = req.body.email

  User.update({ email: email}, { where:{id: id}}  )   
  .then(data => {
    if (!data) {
        res.status(404).send({
            message: `Não foi possível encontrar e/ou alterar o usuário ${email}. `
        })
    } else res.send({
            message: "Usuário alterado com sucesso!"                
        })    
  })
  .catch(err => {
      res.status(500).send({
          message: "Erro ao alterar o usuário " + email
      })
  })
}

exports.change = (req, res) => {
  const email = req.body.email
  const password =  bcrypt.hashSync(req.body.password, 8) 

  User.update( {password: password}, {where: {email: email}} )
  .then(data => {
    if (!data) {
        res.status(404).send({
            message: `Não foi possível encontrar e/ou alterar o senha do usuário ${email}. `
        })
    } else res.send({
            message: "Senha alterada com sucesso!"                
        })    
  })
  .catch(err => {
      res.status(500).send({
          message: "Erro ao alterar a senha do usuário " + email
      })
  })
}