const {brand} = require ('../models/models')

class brandController{
    async create (req, res){
        const {name} = req.body
        const Brand = await brand.create({name})
        return res.json(Brand)
    }

    async getAll (req, res){
        const brands = await brand.findAll()
        res.json(brands)
    }
    async Delete (req, res){
        const {id} = req.params
        await brand.destroy({
            where:{
                id:id
            }
        })
        return res.json({message:"Deleted successfully"})
    }
}

module.exports = new brandController()