let display = document.querySelector(".display")
let hiddenDisplay = document.querySelector('.hiddenDisplay')

//Function clearDisplay
function clearDisplay(){
    hiddenDisplay.innerHTML = ""
    display.innerHTML = "Log a VARIABLE and a VALUE to this console."
    loadDisplay()
}
    

// Add Button Function
function addBtn(varr){
    const newBtn = document.createElement('button')
    newBtn.type = 'button'
    newBtn.className = `${varr}`
    newBtn.innerHTML=varr
    newBtn.setAttribute(`onclick`,`getMyItem('${varr}')`)
    document.querySelector('.hiddenDisplay').appendChild(newBtn)
    document.querySelector('.hiddenDisplay').style.display="table"
}

//Load Button Display
function loadDisplay(){
    if (localStorage.length > 0){
        for (const [key, value] of Object.entries(localStorage)) {
            addBtn(key)
        }
    } else{
        document.querySelector('.hiddenDisplay').style.display="none"
    }
    
}

//Store function
const storeBtn = document.querySelector('.storeBtn');
storeBtn.addEventListener('click',store);


function store(){
    const variable = document.querySelector('.inputVariable').value
    const value = document.querySelector('.inputValue').value
    
    if (localStorage.getItem(variable) == null){
        localStorage.setItem(variable, value)
        display.innerHTML = `O item ${value} foi adicionado com sucesso na variável ${variable}.`
        addBtn(variable)

    }else {
        let existentValue = localStorage.getItem(variable)
        display.innerHTML = `
        <p>A variável ${variable} já existe e tem o valor ${existentValue}.</p>
        <p>Deseja alterá-la? <button type=button onclick=overwrite("${variable}")>Overwrite</button></p>`
    }
    document.querySelectorAll('input').value=""
}

//Getting an iten function

function getMyItem(argument){
    let storedVariable = argument
    let storedValue = localStorage.getItem(storedVariable)
    display.innerHTML=`
    <p>O valor de ${storedVariable} é ${storedValue}</p>
    <p><button type='button' class='deleteBtn' onclick="deleteItem('${storedVariable}')">Delete</button></p>
    ` 
}

//Overwritting a function
function overwrite(argument){
    const value = document.querySelector('.inputValue').value
    const variable = document.querySelector('.inputVariable').value
    localStorage.setItem(argument,`${value}`)
    display.innerHTML = `O item ${value} foi adicionado com sucesso na variável ${variable}.`
}

//Deleting displayed item
function deleteItem(argument){
    localStorage.removeItem(argument)
    clearDisplay()

}
//Clearing Storage fuction
const clearBtn = document.querySelector('.clearBtn');
clearBtn.addEventListener('click', clearStorage)

function clearStorage(){
    if (window.confirm("Esta ação irá deletar todos os itens salvos até o momento. Tens certeza que deseja prosseguir? Essa ação não pode ser desfeita.")){
        localStorage.clear()
        clearDisplay()
    }
}