/* GENERIC VARIABLES */
let runningTotal = 0;
let buffer = "0";
let previousOperator;

/* GET VALUE OF THE ELEMENT .SCREEN FROM THE HTML DOC */
const screen = document.querySelector('.screen');

/* HANDLING WETHER THE BUTTON IS A NUMBER OR A SYMBOL */
function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

/* HANDLING SYMBOLS */
function handleSymbol(symbol){
    switch(symbol){
        /* SETTING VARIABLES TO 0 AND SCREEN TO 0 */
        case 'C':
            buffer = "0";
            runningTotal = 0;
            break;

        /* FLUSHING THE OPERATION IF THE PREVIOUS OPERATOR IS NOT NULL */
        case '=':
            if(previousOperator === null){
                return 
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;

        /* SUBSTRACTS THE LAST INDEX OF THE BUFFER IF ITS LENGTH IS GREATER THAN 1, OTHERWISE IT SETS BUFFER AS 0 */
        case '←':
            if(buffer.length === 1){
                buffer = "0";
            }else{
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;

        /* CALLS THE OPERATION METHOD WITH ANY OF THE OPERANDS */
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
    }
}

/* IF THE BUFFER IS 0 DOES NOTHING, ON THE OTHER HAND, IF THE RUNNING TOTAL IS 0, IT GETS THE NUMBER VALUE OTHERWISE IT CALLS THE OPERATION FUNCTION */
function handleMath(symbol){
    if(buffer === '0'){
        return;
    }

    const intBuffer = parseInt(buffer);

    if(runningTotal === 0){
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

/* FILTERS THE LAST OPERAND AND DOES THE DECIDED OPERATION */
function flushOperation(intBuffer){
    if(previousOperator === '+'){
        runningTotal += intBuffer
    }else if(previousOperator === '−'){
        runningTotal -= intBuffer
    }else if(previousOperator === '×'){
        runningTotal *= intBuffer
    }else if(previousOperator === '÷'){
        runningTotal /= intBuffer
    }
}

/* HANDLING NUMBERS */
function handleNumber(numberString){
    if(buffer === '0'){
        buffer = numberString;
    }else{
        buffer += numberString;
    }
}

/* INITIAL FUNCTION TO SET A CLICK EVENT LISTENER FOR THE BUTTONS AT CLASS .CALC-BUTTONS */
function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init(); // INITIALIZING CALCULATOR