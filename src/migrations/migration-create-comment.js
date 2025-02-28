'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comment', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'product',
          key: 'id'
        }
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      fullname: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      star: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      created_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comment');
  },
};
