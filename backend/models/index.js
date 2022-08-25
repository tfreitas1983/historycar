const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.cliente = require("./clientes.model.js")(sequelize, Sequelize);
db.clientes_transferencia = require("./clientestransferencia.model.js")(sequelize, Sequelize);
db.parceiro = require("./parceiros.model.js")(sequelize, Sequelize);
db.parceiros_precos = require("./parceirosprecos.model.js")(sequelize, Sequelize);
db.image = require("./image.model.js")(sequelize, Sequelize);
db.suporte = require("./suporte.model.js")(sequelize, Sequelize);
db.seguradora = require("./seguradoras.model.js")(sequelize, Sequelize);
db.veiculo = require("./veiculo.model.js")(sequelize, Sequelize);
db.veiculos_clientes = require("./veiculosclientes.model.js")(sequelize, Sequelize);
db.veiculos_placas = require("./veiculosplacas.model.js")(sequelize, Sequelize);
db.veiculos_manutencoes = require("./veiculosmanutencoes.model.js")(sequelize, Sequelize);
db.veiculos_recalls = require("./veiculosrecalls.model.js")(sequelize, Sequelize);
db.veiculos_seguros = require("./veiculosseguros.model.js")(sequelize, Sequelize);

//Relação usuários e regras N:M
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

//Relação usuários e clientes 1:1
db.user.hasOne(db.cliente);
db.cliente.belongsTo(db.user);

//Relação usuários e parceiros 1:1
db.user.hasOne(db.parceiro);
db.parceiro.belongsTo(db.user);

//Relação parceiros e parceiros_precos 1:N
db.parceiro.hasMany(db.parceiros_precos, {  foreignKey: 'parceiroId' });
db.parceiros_precos.belongsTo(db.parceiro);

//Relação clientes e transferência 1:N
db.cliente.hasMany(db.clientes_transferencia, {  foreignKey: 'clienteId' });
db.clientes_transferencia.belongsTo(db.cliente);

//Relação veículo e transferência 1:N
db.veiculo.hasMany(db.clientes_transferencia, {  foreignKey: 'veiculoId' });
db.clientes_transferencia.belongsTo(db.veiculo);

// Relação usuário e suporte
db.user.hasMany(db.suporte, {foreignKey: 'userId' });
db.suporte.belongsTo(db.user);

//Relação veículos e clientes N:M

db.cliente.belongsToMany(db.veiculo, {
  through: db.veiculos_clientes,
  foreignKey: "clienteId",
  as: "veiculo"
});

db.veiculo.belongsToMany(db.cliente, {
  through: db.veiculos_clientes,
  foreignKey: "veiculoId",
  as: "cliente"
});

db.cliente.hasMany(db.veiculos_clientes, {as: 'veiculos_clientes'});
db.veiculos_clientes.belongsTo(db.cliente, {as:'cliente', foreignKey: 'clienteId'});
db.veiculo.hasMany(db.veiculos_clientes, {as: 'veiculos_clientes'});
db.veiculos_clientes.belongsTo(db.veiculo,{as: 'veiculo', foreignKey: 'veiculoId'});


//Relação veículos e placas 1:N
db.veiculo.hasMany(db.veiculos_placas, { foreignKey: 'veiculoId' });
db.veiculos_placas.belongsTo(db.veiculo);

//Relação veículos e manutenções 1:N
db.veiculo.hasMany(db.veiculos_manutencoes, {  foreignKey: 'veiculoId' });
db.veiculos_manutencoes.belongsTo(db.veiculo);

//Relação veículos e recalls 1:N
db.veiculo.hasMany(db.veiculos_recalls, { foreignKey: 'veiculoId' });
db.veiculos_recalls.belongsTo(db.veiculo);

//Relação veículos e seguros 1:N
db.veiculo.hasMany(db.veiculos_seguros, {  foreignKey: 'veiculoId' });
db.veiculos_seguros.belongsTo(db.veiculo);

//Relação seguradora e veículo 1:1
db.seguradora.hasOne(db.veiculos_seguros);
db.veiculos_seguros.belongsTo(db.seguradora);


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;