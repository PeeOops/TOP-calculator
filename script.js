const inputText = document.getElementById("input")
const keys = document.getElementById("keys");

// Variable declarations to hold previousInput, operator and currentInput
let previousInput = "";
let operator = "";
let currentInput = "0";


// Clear Button
function clear() {
    previousInput = "";
    operator = "";
    currentInput = "0";
}

// Format number with commas
function formatNumber(numStr) {
    if(numStr === "Error") return numStr;

    // Handle decimal numbers
    const [integerPart, decimalPart] = numStr.split(".");

    // Avoid formatting empty or invalid numbers
    if(isNaN(parseInt(integerPart))) return "0";

    const formattedInt = parseInt(integerPart).toLocaleString();

    return decimalPart !== undefined ? `${formattedInt}.${decimalPart}` : formattedInt;
}

// Display input
function displayInput() {
     if (currentInput) {
        // Format number with commas
        let formattedInput = formatNumber(currentInput);
        inputText.innerText = formattedInput;
    }
    

}

// Calculate function
function calculate() {
    let result;

    // Parse string to float and replace commas
    const num1 = parseFloat(previousInput.replace(/,/g, ''));
    const num2 = parseFloat(currentInput.replace(/,/g, ''));

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
            result = num2 !== 0 ? num1 / num2 : "Error";
            break;
        default:
            result = num2;
            break;
    }

    // Check result digit length
    if(result !== "Error" && result.toString().replace(/\D/g, '').length > 12){
        currentInput = "Error";
    } else {
        currentInput = result.toString();
    }

    displayInput();
    operator = '';
    previousInput = '';
}

  keys.addEventListener("click", (event) => {
    if(event.target && event.target.nodeName === "DIV" && event.target.innerText !== ""){
        const clickedValue = event.target.innerText;

        if(clickedValue === "AC"){
            clear();
        } else if(clickedValue === "DEL"){
            currentInput = currentInput.slice(0, -1);
            if(currentInput === "") {
                currentInput = "0";
            }
        } else if(clickedValue === "/" || clickedValue === "*" || clickedValue === "-" || clickedValue === "+"){
            if(operator){
                calculate();
            }
            previousInput = currentInput.replace(/,/g, '');
            operator = clickedValue;
            currentInput = ""; 

        } else if(clickedValue === "="){
            calculate();

        } else {
            // Prevent multiple dots
            if(clickedValue === "." && currentInput.includes(".")) {
                return;
            }

            // Count digits excluding commas and dot
            const digitCount = currentInput.replace(/[\.,]/g, '').length;

            if(digitCount >= 12) return; // Enforce 12-digit limit

            if(currentInput === "0" && clickedValue !== "."){
                currentInput = clickedValue;
            } else {
                currentInput += clickedValue;
            }
        }

        displayInput();
    }
});
