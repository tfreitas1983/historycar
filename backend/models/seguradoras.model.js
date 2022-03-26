module.exports = (sequelize, Sequelize) => {
    const Seguradoras = sequelize.define("seguradoras", {    
        descricao: { type: Sequelize.STRING },
        situacao: { type: Sequelize.BOOLEAN },
    });
  
    return Seguradoras;
  };