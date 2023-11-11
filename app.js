// Calculator Structure
const STRUCTURE = [
    ['AC', 'C'],
    ['7', '8', '9', '/'],
    ['4', '5', '6', 'x'],
    ['1', '2', '3', '-'],
    ['.', '0', '=', '+']
]


const load = () => {
    // Get container div
    const container = document.querySelector('#container')

    // Create Calculator
    const calculator = document.createElement('div')
    calculator.setAttribute('id', 'calculator')
    container.appendChild(calculator)

    // Create Screen
    const screen = document.createElement('div')
    screen.setAttribute('id', 'screen')
    calculator.appendChild(screen)

    // Use STRUCTURE to make buttons
    for (let i = 0; i < STRUCTURE.length; i++) {
        for (let j = 0; j < STRUCTURE[i].length; j++) {
            let button = document.createElement('button')
            button.setAttribute('id', STRUCTURE[i][j])
            button.classList.add('button')
            button.textContent = STRUCTURE[i][j]
            calculator.appendChild(button)
        }
    }

}

load()