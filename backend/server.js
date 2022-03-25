const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require ('path')
const fs = require("fs")

const app = express();

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
});  */


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


// set port, listen for requests
const PORT = process.env.PORT || 5099;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});