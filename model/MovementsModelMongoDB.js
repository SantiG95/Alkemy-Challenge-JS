import mongoose from "mongoose"
import DB_Mongo from "./DB_Mongo.js"

const movementSchema = mongoose.Schema({
    fecha: Date,
    concepto: String,
    monto: Number,
    tipoMovimiento: String 
})

const MovementModel = mongoose.model("movements", movementSchema)

class MovementModelMongoDB {
    static connectionOK = false

    async createMovement(movement){
        if(!DB_Mongo.connectionOK) return {}

        try{
            const movementSave = new MovementModel(movement)
            await movementSave.save()

            let movements = await MovementModel.find({}).lean()
            let movementSaved = movements[movements.length-1]

            return DB_Mongo.genIdKey(movementSaved)
        }
        catch(error){
            console.log(`Error on createMovement: ${error.message}`)
            return {}
        }
    }

    async readMovements(){
        if(!DB_Mongo.connectionOK) return {}

        try{
            return DB_Mongo.genIdKey(await MovementModel.find({}).lean)
        }
        catch(error){
            console.log(`Error on readMovements: ${error.message}`)
            return {}
        }
    }

    async readMovement(id){
        if(!DB_Mongo.connectionOK) return {}

        try{
            return await DB_Mongo.genIdKey(await MovementModel.findOne({_id : id}))
        }
        catch(error){
            console.log(`Error on readMovement: ${error.message}`)
            return {}
        }
    }

    async updateMovement(id, movement){
        if(!DB_Mongo.connectionOK) return {}

        try{
            await MovementModel.updateOne({_id:id},{$set: movement})

            return await DB_Mongo.genIdKey(await MovementModel.findOne({_id:id}))
        }
        catch(error){
            console.log(`Error on updateMovement: ${error.message}`)
            return {}
        }
    }

    async deleteMovement(id){
        if(!DB_Mongo.connectionOK) return {}

        try{
            let movementDeleted = await MovementModel.findOne({_id:id}).lean()
            await MovementModel.deleteOne({_id:id})
            return DB_Mongo.genIdKey(movementDeleted)
        }
        catch(error){
            console.log(`Error on deleteMovement: ${error.message}`)
            return {}
        }
    }
}

export default MovementModelMongoDB