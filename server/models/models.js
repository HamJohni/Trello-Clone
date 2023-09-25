const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    name: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING}
})

const Column = sequelize.define('column', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER},
    title: {type: DataTypes.STRING},
})

const Card = sequelize.define('card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    desc: {type: DataTypes.STRING},
    columnId: {type: DataTypes.INTEGER}
})

User.hasMany(Column)
Column.belongsTo(User)

Column.hasMany(Card)
Card.belongsTo(Column)

module.exports = {
    User,
    Column,
    Card
}