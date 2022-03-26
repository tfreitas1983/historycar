module.exports = (sequelize, Sequelize) => {
    const Veiculos_Recalls = sequelize.define("veiculos_recalls", {      
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },       
        peca: { type: Sequelize.STRING },
        datareparo: { type: Sequelize.DATEONLY },
        concessionaria: { type: Sequelize.STRING },
        situacao: { type: Sequelize.BOOLEAN },
    });
  
    return Veiculos_Recalls;
  };