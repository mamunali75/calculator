var calculator = {
    displayValue: '0',
    firstOperand: null,
    secondOperandPresent: false,
    operator: null,
};

function inputDigit(digit) {
    var { displayValue, secondOperandPresent } = calculator;

    if (secondOperandPresent === true) {
        calculator.displayValue = digit;
        calculator.secondOperandPresent = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function inputDecimal(dot) {
    if (calculator.secondOperandPresent === true) return;


    if (!calculator.displayValue.includes(dot)) {

        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    var { firstOperand, displayValue, operator } = calculator
    var inputValue = parseFloat(displayValue);

    if (operator && calculator.secondOperandPresent) {
        calculator.operator = nextOperator;
        return;
    }

    if (firstOperand == null) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        var currentValue = firstOperand || 0;
        var result = performCalculation[operator](currentValue, inputValue);
        localStorage.setItem("lastresult",result);
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    calculator.secondOperandPresent = true;
    calculator.operator = nextOperator;
}
var performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '%': (firstOperand, secondOperand) => firstOperand % secondOperand,
    '^': (firstOperand, secondOperand) => Math.pow(firstOperand, secondOperand),
    '=': (firstOperand, secondOperand) => secondOperand
};





function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.secondOperandPresent = false;
    calculator.operator = null;
}



function updateDisplay() {
    var display = document.querySelector('.display');
    display.value = calculator.displayValue;

}



function offCalculator() {
    calculator.displayValue = '';
}

function getlastResult() {
    var lastResult = localStorage.getItem("lastresult");
    calculator.displayValue = lastResult;
    updateDisplay();
}

var keys = document.querySelector('.buttons');
keys.addEventListener('click', (event) => {
    var { target } = event;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('clear')) {
        resetCalculator();
        updateDisplay();
        return;
    }

    if (target.classList.contains('off')) {
        offCalculator();
        updateDisplay();
        return;
    }

    // if (target.classList.contains('getlastresult')) {
    //     getLastResult();
    //     return;
    // }

    inputDigit(target.value);
    updateDisplay();
});