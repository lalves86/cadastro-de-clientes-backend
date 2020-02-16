import Sequelize, { Model } from 'sequelize';

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        address: Sequelize.STRING,
        phone: Sequelize.NUMBER,
        status: Sequelize.ENUM('ativo', 'excluído', 'inativo'),
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Client;
