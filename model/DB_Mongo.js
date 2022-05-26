import mongoose from "mongoose"
import config from "../config.js"

class DB_Mongo {
    static connectionOK = false
    static pk = "_id"

    static genIdKey(obj){
        if(Array.isArray(obj)){
            for(let i=0; i<obj.length; i++){
                obj[i].id = obj[i][DB_Mongo.pk]
            }
        }
        else{
            obj.id = obj[DB_Mongo.pk]
        }

        return obj
    }

    static async connectDB(){
        try{
            if(!DB_Mongo.connectionOK){
                await mongoose.connect(config.CONNECTION_STRING, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                })
                console.log("Data base CONNECTED!!")
                DB_Mongo.connectionOK = true
            }
        }
        catch(error){
            console.log(`MongoDB ERROR at connect: ${error.message}`)
        }
    }
}

export default DB_Mongo