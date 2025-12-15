let currentStep = 0;
let calcCurrent = '0';
let calcPrevious = null;
let calcOperator = null;
let isDragging = false;
let dragOffsetX= 0;
let dragOffsetY = 0;

function nextStep(){
    const steps = document.querySelectorAll('.step');
    if (currentStep < steps.length - 1) {
        steps[currentStep].classList.remove('active');
        currentStep++;
        setTimeout(() => {
            steps[currentStep].classList.add('active');
        }, 50);
    }
}
function revealBirthday(){
    const finalNum = parseInt(document.getElementById('final-number'));
    if (!finalNum || isNan(finalNum)){
        alert('Please enter a dammned valid number!! YOUR BIRTHDAY ISNT LETTER~~ SHUT UP DON.... my bad fellow human, Don here has bad temper, please enter a valid number!')
        return;
    }
    const result = finalNum - 165;
    const month = Math.floor(result/100)
    const day = result % 100

    const months = ['', 'January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    if (month < 1 || month > 12 || day < 1 || day > 31){
        document.getElementById('result').innerHTML = `
        <div class="birthday-card">
            <h2>Hmm...</h2>
            <p>That doesn't seem right. Did you follow all the steps correctly?</p>
        </div>`
    } else {
        document.getElementById('result').innerHTML=`
        <div class="birthday-card">
            <h2 class="typing-text" style="border-right: none;">Math knows everything!</h2>
            <p>Your birthday is...</p>
            <div class="birthday-date">${months[month]} ${day}</div>
            <p> Magic or Math? Both!!!</p>
        </div>`
    }
    nextStep()
} 
function restart(){
    currentStep = 0;
    document.getElementById('final-number').value = '';
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => step.classList.remove('active'));
    steps[0].classList.add('active');
}
function toggleCalculator(){
    const calc = document.getElementById('calculator');
    calc.classList.toggle('active');
}
function updateDisplay(){
    document.getElementById('calcDisplay').textContent = calcCurrent;
}
function appendNumber(num){
    if (calcCurrent === '0' || calcCurrent === 0){
        calcCurrent = num;
    } else {
        calcCurrent += num;
    }
    updateDisplay()
}
function setOperator(){
    if (calcPrevious !== null && calcOperator !== null){
        calculate();
    }
    calcPrevious = parseFloat(calcCurrent);
    calcOperator = op;
    calcCurrent = '0';
}
function calculate(){
    if (calcPrevious === null || calcOperator === null) return;
    const current = parseFloat(calcCurrent);
    let result;
    switch (calcOperator){
        case '+':
            result = calcPrevious + calcCurrent;
            break;
        case '-':
            result = calcPrevious - calcCurrent;
            break;
        case '×':
            result = calcPrevious * calcCurrent;
            break;
        case '÷':
            result = calcPrevious / calcCurrent;
            break;
    }
    calcCurrent = result.toString();
    calcPrevious = null;
    calcOperator = null;
    updateDisplay();
}
function clearCalc(){
    calcCurrent = '0';
    calcPrevious = null;
    calcOperator = null;
    updateDisplay()
}
function toggleTheme(){
    document.body.classList.toggle('light-mode');
    const btn = document.getElementById('.theme-toggle');
    btn.textContent = document.body.classList.contains('light-mode');
}
const calculator = document.getElementById('calculator');
calculator.addEventListener('mousedown', startDrag);
calculator.addEventListener('touchstart', startDrag);

function startDrag(e){
    if (e.target.closest('.calc-btn') || e.target.closest('.calc-close')) return;
    isDragging = true;
    const rect = calculator.getBoundignClientRect();

    if (e.type === 'mousedown'){
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;
    } else {
        dragOffsetX = e.touches[0].clientX - rect.left;
        dragOffsetY = e.touches[0].clientY - rect.top;
    }
    calculator.style.cursor = "grabbing";
}
document.addEventListener('mousemove', drag);
document.addEventListener('touchmove', drag);
function drag(e){
    if (!isDragging) return;
    e.preventDefault();
    let clientX, clientY;
    if (e.type === 'mousemove'){
        clientX = e.clientX;
        clientY = e.clientY;
    } else {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    }
    calculator.style.left = (clientX - dragOffsetX) + 'px';
    calculator.style.top = (clientX - dragOffsetY) + 'px';
    calculator.style.right = auto;
}
document.addEventListener('moseup', stopDrag)
document.addEventListener('touchend', stopDrag)
function stopDrag(){
    isDragging = false;
    calculator.style.cursor = 'move';
}