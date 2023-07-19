const Sequelize = require('sequelize');
const database = require('../config/db');

const colaborador = database.define('Colaborador', {
    EDV: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    Senha: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    CPF: {
        type: Sequelize.STRING(22),
        allowNull: false
    }
},
{
    freezeTableName: true
})

module.exports = colaborador
