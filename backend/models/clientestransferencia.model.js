module.exports = (sequelize, Sequelize) => {
    const Clientes_Transferencia = sequelize.define("clientes_transferencia", { 
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        datasolicitacao: { type: Sequelize.DATE },
        descricao: { type: Sequelize.STRING },
        fotocrv: { type: Sequelize.STRING },
        situacao: { type: Sequelize.BOOLEAN },
    });
  
    return Clientes_Transferencia;
  };