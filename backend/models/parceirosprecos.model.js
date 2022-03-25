module.exports = (sequelize, Sequelize) => {
    const Parceiros_Precos = sequelize.define("parceiros_precos", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
        remoto: Sequelize.FLOAT,
        remotoinicio: Sequelize.DATE,
        remotofim: Sequelize.DATE,
        presencial: Sequelize.FLOAT,
        presencialinicio: Sequelize.DATE,
        presencialfim: Sequelize.DATE,
        situacao: Sequelize.BOOLEAN
    });
  
    return Parceiros_Precos;
};
