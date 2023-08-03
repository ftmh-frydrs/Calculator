const Calculate = document.querySelector('.calculate');
const Curent = document.querySelector('.curent');
let currentExpression = '';
let result = '';
let lastButtonType = ''; 

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
    console.log(buttonValue);

    if (!isNaN(parseInt(buttonValue)) || buttonValue === '.') {
        if ((buttonValue === '-' && (lastButtonType === '' || lastButtonType === 'operator')) || lastButtonType === 'equals') {
            currentExpression += buttonValue;
            Curent.value = currentExpression;
        } else {
            currentExpression += buttonValue;
            Curent.value = currentExpression;
        }
        lastButtonType = 'digit'; 
    } 
    
    else if (buttonValue === 'AC') {
        currentExpression = '';
        Curent.value = '';
        lastButtonType = 'clear'; 
    }

    else if (buttonValue === 'CE') {
        currentExpression = currentExpression.slice(0, -1);
        Curent.value = currentExpression;
        lastButtonType = 'backspace'; 
    }

    else if (buttonValue === '%') {
        result = evaluateExpression(currentExpression) / 100;
        Curent.value = result;
        currentExpression = result.toString();
        lastButtonType = 'operator'; 
    }
    
    
else if (buttonValue === '+' || buttonValue === '-' || buttonValue === '*' || buttonValue === '/') {
    
    if (lastButtonType !== 'operator' && lastButtonType !== 'clear') {
        currentExpression += buttonValue;
        Curent.value = currentExpression;
        lastButtonType = 'operator'; 
    }
}

   
    else if (buttonValue === '=') {
        result = evaluateExpression(currentExpression);
        Curent.value = result;
        currentExpression = result.toString();
        lastButtonType = 'equals'; 
    }
});
