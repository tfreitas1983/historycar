module.exports = (sequelize, Sequelize) => {
    const Veiculo = sequelize.define("veiculos", {
      renavam: { type: Sequelize.STRING  },
      chassi: { type: Sequelize.STRING },
      fabricante: { type: Sequelize.STRING },
      modelo: { type: Sequelize.STRING },
      modelodescricao: { type: Sequelize.STRING },
      ano: {type: Sequelize.STRING },
      idfabricante: { type: Sequelize.STRING },
      idmodelo: { type: Sequelize.STRING },
      idano: { type: Sequelize.STRING },
      combustivel: { type: Sequelize.STRING },
      gnv: { type: Sequelize.BOOLEAN },
      situacao: { type: Sequelize.BOOLEAN },
    });
  
    return Veiculo;
  };