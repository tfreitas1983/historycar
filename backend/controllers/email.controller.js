const db = require("../models");
const config = require("../config/auth.config");
const authemail = require('./authemail.json')
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var nodemailer = require("nodemailer");
var bcrypt = require("bcryptjs");

exports.email = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "O e-mail não pode ficar em branco!"
        })
    }

    const id = req.params.id;
    const acao = req.query.acao;    
    const email = req.query.email;
    var novasenha = Math.floor(1000 + Math.random() * 9000).toString();
    const password =  bcrypt.hashSync(novasenha, 8);
    console.log('authemail', authemail)
    var remetente = nodemailer.createTransport({
		service: "Hotmail",
		auth: authemail
	});

	if (acao === 'esqueci') {
		console.log('ação', acao)
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

		var emailASerEnviado = {
			from: 'autohistorysuporte@hotmail.com',
			to: email,
			subject: 'Nova senha Auto History',
			text: 'Olá! Sua nova senha do app é: ' + novasenha,
		};	

		remetente.sendMail(emailASerEnviado, function(error){
			if (error) {
				console.log(error);
			} else {
				console.log('Email enviado com sucesso!');
			}
		});
	}

	

}




