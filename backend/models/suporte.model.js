module.exports = (sequelize, Sequelize) => {
    const Suporte = sequelize.define("suporte", {
      assunto: { type: Sequelize.STRING },
      descricao: { type: Sequelize.STRING },      
      foto: { type: Sequelize.STRING },  
      situacao: { type: Sequelize.BOOLEAN },
      }, {
        tableName: "suporte"
    });
  
    return Suporte;
  };