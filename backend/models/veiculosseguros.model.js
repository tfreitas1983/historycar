module.exports = (sequelize, Sequelize) => {
    const Veiculos_Seguros = sequelize.define("veiculos_seguros", {      
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },       
        vigenciainicio: { type: Sequelize.DATE },
        vigenciafim: { type: Sequelize.DATE },
        valor: { type: Sequelize.FLOAT },
        situacao: { type: Sequelize.BOOLEAN },
    });
  
    return Veiculos_Seguros;
  };