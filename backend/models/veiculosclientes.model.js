module.exports = (sequelize, Sequelize) => {
    const Veiculos_Clientes = sequelize.define("veiculos_clientes", {      
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },       
        dataaquisicao: { type: Sequelize.DATEONLY },
        kmaquisicao: { type: Sequelize.INTEGER },
        datavenda: { type: Sequelize.DATEONLY },
        kmvenda: { type: Sequelize.INTEGER },
        situacao: { type: Sequelize.BOOLEAN },
    });
  
    return Veiculos_Clientes;
  };