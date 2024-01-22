let displayValue = "";
let firstNum = "";
let secondNum = "";
let operator = "";
let currStep = "firstNum";

const displayScreen = document.querySelector('#screen');
const operators = "+-×÷=";

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
            if (input !== "=" && displayValue.length > 0 && displayValue[displayValue.length - 1] !== ".") {
                currStep = "operator";
                operator = input;
            }
        }
        else if (input === "." && firstNum.length < 8 && !firstNum.includes(".")) {
            firstNum += input;
            displayValue = firstNum;
            updateDisplay();
        }
    }
    else if (currStep === "operator") {
        // If input is another operator that isn't "=", change operator to operator
        if (operators.includes(input) && input !== "=") {
            operator = input;
        }
        // If input is a number
        else if (!isNaN(input) || input === ".") {
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
            // Check for divide by 0
            if (operator === "÷" && parseFloat(secondNum) === 0) {
                alert("THOU CAN NOT DIVIDETH BY NIL! ALL DATA SHALT BE EXPUNGED!");
                clearData();
                updateDisplay();
                return;
            }
            let result = keepAtNineDigits(operate()).toString()
            console.log(result);
            if (result === "TOO LARGE") {
                return;
            }
            if (parseFloat(result) > 999999999) {
                alert("ERROR: NUMBER TOO LARGE. CLEANSING DATA")
                clearData();
                updateDisplay();
                return;
            }
            clearData()
            firstNum = result.toString();
            if (input !== "=") {
                operator = input;
                currStep = "operator";
            }
            displayValue = firstNum;
            updateDisplay();
        }
        else if (input === "." && secondNum.length < 8 && !secondNum.includes(".")) {
            secondNum += input;
            displayValue = secondNum;
            updateDisplay();
        }
    }
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

const keepAtNineDigits = (num) => {
    if (num > 999999999) {
        alert("ERROR: NUMBER TOO LARGE. CLEARING DATA")
        clearData();
        updateDisplay();
        return "TOO LARGE";
    }
    num = num.toString();
    if (num.includes(".")) {
        let index = num.indexOf(".")
        let maxIndex = 8;
        let numsAfterDecimal = maxIndex - index;
        let answer = round(parseFloat(num), numsAfterDecimal)
        if (answer.toString().includes('e')){
            return 0;
        }
        return answer;
    }
    return parseFloat(num)
}

const round = (num, decimalPlace) => {
    num *= Math.pow(10, decimalPlace);
    return Math.round(num) / Math.pow(10, decimalPlace);
}

main()