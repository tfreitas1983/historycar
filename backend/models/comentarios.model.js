module.exports = (sequelize, Sequelize) => {
    const Comentarios = sequelize.define("comentarios", {
      comentario: { type: Sequelize.STRING },
      nota: { type: Sequelize.INTEGER },   
      userId: { type: Sequelize.INTEGER },   
      situacao: { type: Sequelize.BOOLEAN },
      }, {
        tableName: "comentarios"
    });
  
    return Comentarios;
  };