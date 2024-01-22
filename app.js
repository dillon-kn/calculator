const displayValue = "";
const firstNum = "";
const secondNum = "";
const operator = "";
const currStep = "firstNum";

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
    }
}

// Parse input on click
const parseInput = (e) => {
    const input = e.target.innerText;
    if (currStep === "firstNum") {

    }
    if (currStep === "operator") {

    }
    if (currStep === "secondNum") {
        
    }
    if (!isNaN(input)) {
        return parseFloat(input);
    }

}

main()