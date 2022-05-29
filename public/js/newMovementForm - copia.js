inputs = [
    document.getElementById("conceptoLabel"),
    document.getElementById("importeLabel"),
    document.getElementById("fechaLabel"),
    document.getElementById("ingresoOption"),
    document.getElementById("egresoOption")
]

var newMovementForm = document.getElementById("div-form")
var submitButton = document.getElementById("submitButton")
var eraseButton = document.getElementById("eraseButton")
submitButton.disabled = true
var validFields = [false, false, false, false]
var movements = []

inputs.forEach(field => {
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

newMovementForm.addEventListener("submit", e => {
    e.preventDefault()
    var movement = this.readEnteredMovement()
    this.clearForm()

    //if(saveMovement) saveMovement(movement)
    this.movements.push(movement)

    renderMovements()
})


function validateText(field){
    var lenght = field.value.trim().length
    this.validFields[0] = lenght != 0 ? true : false
    validateFields()
}

function validateNumber(field){
    this.validFields[1] = field.value > 0 ? true : false
    validateFields()
}

function validateDate(field){
    this.validFields[2] = field.value != null ? true : false
    validateFields()
}

function validateRadio(field){
    this.validFields[3] = true
    validateFields()
}

function validateFields(){
    var allOK = true
    validFields.forEach(field => {
        if(field == false){
            allOK = false
        }
    })

    this.submitButton.disabled = !allOK
}

function clearFields(){
    submitButton.disabled = true
    validFields = [false, false, false, false]
    inputs.forEach(input => {
        if(input.type == "radio"){
            input.checked = false
        }
        else{
            input.value = "";
        }
    })
}

eraseButton.addEventListener("click", () =>
    clearFields()
)