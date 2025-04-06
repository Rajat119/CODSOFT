class Calculator {
    constructor(previousOperationElement, currentOperationElement) {
        this.previousOperationElement = previousOperationElement
        this.currentOperationElement = currentOperationElement
        this.clear()
        this.setupEventListeners()
    }

    clear() {
        this.currentOperand = '0'
        this.previousOperand = ''
        this.operation = undefined
        this.updateDisplay()
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
        if (this.currentOperand === '') {
            this.currentOperand = '0'
        }
        this.updateDisplay()
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString()
        }
        this.updateDisplay()
        this.animateButton(`[data-action="number"][data-value="${number}"]`)
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
        this.updateDisplay()
        this.animateButton(`[data-action="operation"][data-value="${operation}"]`)
    }

    computePercentage() {
        if (this.currentOperand === '') return
        this.currentOperand = parseFloat(this.currentOperand) / 100
        this.updateDisplay()
        this.animateButton('[data-action="percentage"]')
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return

        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '×':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }

        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
        this.updateDisplay()
        this.animateButton('[data-action="calculate"]')
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperationElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperationElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperationElement.innerText = ''
        }
    }

    animateButton(selector) {
        const button = document.querySelector(selector)
        if (!button) return
        
        button.classList.add('active')
        setTimeout(() => {
            button.classList.remove('active')
        }, 200)
    }

    setupEventListeners() {
        document.querySelectorAll('[data-action="number"]').forEach(button => {
            button.addEventListener('click', () => {
                this.appendNumber(button.innerText)
            })
        })

        document.querySelectorAll('[data-action="operation"]').forEach(button => {
            button.addEventListener('click', () => {
                this.chooseOperation(button.innerText)
            })
        })

        document.querySelector('[data-action="calculate"]').addEventListener('click', () => {
            this.compute()
        })

        document.querySelector('[data-action="clear"]').addEventListener('click', () => {
            this.clear()
        })

        document.querySelector('[data-action="delete"]').addEventListener('click', () => {
            this.delete()
        })

        document.querySelector('[data-action="percentage"]').addEventListener('click', () => {
            this.computePercentage()
        })

        document.querySelector('[data-action="decimal"]').addEventListener('click', () => {
            this.appendNumber('.')
        })

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key >= 0 && e.key <= 9) {
                this.appendNumber(e.key)
            } else if (e.key === '.') {
                this.appendNumber('.')
            } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
                let operation
                if (e.key === '*') operation = '×'
                else if (e.key === '/') operation = '÷'
                else operation = e.key
                this.chooseOperation(operation)
            } else if (e.key === 'Enter' || e.key === '=') {
                e.preventDefault()
                this.compute()
            } else if (e.key === 'Backspace') {
                this.delete()
            } else if (e.key === 'Escape') {
                this.clear()
            } else if (e.key === '%') {
                this.computePercentage()
            }
        })

        // Power switch
        document.getElementById('power').addEventListener('change', (e) => {
            document.body.classList.toggle('power-off', !e.target.checked)
            if (e.target.checked) {
                this.clear()
            }
        })
    }
}

const calculator = new Calculator(
    document.querySelector('.previous-operation'),
    document.querySelector('.current-operation')
)