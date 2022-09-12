const db = require("../models");
const config = require("../config/auth.config");
const authemail = require('./authemail.json')
const User = db.user;
const Cliente = db.cliente;
const Veiculo = db.veiculo;
const Suporte = db.suporte;
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
    var remetente = nodemailer.createTransport({
		service: "Hotmail",
		auth: authemail
	});

	if (acao === 'esqueci') {
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
			html: `<p>Olá!</p>
			<pre>
			

			Sua nova senha do app é: ${novasenha}

			Sugerimos a troca desta no app, dentro da área Ajustes.
			Qualquer outro problema entre em contato na área suporte colocando um print da tela.

			Atenciosamente,
			Equipe Auto History
			</pre>`,

		};	

		remetente.sendMail(emailASerEnviado, function(error){
			if (error) {
				console.log(error);
			} else {
				console.log('Email enviado com sucesso!');
			}
		});
	}


	if (acao === 'transferencia') {

	    const userId = parseInt(req.query.user);
	    const clienteId = parseInt(req.query.cliente);
	    const veiculoId = parseInt(req.query.veiculo);

		async function pegaDados () {

			let usuario = await User.findByPk(userId)  
		      .then(data => {
		      	return data.dataValues		       	
		       })
		      .catch(err => {
		          console.log("erro usuario", err)
		      })     
	    
		      let veiculo = await	Veiculo.findByPk(veiculoId)  
		      .then(data => {
		        return data.dataValues;
		      })
		      .catch(err => {
		          console.log("erro veiculo", err)
		      })
	    
		    let cliente = await  Cliente.findByPk(clienteId)  
		      .then(data => {
		       return data.dataValues;
		      })
		      .catch(err => {
		          console.log("erro cliente", err)
		      })

		    var emailASerEnviado = {
				from: 'autohistorysuporte@hotmail.com',
				to: usuario.email,
				subject: 'Auto History - Solicitação de transferência de veículo',
				html: `<p>Olá, <b>${cliente.nome}</b>!</p> 
				<p>Você solicitou a transferência do <b>${veiculo.modelodescricao}</b> - <b>${veiculo.ano}</b> </p>
				<p>Em breve retornaremos com um novo e-mail confirmando a transferência. </p>
				<p>Caso não tenha enviado um CRV de forma legível, solicitaremos por e-mail uma nova foto</p>
				<pre>


				</pre>
				<p> Atenciosamente,</p>
				<p> Equipe Auto History</p>
				 `,
			};	

			remetente.sendMail(emailASerEnviado, function(error){
				if (error) {
					console.log(error);
				} else {
					res.send('Email enviado com sucesso!');
				}
			});
	      
	    }

	    pegaDados();
	    
	}

	if (acao === 'suporte') {
		const userId = parseInt(req.query.user);
		const suporteId =  parseInt(req.query.suporte);

		async function chamado () {

			let usuario = await User.findByPk(userId)  
		      .then(data => {
		      	return data.dataValues		       	
		       })
		      .catch(err => {
		          console.log("erro usuario", err)
		      })  

		    let suporte = await Suporte.findByPk(suporteId)  
		      .then(data => {
		      	return data.dataValues		       	
		       })
		      .catch(err => {
		          console.log("erro usuario", err)
		      }) 

		 	var emailASerEnviado = {
				from: 'autohistorysuporte@hotmail.com',
				to: usuario.email,
				subject: 'Auto History - Solicitação de suporte',
				html: `<p>Olá!</p> 
				<p>Você solicitou nossa ajuda com o tema: <b>${suporte.assunto.toUpperCase()}</b> </p>
				<p>Com o seguinte conteúdo: ${suporte.descricao.toUpperCase()}</p>
				<p>Em breve retornaremos com um novo e-mail com mais informações. </p>
				
				<pre>


				</pre>
				<p> Atenciosamente,</p>
				<p> Equipe Auto History</p>
				 `,
			};	

			remetente.sendMail(emailASerEnviado, function(error){
				if (error) {
					console.log(error);
				} else {
					res.send('Email enviado com sucesso!');
				}
			});

		}   
		chamado();

	}

	if (acao === 'registro') {

		
	}
	

}




