import Joi from "joi"

class MovementValidation{
    static validate(movement){
        const movementSchema = Joi.object({
            fecha: Joi.date().required(),
            concepto: Joi.string().required(),
            monto: Joi.number().required(),
            tipoMovimiento: Joi.string().required(),
        })

        const {error} = movementSchema.validate(movement)

        return error
    }
}

export default MovementValidation