const numberButtons = document.querySelectorAll('[data-digit]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const clearButton = document.querySelector('[data-clear]');
const backspaceButton = document.querySelector('[data-backspace]');
const previousTextElement = document.querySelector('[data-previous');
const currentTextElement = document.querySelector('[data-current');

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
				computation = prev / current;
				break;
			default:
				break;
		}

		this.currentOperand = computation;
		this.operation = undefined;
		this.previousOperand = '';
	}

	getScreenNumber (number){
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
		this.currentTextElement.innerText = this.getScreenNumber(this.currentOperand);
		if (this.operation != null){
			this.previousTextElement.innerText = `${this.getScreenNumber(this.previousOperand)} ${this.operation}`;
		} else {
			this.previousTextElement.innerText = '';
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