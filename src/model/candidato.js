const Sequelize = require('sequelize');
const database = require('../config/db');
const processo = require('./processo')

const candidato = database.define('Candidato', {
    IDCandidato: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    Nome: {
        type: Sequelize.STRING(100),
        allowNull: false
    },

    Nota1: {
        type: Sequelize.FLOAT,
        allowNull: false
    },

    Nota2: {
        type: Sequelize.FLOAT,
        allowNull: false
    },

    Nota3: {
        type: Sequelize.FLOAT,
        allowNull: false
    },

    Nota4: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
},
{
    freezeTableName: true
});

candidato.belongsTo(processo, {
    constraint: true,
    foreignKey: 'IDProcesso'
})

module.exports = candidato;