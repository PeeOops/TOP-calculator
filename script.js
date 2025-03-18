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

    if(operator){
        inputText.innerText = operator;
    }else if(operator && currentInput){
        inputText.innerText = currentInput;
    }


}

function calculate() {
    let result;
  
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
  
    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        result = num1 / num2;
        break;
      default:
        result = num2;
        break;
    }
  
    currentInput = result.toString();
    operator = '';
    previousInput = '';
    displayInput();
  }

keys.addEventListener("click", (event) => {
    if(event.target && event.target.nodeName === "DIV" && event.target.innerText !== ""){
        const clickedValue = event.target.innerText;
        
        
        if(clickedValue === "AC"){
            clear();
        }else if(clickedValue === "DEL"){
            // let cut = currentInput.slice(0, -1);
        }else if(clickedValue === "/" || clickedValue === "*" || clickedValue === "-" || clickedValue === "+"){
            if(operator){
                calculate();
            }
            previousInput = currentInput;
            operator = clickedValue;
            currentInput = ""; 

        }else if(clickedValue === "="){
            calculate();

        }else{
            if(currentInput === "0" && currentInput !== "."){
                currentInput = clickedValue;
            }else{
                currentInput += clickedValue;
            }
        }
    }

    displayInput();
})

