var variableTest = null
class Http{

    async get(url, id){
        try{
            var res = await fetch(url + (id || ''), {method: 'get'})
            variableTest = res
            return res.json()
            
        }
        catch(error){
            console.error("GET ERROR", error)
        }
    }

    async post(url, data){
        try{
            return await fetch(url, {
                method: "post",
                body: JSON.stringify(data),
                headers:{"content-type": "application/json"}
            })
            .then(rta => rta.json())
        }
        catch(error){
            console.error("POST ERROR", error)
        }
    }

    async put(url, id, data){
        try{
            return await fetch(`${url}/${id}`, {
                method: "put",
                body: JSON.stringify(data),
                headers:{"content-type": "application/json"} 
            })
            .then(rta => rta.json())
        }
        catch(error){
            console.error("PUT ERROR", error)
        }
    }

    async del(url, id){
        try{
            return await fetch(`${url}/${id}`, {method: "delete"})
            .then(rta => rta.json())
        }
        catch(error){
            console.error("DELETE ERROR", error)
        }
    }
}

const http = new Http()