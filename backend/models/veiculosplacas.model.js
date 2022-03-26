module.exports = (sequelize, Sequelize) => {
    const Veiculos_Placas = sequelize.define("veiculos_placas", {      
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },       
        placa: {
            type: Sequelize.STRING
        },
        situacao: {
            type: Sequelize.BOOLEAN
        },
    });
  
    return Veiculos_Placas;
  };