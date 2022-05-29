class newMovementForm {
    inputs = null
    newMovementForm = null
    submitButton = null
    eraseButton = null
    validFields = null
    movement = null

    constructor(renderTable, saveMovement){
        this.inputs = [
            document.getElementById("conceptoLabel"),
            document.getElementById("importeLabel"),
            document.getElementById("fechaLabel"),
            document.getElementById("ingresoOption"),
            document.getElementById("egresoOption")
        ]
        
        this.newMovementForm = document.getElementById("div-form")
        this.submitButton = document.getElementById("submitButton")
        this.eraseButton = document.getElementById("eraseButton")
        this.submitButton.disabled = true
        this.validFields = [false, false, false, false]
        this.movements = []

        this.inputs.forEach(field => {
            switch(field.type){
                case "text":
                    field.addEventListener("input", () => {
                        this.validateText(field)
                    })
                    break
        
                case "number":
                    field.addEventListener("input", () => {
                        this.validateNumber(field)
                    })
                    break
        
                case "date":
                    field.addEventListener("input", () => {
                        this.validateDate(field)
                    })
                    break
        
                case "radio":
                    field.addEventListener("input", () => {
                        this.validateRadio(field)
                    })
                    break
            }
        })

        this.newMovementForm.addEventListener("submit", e => {
            e.preventDefault()
            var movement = this.readEnteredMovement()
            this.clearFields()
        
            if(saveMovement) saveMovement(movement)
            this.movements.push(movement)
        
            renderMovements()
        })

        this.eraseButton.addEventListener("click", () =>
            this.clearFields()
        )


    }

    validateText(field){
        var lenght = field.value.trim().length
        this.validFields[0] = lenght != 0 ? true : false
        this.validateFields()
    }
    
    validateNumber(field){
        this.validFields[1] = field.value > 0 ? true : false
        this.validateFields()
    }
    
    validateDate(field){
        this.validFields[2] = field.value != null ? true : false
        this.validateFields()
    }
    
    validateRadio(field){
        this.validFields[3] = true
        this.validateFields()
    }
    
    validateFields(){
        var allOK = true
        this.validFields.forEach(field => {
            if(field == false){
                allOK = false
            }
        })
    
        this.submitButton.disabled = !allOK
    }

    getIndex(field){
        return this.inputs.indexOf(field)
    }

    readEnteredMovement(){
        return {
            fecha: this.inputs[2].value,
            concepto: this.inputs[0].value,
            monto: this.inputs[1].value,
            tipoMovimiento: this.inputs[3].checked ? "INGRESO" : "EGRESO"
        }
    }

    clearFields(){
        this.submitButton.disabled = true
        this.validFields = [false, false, false, false]
        this.inputs.forEach(input => {
            if(input.type == "radio"){
                input.checked = false
            }
            else{
                input.value = "";
            }
        })
    }
}

function renderMovements(movements){
    //document.querySelector("#action-table").style.visibility = "visible"
    const xhr = new XMLHttpRequest
    xhr.open("get", "templates/movements.hbs")
    xhr.addEventListener("load", () => {
        if(xhr.status = 200){
            var hbsTemplate = xhr.response
            var template = Handlebars.compile(hbsTemplate)
            var html = template({movements})
            document.getElementById("action-table").innerHTML = html
        }
    })
    xhr.send()
}

let newMovementFormVar = null

async function initForm(){
    newMovementFormVar = new newMovementForm(renderMovements, movementController.saveMovement)
    let movements = await movementController.getMovements()
    renderMovements(movements)
}