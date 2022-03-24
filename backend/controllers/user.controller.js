exports.allAccess = (req, res) => {
    res.status(200).send("Conteúdo Público.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("Conteúdo do usuário.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Conteúdo do Admin.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Conteúdo do Diretor.");
  };