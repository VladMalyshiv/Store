const {type} = require ('../models/models')
const ApiError = require ('../error/ApiError')

class typeController{
    async create (req, res){
        const {name} = req.body
        const Type = await type.create({name})
        return res.json(Type)
    }

    async getAll (req, res){
        const types = await type.findAll()
        res.json(types)
    }
    async Delete (req, res){
        const {id} = req.params
        await type.destroy({
            where:{
                id:id
            }
        })
        return res.json({message:"Deleted successfully"})
    }
}

module.exports = new typeController()