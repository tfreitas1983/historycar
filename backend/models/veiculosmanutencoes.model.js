module.exports = (sequelize, Sequelize) => {
    const Veiculos_Manutencoes = sequelize.define("veiculos_manutencoes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },  
      tipo: { type: Sequelize.INTEGER ,  comment: '1 = rotina; 2 = recall'},
      km: { type: Sequelize.STRING },
      datamanutencao: { type: Sequelize.DATEONLY },
      detalhes: { type: Sequelize.STRING },
      garantia: { type: Sequelize.DATEONLY },
      mecanica: { type: Sequelize.STRING },
      cep: { type: Sequelize.INTEGER },
      endereco: { type: Sequelize.STRING },
      numero: { type: Sequelize.STRING },
      complemento: { type: Sequelize.STRING },
      bairro: { type: Sequelize.STRING },
      cidade: { type: Sequelize.STRING },
      uf: { type: Sequelize.STRING },
      responsavel: { type: Sequelize.STRING },
      fotokm: { type: Sequelize.STRING },
      fotonf: { type: Sequelize.STRING },
      fotoservico: { type: Sequelize.STRING },
      situacao: { type: Sequelize.BOOLEAN },
    });
  
    return Veiculos_Manutencoes;
  };