module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("cliente", {
      nome: { type: Sequelize.STRING },
      apelido: { type: Sequelize.STRING },
      tipo: { type: Sequelize.INTEGER },
      cpf: { type: Sequelize.STRING },
      cnpj: { type: Sequelize.STRING },
      sexo: { type: Sequelize.STRING },
      cep: { type: Sequelize.INTEGER },
      endereco: { type: Sequelize.STRING },
      numero: { type: Sequelize.STRING },
      complemento: { type: Sequelize.STRING },
      bairro: { type: Sequelize.STRING },
      cidade: { type: Sequelize.STRING },
      uf: { type: Sequelize.STRING },
      celular: { type: Sequelize.STRING },
      foto: { type: Sequelize.STRING },
      situacao: { type: Sequelize.BOOLEAN }
    });
  
    return Cliente;
  };