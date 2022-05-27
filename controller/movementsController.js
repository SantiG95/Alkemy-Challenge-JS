import movementService from "../service/movementService.js"

const getMovements = async(req, res) => {
    let id = req.params.id
    if(id){
        let movement = await movementService.getMovement(id)
        res.json(movement)
    }
    else{
        let movements = await movementService.getMovements()
        res.json(movements)
    }
}

const saveMovement = async(req, res) => {
    let savedMovement = await movementService.saveMovement(req.body)
    res.json(savedMovement)
}

const updateMovement = async (req, res) => {
    let updatedMovement = await movementService.updateMovement(req.params.id, req.body)
    res.json(updatedMovement)
}

const eraseMovement = async (req, res) => {
    let erasedMovement = await movementService.eraseMovement(req.params.id)
    res.json(erasedMovement)
}

export default{
    getMovements,
    saveMovement,
    updateMovement,
    eraseMovement
}