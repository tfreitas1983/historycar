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
db.parceiro = require("./parceiros.model.js")(sequelize, Sequelize);
db.parceiros_precos = require("./parceirosprecos.model.js")(sequelize, Sequelize);

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


db.user.hasOne(db.cliente);
db.cliente.belongsTo(db.user);

db.user.hasOne(db.parceiro);
db.parceiro.belongsTo(db.user);

db.parceiro.hasMany(db.parceiros_precos, {
  foreignKey: 'parceiroId'
});
db.parceiros_precos.belongsTo(db.parceiro);


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;