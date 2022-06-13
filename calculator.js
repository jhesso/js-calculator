const numberButtons = document.querySelectorAll('[data-digit]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const clearButton = document.querySelector('[data-clear]');
const backspaceButton = document.querySelector('[data-backspace]');
const changeSignButton = document.querySelector('[data-changeSign');
const previousTextElement = document.querySelector('[data-previous');
const currentTextElement = document.querySelector('[data-current');
const instructionsButton = document.querySelector('[data-instructions-button]');
const instructionText = document.querySelector('[data-instruction-text]');

class Calculator {
	constructor(previousTextElement, currentTextElement){
		this.currentTextElement = currentTextElement;
		this.previousTextElement = previousTextElement;
		this.clear();
	}

	clear (){
		this.currentOperand = '';
		this.previousOperand = '';
		this.operation = undefined;
	}

	backspace (){
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	changeSign (){
		if (this.currentOperand != undefined){
			this.currentOperand = this.currentOperand * -1;
		}
	}

	addNumber (number){
		if (number === '.' && this.currentOperand.includes('.')) return;
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	chooseOperation(operation) {
		if (this.currentOperand === '') return;
		if (this.previousOperand !== '') this.compute();
		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}

	compute (){
		let computation;
		const current = parseFloat(this.currentOperand);
		const prev = parseFloat(this.previousOperand);
		let error = false;

		if (isNaN(current) || isNaN(prev)) return;
		switch (this.operation) {
			case '+':
				computation = prev + current;
				break;
			case '-':
				computation = prev - current;
				break;
			case '*':
				computation = prev * current;
				break;
			case '÷':
				if (current == 0){
					error = true;
					break;
				} else{
					computation = prev / current;
					break;
				}
			case '%':
				computation = prev % current;
				break;
			default:
				break;
		}

		if (error == false) this.currentOperand = Math.round((computation + Number.EPSILON) * 1000000) / 1000000;
		else {this.currentOperand = computation; }
		this.operation = undefined;
		this.previousOperand = '';
	}

	getScreenNumber (number){
		if (number == undefined) return;
		const numberString = number.toString();
		const integerPart = parseFloat(numberString.split('.')[0]);
		const decimalPart = numberString.split('.')[1];
		let integerDisplay;

		if (isNaN(integerPart)){
			integerDisplay = '';
		}else {
			integerDisplay = integerPart.toLocaleString('en', { maximumFractionDigits: 0 });
		}
		if (decimalPart != null){
			return `${integerDisplay}.${decimalPart}`
		} else {
			return integerDisplay;
		}
	}

	updateScreen (){
		if (this.currentOperand == undefined){
			this.currentTextElement.innerText = '';
			this.previousTextElement.innerText = '';
			const screen = document.getElementById('screen');
			const img = document.createElement('img');
			img.src = './media/quick-math.gif';
			img.style.width = '290px';
			img.style.objectFit = 'contain';
			screen.appendChild(img);
			setTimeout( () => { screen.removeChild(img); this.clear(); }, 5000);
		} else{
			this.currentTextElement.innerText = this.getScreenNumber(this.currentOperand);
			if (this.operation != null){
				this.previousTextElement.innerText = `${this.getScreenNumber(this.previousOperand)} ${this.operation}`;
			} else {
				this.previousTextElement.innerText = '';
			}
		}
	}
}

const calculator = new Calculator(previousTextElement, currentTextElement);

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.addNumber(button.innerText);
		calculator.updateScreen();
	});
});

operationButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateScreen();
	});
});

equalButton.addEventListener('click', button => {
	calculator.compute();
	calculator.updateScreen();
})

clearButton.addEventListener('click', button => {
	calculator.clear();
	calculator.updateScreen();
})

backspaceButton.addEventListener('click', button => {
	calculator.backspace();
	calculator.updateScreen();
})

changeSignButton.addEventListener('click', button => {
	calculator.changeSign();
	calculator.updateScreen();
})

instructionText.style.display = 'none';

instructionsButton.addEventListener('click', button => {
	console.log(instructionText.style.display)
	if (instructionText.style.display === "none"){
		instructionText.style.display = "block";
	} else{
		instructionText.style.display = "none";
	}
})

// Keyboard functionality:
// there is probably a more elegant solution. this is just something quick i came up with
document.addEventListener('keydown', (event) => {
	let name = event.key;
	switch (name) {
		case '0':
			calculator.addNumber(name);
			calculator.updateScreen();
			break;
		case '1':
			calculator.addNumber(name);
			calculator.updateScreen();
			break;
		case '2':
			calculator.addNumber(name);
			calculator.updateScreen();
			break;
		case '3':
			calculator.addNumber(name);
			calculator.updateScreen();
			break;
		case '4':
			calculator.addNumber(name);
			calculator.updateScreen();
			break;
		case '5':
			calculator.addNumber(name);
			calculator.updateScreen();
			break;
		case '6':
			calculator.addNumber(name);
			calculator.updateScreen();
			break;
		case '7':
			calculator.addNumber(name);
			calculator.updateScreen();
			break;
		case '8':
			calculator.addNumber(name);
			calculator.updateScreen();
			break;
		case '9':
			calculator.addNumber(name);
			calculator.updateScreen();
			break;
		case '+':
			calculator.chooseOperation(name);
			calculator.updateScreen();
			break;
		case '-':
			calculator.chooseOperation(name);
			calculator.updateScreen();
			break;
		case '*':
			calculator.chooseOperation(name);
			calculator.updateScreen();
			break;
		case '/':
			calculator.chooseOperation('÷');
			calculator.updateScreen();
			break;
		case '%':
			calculator.chooseOperation(name);
			calculator.updateScreen();
			break;
		case 'Escape':
			calculator.clear();
			calculator.updateScreen();
			break;
		case '=':
			calculator.compute();
			calculator.updateScreen();
			break;
		case 'Enter':
			calculator.compute();
			calculator.updateScreen();
			break;
		case 'Backspace':
			calculator.backspace();
			calculator.updateScreen();
			break;
		case '_':
			calculator.changeSign();
			calculator.updateScreen();
			break;
		default:
			break;
	}
}, false);