let displayValue = "";
let firstNum = "";
let secondNum = "";
let operator = "";
let currStep = "firstNum";

const displayScreen = document.querySelector('#screen');
const operators = "+-×÷=";
const decimal = "."

const main = () => {
    makeEventListeners();

}


// Create event listeners for all buttons
const makeEventListeners = () => {
    // Grab all buttons with class 'button'
    const buttons = document.querySelectorAll('.button');

    // Add 'onclick' event listeners for all buttons
    buttons.forEach((element) => {
        element.addEventListener('click', parseInput);
    })
}


// Parse input on click
const parseInput = (e) => {
    // Store input in variable
    const input = e.target.innerText;

    if (input === "CLEAR") {
        clearData();
        updateDisplay();
    }
    else if (currStep === "firstNum") {
        if (input === "DELETE" && firstNum.length > 0) {
            firstNum = firstNum.slice(0, -1);
            displayValue = firstNum;
            updateDisplay();
        }
        // If input is a number and firstNum is not overloaded
        else if (!isNaN(input) && firstNum.length < 9) {
            firstNum += input;
            displayValue = firstNum;
            updateDisplay();
        }
        // If input is a valid operator and we have numbers, change to operator step
        else if (operators.includes(input)) {
            if (input !== "=" && displayValue.length > 0) {
                console.log('test');
                currStep = "operator";
                operator = input;
            }
        }
    }
    else if (currStep === "operator") {
        // If input is another operator that isn't "=", change operator to operator
        if (operators.includes(input) && input !== "=") {
            operator = input;
        }
        // If input is a number
        else if (!isNaN(input)) {
            currStep = "secondNum";
            secondNum = input;
            displayValue = secondNum;
            updateDisplay();
        }
    }
    // Current step is secondNum
    else {
        if (input === "DELETE" && firstNum.length > 0) {
            firstNum = firstNum.slice(0, -1);
            displayValue = firstNum;
            updateDisplay();
        }
        // If input is a number and secondNum is not overloaded
        else if (!isNaN(input) && secondNum.length < 9) {
            secondNum += input;
            displayValue = secondNum;
            updateDisplay();
        }
        // If input is an operator
        else if (operators.includes(input)) {
            let result = operate().toString();
            clearData()
            firstNum = result;
            if (input !== "=") {
                operator = input;
                currStep = "operator";
            }
            displayValue = firstNum;
            updateDisplay();
        }
    }
    printData();
}

const operate = () => {
    const num1 = parseFloat(firstNum);
    const num2 = parseFloat(secondNum);
    if (operator === "+") {
        return num1 + num2;
    }
    else if (operator === "-") {
        return num1 - num2;
    }
    else if (operator === "×") {
        return num1 * num2;
    }
    else if (operator === "÷") {
        return num1 / num2;
    }
    else {
        alert("ERROR: operate() called on invalid operator")
    }
}

const updateDisplay = () => {
    displayScreen.innerText = displayValue;
}

const clearData = () => {
    displayValue = "";
    firstNum = "";
    secondNum = "";
    operator = "";
    currStep = "firstNum";
}

// For debugging
const printData = () => {
    console.log("NUM1:", firstNum, "NUM2:", secondNum, "OP:", 
    operator, "CURRSTEP:", currStep, "DISPLAYVAL:", displayValue)
}

main()