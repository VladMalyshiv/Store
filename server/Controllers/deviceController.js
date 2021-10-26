const {device, device_info} = require('../models/models')
const uuid = require ('uuid')
const path = require ('path')
const ApiError = require ('../error/ApiError')

class deviceController{
    async create (req, res, next){
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const Device = await  device.create({name, price, brandId, typeId, img: fileName})
            if(info){
                info = JSON.parse(info)
                info.forEach(i=>{
                    device_info.create({
                        title:i.title,
                        description: i.description,
                        deviceId: Device.id
                    })
                })
            }

            return res.json(Device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll (req, res){
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if (!brandId && !typeId) {
            devices = await device.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            devices = await device.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            devices = await device.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            devices = await device.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(devices)
    }

    async getOne (req, res){
        const {id} = req.params
        const Device = await device.findOne({
            where: {id},
            include: {model: device_info, as:'info'}
        })
        return res.json(Device)
    }
    async Delete (req, res){
        const {id} = req.params
        await device.destroy({where:{id}
        })
        return res.json({message:"Deleted successfully"})
    }

}

module.exports = new deviceController()