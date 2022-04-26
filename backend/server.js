const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require ('path')
const fs = require("fs")
const app = express();

const sgMail = require('@sendgrid/mail')


//Configurações de e-mail



var corsOptions = {
  origin: ["http://localhost:3002","http://10.1.1.26:3002"]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));




app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
})

app.use("/files", express.static(path.resolve(__dirname, 'controllers' , 'uploads')))

const db = require("./models");
const Role = db.role;

/*
db.sequelize.sync({force: true}).then(() => {
  console.log('Apaga e sincroniza da base de dados');
  initial();
}); */


function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}




// simple route
app.get("/", (req, res) => {
  res.json({ message: "AutoHistory." });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/clientes.routes')(app);
require('./routes/parceiros.routes')(app);
require('./routes/parceirosprecos.routes')(app);
require('./routes/ceps.routes')(app);
require('./routes/seguradoras.routes')(app);
require('./routes/veiculos.routes')(app);
require('./routes/veiculosseguros.routes')(app);
require('./routes/veiculosplacas.routes')(app);
require('./routes/veiculosrecalls.routes')(app);
require('./routes/veiculosmanutencoes.routes')(app);
require('./routes/clientestransferencias.routes')(app);
require('./routes/veiculosclientes.routes')(app);





// set port, listen for requests
const PORT = process.env.PORT || 5099;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

require('dotenv').config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const msg = {
  to: 'tfreitas1983@gmail.com', // Change to your recipient
  from: 'autohistorysuporte@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
