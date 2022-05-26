class Main{
    async ajax(url, method="get"){
        return await fetch(url, {method: method}.then(rta => rta.text()))
    }
}

const main = new Main()
//main.start()