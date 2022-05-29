class MovementController extends MovementModel {
    constructor(){
        super()
        this.saveMovement = this.saveMovement.bind(this)
    }

    async getMovements(){
        this.movements = await movementService.getMovementsService()
        return this.movements
    }

    async saveMovement(movement){
        let savedMovement = await movementService.saveMovementService(movement)
        this.movements.push(savedMovement)

        renderMovements(this.movements)
    }

    async updateMovement(id){
        let movement = newMovementForm.readEnteredMovement()
        newMovementForm.clearForm()

        let updatedMovement = await movementService.updateMovementService(id, movement)

        let index = this.movements.findIndex(movement => movement.id == updatedMovement.id)
        this.movements.splice(index, 1, updatedMovement)

        renderMovements(this.movements)
    }

    async eraseMovement(id){
        let erasedMovement = await movementService.eraseMovementService(id)

        let index = this.movements.findIndex(movement => movement.id == erasedMovement.id)
        this.movements.splice(index, 1)

        renderMovements(this.movements)
    }
}

const movementController = new MovementController()