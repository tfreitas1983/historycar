module.exports = (sequelize, Sequelize) => {
    const Veiculo = sequelize.define("veiculos", {
      renavam: {
        type: Sequelize.STRING
      },
      chassi: {
        type: Sequelize.STRING
      },
      fabricante: {
        type: Sequelize.STRING
      },
      modelo: {
        type: Sequelize.STRING
      },
      modelodescricao: {
        type: Sequelize.STRING
      },
      ano: {
        type: Sequelize.STRING
      },
      combustivel: {
        type: Sequelize.STRING
      },
      situacao: {
        type: Sequelize.BOOLEAN
      },
    });
  
    return Veiculo;
  };