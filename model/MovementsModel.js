import MovementModelMongoDB from "./MovementsModelMongoDB.js"

class MovementModel {
    static get(type){
        switch(type){
            case "MONGODB":
                console.log("Movements persistence: MONGODB")
                return new MovementModelMongoDB()
        }
    }
}

export default MovementModel