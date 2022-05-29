import MovementModelFile from "./MovementsModelFile.js"
import MovementModelMongoDB from "./MovementsModelMongoDB.js"

class MovementModel {
    static get(type){
        switch(type){
            case "FILE":
                console.log("Movements persistence: FILE")
                return new MovementModelFile()

            case "MONGODB":
                console.log("Movements persistence: MONGODB")
                return new MovementModelMongoDB()
        }
    }
}

export default MovementModel