const Calculate = document.querySelector('.calculate');
const Curent = document.querySelector('.curent');
let currentExpression = '';
let result = '';
let lastButtonType = '';
let hasNumber = false;
let lastButtonIsOperator = false; 


const operators = ['+', '-', '*', '/' ]; 

function evaluateExpression(expression) {
    try {
        const calculate = new Function('return ' + expression);
        return calculate();
    } catch (error) {
        return 'Error';
    }
}


Calculate.addEventListener('click', (e) => {
    let buttonValue = e.target.textContent;
    buttonValue = buttonValue.replaceAll("x", "*");

    if (!isNaN(parseInt(buttonValue)) || buttonValue === '.') {
        if (
            (buttonValue === '-' && (lastButtonType === '' || lastButtonType === 'operator')) ||
            lastButtonType === 'equals'
        ) {
            currentExpression += buttonValue;
            Curent.value = currentExpression;
            hasNumber = true;
        } else {
            if (!(buttonValue === '.' && currentExpression.endsWith('.'))) {
                // Check if the button is a decimal point and there's already a decimal point at the end.
                currentExpression += buttonValue;
                Curent.value = currentExpression;
                hasNumber = true;
            }
        }
        lastButtonType = 'digit';
        lastButtonIsOperator = false;
    } else if (buttonValue === 'AC') {
        currentExpression = '';
        Curent.value = '';
        lastButtonType = 'clear';
        hasNumber = false;
        lastButtonIsOperator = false;
    } else if (buttonValue === 'CE') {
        currentExpression = currentExpression.slice(0, -1);
        Curent.value = currentExpression;
        lastButtonType = 'backspace';
        lastButtonIsOperator = false;
    } else if (buttonValue === '%') {
        result = evaluateExpression(currentExpression) / 100;
        Curent.value = result;
        currentExpression = result.toString();
        lastButtonType = 'operator';
        lastButtonIsOperator = false;
    } else if (buttonValue === '+' || buttonValue === '*' || buttonValue === '/') {
        if (hasNumber && !lastButtonIsOperator) {
            currentExpression += buttonValue;
            Curent.value = currentExpression;
            lastButtonType = 'operator';
            lastButtonIsOperator = true;
        }
    } else if (buttonValue === '-' || !hasNumber) {
        if (!lastButtonIsOperator) {
            currentExpression += buttonValue;
            Curent.value = currentExpression;
            lastButtonType = 'operator';
            lastButtonIsOperator = true;
        }
    } else if (buttonValue === '=') {
        result = evaluateExpression(currentExpression);
        Curent.value = result;
        currentExpression = result.toString();
        lastButtonType = 'equals';
        lastButtonIsOperator = false;
    }
});


