const Sequelize = require('sequelize');
const database = require('../config/db');

const colaborador = database.define('Colaborador', {
    IDColaborador: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    EDV: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    Senha: {
        type: Sequelize.STRING(16),
        allowNull: false
    },
})

module.exports = colaborador
