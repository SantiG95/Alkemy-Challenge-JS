import config from "../config.js"
import MovementModel from "../model/MovementsModel.js"
import MovementValidation from "../model/movementValidation.js"

const model = MovementModel.get(config.PERSISTENCY_TYPE)

const getMovement = async id => {
    return await model.readMovement(id)
}

const getMovements = async () => {
    return await model.readMovements()
}

const saveMovement = async movement => {
    console.log(movement)
    var validationError = MovementValidation.validate(movement)
    if(!validationError){
        return await model.createMovement(movement)
    }

    console.log(`Error at saveMovement:`, validationError.details[0].message)
    return {}
}

const updateMovement = async (id, movement) => {
    var validationError = MovementValidation.validate(movement)
    if(!validationError){
        return await model.updateMovement(id, movement)
    }
    console.log(`Error at updateMovement:`, validationError.details[0].message)
    return {}
}

const eraseMovement = async id => {
    return await model.deleteMovement(id)
}

export default {
    getMovement,
    getMovements,
    saveMovement,
    updateMovement,
    eraseMovement
}