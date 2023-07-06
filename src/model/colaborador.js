const Sequelize = require('sequelize');
const database = require('../config/db');

const colaborador = database.define('Colaborador', {
    EDV: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    Senha: {
        type: Sequelize.STRING(16),
        allowNull: false
    },
    CPF: {
        type: Sequelize.STRING(14),
        allowNull: false
    }
},
{
    freezeTableName: true
})

module.exports = colaborador
