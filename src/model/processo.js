const Sequelize = require('sequelize');
const database = require('../config/db');

const processo = database.define('Processo', {
    IDProcesso: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    Nome: {
        type: Sequelize.STRING(100),
        allowNull: false
    },

    Etapa: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    Situacao: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }

},
{
    freezeTableName: true
})

module.exports = processo
