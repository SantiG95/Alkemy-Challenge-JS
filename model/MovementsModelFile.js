import fs from "fs"

class MovementsModelFile{
    fileName = "movements.dat"

    async readMovementsFile(){
        try{
            return await JSON.parse(await fs.promises.readFile(this.fileName, "utf-8"))
        }
        catch(error){
            console.log(error.message)
            return []
        }
    }

    async saveMovementsFile(movements){
        await fs.promises.writeFile(this.fileName, JSON.stringify(movements, null, '\t') )
    }

    async getId(){
        return movements.length ? (movements[movements.length -1].id + 1) : 1
    }

    async createMovement(movement){
        let movements = await this.readMovementsFile()

        movement.id = this.getId(movements)
        movements.push(movement)

        await this.saveMovementsFile(movements)

        return movement
    }

    async readMovements(){
        return this.readMovementsFile()
    }

    async readMovement(id){
        let movements = this.readMovementProducts()
        return movements.find(movement => movement.id == id) || {}
    }

    async updateMovement(id, movement){
        let movements = await this.readMovementsFile()

        movement.id = id
        let index = movements.findIndex(movement => movement.id == id)
        movements.slice(index, 1, movement)

        await this.saveMovementsFile(movements)

        return movement
    }

    async deleteMovement(id){
        let movements = await this.readMovementsFile()

        let index = movements.findIndex(movement => movement.id == id)
        let movement = movements.splice(index, 1)[0]

        await this.saveMovementsFile(movements)

        return movement
    }
}

export default MovementsModelFile