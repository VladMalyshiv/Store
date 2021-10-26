const sequelize = require ('../db')
const {DataTypes} = require ('sequelize')

const user = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email:{type:DataTypes.STRING, unique: true},
    password:{type:DataTypes.STRING, allowNull:false},
    role:{type:DataTypes.STRING, defaultValue: "user"},
})
const basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const basket_device = sequelize.define('basket_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate:{type:DataTypes.FLOAT, allowNull:false},
})
const device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type:DataTypes.STRING, allowNull:false},
    price:{type:DataTypes.FLOAT, allowNull:false},
    rating:{type:DataTypes.FLOAT, defaultValue:0},
    img:{type:DataTypes.STRING, allowNull:false},
})
const device_info = sequelize.define('device-info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title:{type:DataTypes.STRING, allowNull:false},
    description: {type:DataTypes.STRING, allowNull:false},
})
const type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, allowNull:false},
})
const brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, allowNull:false},
})

const typeBrand = sequelize.define('typeBrand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

user.hasOne(basket)
basket.belongsTo(user)

user.hasMany(rating)
rating.belongsTo(user)

basket.hasMany(basket_device)
basket_device.belongsTo(basket)

basket_device.hasOne(device)
device.belongsTo(basket_device)

type.hasMany(device)
device.belongsTo(type)

brand.hasMany(device)
device.belongsTo(brand)

device.hasMany(rating)
rating.belongsTo(device)

device.hasMany(device_info, {as:'info'})
device_info.belongsTo(device)

type.belongsToMany(brand,{through:typeBrand,})
brand.belongsToMany(type,{through:typeBrand,})

module.exports = {
    user,
    basket,
    basket_device,
    rating,
    device,
    device_info,
    type,
    brand,
    typeBrand
}