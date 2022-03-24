module.exports = (sequelize, Sequelize) => {
    const Parceiro = sequelize.define("parceiro", {
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
        ramo: { type: Sequelize.INTEGER },
        mecanica: { type: Sequelize.BOOLEAN },
        funilaria: { type: Sequelize.BOOLEAN },
        equipamentos: { type: Sequelize.BOOLEAN },
        vistoria: { type: Sequelize.BOOLEAN },
        precompra: { type: Sequelize.BOOLEAN },
        resumo: { type: Sequelize.STRING },
        reputacao: { type: Sequelize.FLOAT },
        foto: { type: Sequelize.STRING },
        situacao: { type: Sequelize.BOOLEAN }
    });
  
    return Parceiro;
  };