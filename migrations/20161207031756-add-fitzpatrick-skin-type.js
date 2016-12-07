'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Users','skinType', {
      type:Sequelize.STRING,
      defaultValue: ''
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Users','skinType');
  }
};
