const inputText = document.getElementById("input")
const keys = document.getElementById("keys");

let previousInput = "";
let operator = "";
let currentInput = "0";


// Clear Button
function clear() {
    previousInput = "";
    operator = "";
    currentInput = "0";
}

function displayInput() {
    inputText.innerText = currentInput;
}

function calculate(operator){
    let num1 = parseInt(previousInput);
    let num2 = parseInt(currentInput);

    if(operator === "+"){
        console.log(previousInput, operator, currentInput)
    }
}

keys.addEventListener("click", (event) => {
    if(event.target && event.target.nodeName === "DIV" && event.target.innerText !== ""){
        const clickedValue = event.target.innerText;
        
        
        if(clickedValue === "AC"){
            clear();
        }else if(clickedValue === "DEL"){
            // let cut = currentInput.slice(0, -1);
        }else if(clickedValue === "/" || clickedValue === "*" || clickedValue === "-" || clickedValue === "+"){
            previousInput = currentInput;
            operator = clickedValue;
            currentInput = operator; 
            calculate(operator);
        }else{
            if(currentInput === "0" || currentInput === "."){
                currentInput = clickedValue;
            }else{
                currentInput += clickedValue;
            }
        }
    }

    displayInput();
})