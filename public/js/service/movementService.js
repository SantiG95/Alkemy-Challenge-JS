class MovementService{
    URL_MOVEMENTS = "api/movements/"

    async getMovementsService(){
        let movements = await http.get(this.URL_MOVEMENTS)
        return movements
    }

    async saveMovementService(movement){
        let savedMovement = await http.post(this.URL_MOVEMENTS, movement)
        return savedMovement
    }

    async updateMovementService(id, movement){
        let updatedMovement = await http.put(this.URL_MOVEMENTS, id, movement)
        return updatedMovement
    }

    async eraseMovementService(id){
        let erasedMovement = await http.del(this.URL_MOVEMENTS, id)
        return erasedMovement
    }
}

const movementService = new MovementService()