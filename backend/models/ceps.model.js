module.exports = (sequelize, Sequelize) => {
    const Ceps = sequelize.define("ceps", {
      cep: { type: Sequelize.INTEGER },
      endereco: { type: Sequelize.STRING },
      numero: { type: Sequelize.STRING },
      complemento: { type: Sequelize.STRING },
      bairro: { type: Sequelize.STRING },
      cidade: { type: Sequelize.STRING },
      uf: { type: Sequelize.STRING },
      situacao: { type: Sequelize.BOOLEAN },
    });
  
    return Ceps;
  };