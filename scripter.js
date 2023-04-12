let userNum = [];
let userOper
let userNum2 = [];
const inputter = document.querySelector('.calcuInput')
const outputter = document.querySelector('.calcuAnswer')
let calcNum
let calcNum2
let calcAns
const numberButtons = document.querySelectorAll('.number')
const operatorButtons = document.querySelectorAll('.operator')
const equalizer = document.querySelector('#equals')
const clearer = document.querySelector('#xclear')

numberButtons.forEach( numb => numb.addEventListener("click", createInput1))

function makeAnOper () {
    operatorButtons.forEach(operator => operator.addEventListener("click", createInput2))
}

function createInput1(c){
    userNum.push(c.target.textContent)
    inputter.textContent = `${encoder()}`
    makeAnOper();
}

function encoder() {
    if (userNum.length > 1){
        return userNum.join("");
    }
    else {
        return userNum[0];
    }
}

function createInput2(d) {
    userOper = d.target.textContent;
    inputter.textContent = `${userNum.join("")} ${userOper}`
    disableNum1Input();
    calcNum = Number(userNum.join(""));
}

function disableNum1Input(){
    numberButtons.forEach( numb => numb.removeEventListener("click", createInput1))
    make2ndNumber();
}

function make2ndNumber(){
    numberButtons.forEach(number => number.addEventListener("click", createInput3))
}

function createInput3(f){
    userNum2.push(f.target.textContent)
    inputter.textContent = `${userNum.join("")} ${userOper} ${encoder2()}`
    operatorButtons.forEach(operator => operator.removeEventListener("click", createInput2))
    makeOutputbyEqualsorOper();
}

function encoder2(){
    if (userNum2.length > 1){
        return userNum2.join("");
    }
    else {
        return userNum2[0];
    }
}

function makeOutputbyEqualsorOper() {
    operatorButtons.forEach(operatorButton => operatorButton.addEventListener("click", makeOutputandContinue))
    equalizer.addEventListener("click", makeOutput)
}

function makeOutputandContinue(g) {
    calcNum2 = Number(userNum2.join(""))
    switch(userOper){
        case "+":
            calcAns = calcNum + calcNum2
            break;
        case "-":
            calcAns = calcNum - calcNum2
            break;
        case "*":
            calcAns = Math.round(calcNum * calcNum2)
            calcAns = calcAns
            break;
        case "/":
            calcAns = Math.round(calcNum / calcNum2)
            calcAns = calcAns
            break;
    }
    userNum.length = 0;
    userNum2.length = 0;
    userOper = g.target.textContent;
    userNum.push(calcAns.toLocaleString());
    calcNum = Math.round(calcAns)
    calcNum2 = 0
    make2ndNumber();
    inputter.textContent = `${userNum[0]} ${userOper}`
}

function makeOutput() {
    calcNum2 = Number(userNum2.join(""))
    numberButtons.forEach(number => number.removeEventListener("click", createInput3))
    switch(userOper){
        case "+":
            calcAns = calcNum + calcNum2
            outputter.textContent = calcAns.toLocaleString()
            break;
        case "-":
            calcAns = calcNum - calcNum2
            outputter.textContent = calcAns.toLocaleString()
            break;
        case "*":
            calcAns = Math.round(calcNum * calcNum2)
            outputter.textContent = calcAns.toLocaleString()
            break;
        case "/":
            calcAns = Math.round(calcNum / calcNum2)
            outputter.textContent = calcAns.toLocaleString()
            break;
    }
}

clearer.addEventListener("click", clearening);

function clearening() {
    inputter.textContent = "0"
    outputter.textContent = ""
    userNum.length = 0
    userNum2.length = 0
    userOper = ""
    calcNum = 0
    calcNum2 = 0
    calcAns = 0
    operatorButtons.forEach(operator => operator.removeEventListener("click", createInput2))
    numberButtons.forEach(number => number.removeEventListener("click", createInput3))
    equalizer.removeEventListener("click", makeOutput)
    operatorButtons.forEach(operatorButton => operatorButton.removeEventListener("click", makeOutputandContinue))
    numberButtons.forEach( numb => numb.addEventListener("click", createInput1))
}