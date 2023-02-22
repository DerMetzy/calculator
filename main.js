let currentNum = "";
let previousNum = "";
let result;
let operator = "";

document.addEventListener("DOMContentLoaded", function() {
    let digits = document.querySelectorAll(".number")
    let operators = document.querySelectorAll(".operator")
    let canc = document.getElementById("btnDel")
    let clear = document.getElementById("btnAC")
    let equal = document.querySelector(".equal")
    let currentDisplay = document.getElementById("currentDisplay")
    let previousDisplay = document.getElementById("previousDisplay")
    let decimal = document.querySelector(".decimal")

    digits.forEach((digit) => digit.addEventListener("click", (e) => {
        
        getNum(e.target.textContent)
        currentDisplay.textContent = currentNum;
    }))

//TODO Premendo un tasto operatore, previousDisplay deve mostare il risultato dell'operazione tra prevNum e curNum
    operators.forEach((op) => op.addEventListener("click", (e) => {
        if (operator != "") {
            compute();
        } else {
            previousNum = roundNum(Number(currentNum)).toString();
        }
        getOperator(e.target.textContent)
        
        previousDisplay.textContent = previousNum + " " + operator;
        currentDisplay.textContent = "";
        
        currentNum = "";
    }))

    equal.addEventListener("click", (e) => {
         if (currentNum != "" && previousNum != "") {   
            compute();
            currentDisplay.textContent = previousNum;
            previousDisplay.textContent = "";
            currentNum = previousNum;
            operator = "";
         } 
         if (currentNum != "" && previousNum == "") {
            currentDisplay.textContent = currentNum;
            previousNum = currentNum;
            currentNum = "";
            
            operator = "";
         }
    })

    clear.addEventListener("click", (e) => {
        currentNum = "";
        previousNum = "";
        previousDisplay.textContent = previousNum;
        currentDisplay.textContent = currentNum;
        operator = "";
    })

    canc.addEventListener("click", (e) => {
        currentDisplay.innerText = currentDisplay.innerText.slice(0, -1);
    
        if (currentDisplay.innerText == "") {
            currentDisplay.innerText = "0";
        };
    })

    decimal.addEventListener("click", (e) => {
        if (currentNum.includes(".")) {
            alert("You already typed a decimal separator.")
            return
        } else {
            currentNum += ".";
            currentDisplay.textContent = currentNum;
        }
    })


});

function getNum(num) {
    if (currentNum.length > 8) {
        alert("You have reached maximum number size");
        return;
    }
    currentNum += num;
}

function getOperator(op) {
    operator = op;
    
}

function compute() {
    currentNum = Number(currentNum);
    previousNum = Number(previousNum);
    
    if (operator === "+") {
        result = previousNum + currentNum;
    } else if (operator === "-") {
        result = previousNum - currentNum;
    } else if (operator === "*") {
        result = previousNum * currentNum; 
    } else if (operator === "/") {
        if (currentNum == "0") {
            alert ("It is not allowed to divide by zero")
            return; 
        } else {
            result = previousNum / currentNum;
        }
    }

    previousNum = roundNum(result).toString();
    currentNum = currentNum.toString();
    
    console.log(previousNum);
    console.log(typeof currentNum, currentNum, "currentNum");
    console.log(typeof previousNum, previousNum, "previousNum (cioè result)");
};


function roundNum(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
};