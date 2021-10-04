const mediaQuery = window.matchMedia("(min-width: 850px)")
const main = document.getElementById("main")
const container = document.getElementById("container")
const logoContainer = document.getElementById("logo-container")
const bill = document.getElementById("bill")
const five = document.getElementById("five")
const ten = document.getElementById("ten")
const fifteen = document.getElementById("fifteen")
const twentyFive = document.getElementById("twenty-five")
const fifty = document.getElementById("fifty")
const custom = document.getElementById("custom")
const numberOfPeople = document.getElementById("people")
const zeroError = document.getElementById("zero-error")
const tipPerPerson = document.getElementById("tip-per-person")
const totalValue = document.getElementById("total-value")
const reset = document.getElementById("reset")
let mainHeight = main.clientHeight
let containerHeight = container.clientHeight
let logoContainerHeight = logoContainer.clientHeight

if (mediaQuery.matches) {
    logoContainer.style.height = `calc((${mainHeight}px - ${containerHeight}px) / 2)`
} else {
    logoContainer.style.height = `calc(${mainHeight}px - ${containerHeight}px)`
}

window.onresize= function() {
    mainHeight = main.clientHeight
    containerHeight = container.clientHeight
    logoContainerHeight = logoContainer.clientHeight

    if (mediaQuery.matches) {
        logoContainer.style.height = `calc((${mainHeight}px - ${containerHeight}px) / 2)`
    } else {
        logoContainer.style.height = `calc(${mainHeight}px - ${containerHeight}px)`
    }
}

window.onload = function clearingInput() {
    bill.value = ''
    numberOfPeople.value = ''
    custom.value = ''
}

function resetOpacity() {
    if (tipPerPerson.textContent !== "$0.00") {
        reset.style.opacity = "1"
    } else if (tipPerPerson.textContent === "$0.00") {
        reset.style.opacity = "0.1"
    }
}

function tip(number) {
    return bill.value * number / numberOfPeople.value
}

function totalBill(tipAmount) {
    return bill.value / numberOfPeople.value + tipAmount
}

function tipTextContent() {
    tipPerPerson.textContent = `$0.00`
    totalValue.textContent = `$0.00`
}

function limitBill(element) {
    let maxChars = 7;

    if(element.value.length > maxChars) {
        element.value = element.value.substr(0, maxChars);
    }
}

function limitCustom(element) {
    let maxChars = 4;

    if(element.value.length > maxChars) {
        element.value = element.value.substr(0, maxChars);
    }
}

function limitNumberOfPeople(element) {
    let maxChars = 10;

    if(element.value.length > maxChars) {
        element.value = element.value.substr(0, maxChars);
    }
}

function inputZero() {
    zeroError.style.display = "inline"
    numberOfPeople.style.outlineColor = "rgb(187, 91, 26)"
}

function inputZeroNone() {
    zeroError.style.display = "none"
    numberOfPeople.style.outlineColor = "hsl(172, 67%, 45%)"
}

function customAlign(alignment) {
    custom.style.textAlign = alignment
}

function buttonValue() {
    custom.value = ''
}

function buttonColor(btn) {
    five.style.backgroundColor = "hsl(183, 100%, 15%)"
    ten.style.backgroundColor = "hsl(183, 100%, 15%)"
    fifteen.style.backgroundColor = "hsl(183, 100%, 15%)"
    twentyFive.style.backgroundColor = "hsl(183, 100%, 15%)"
    fifty.style.backgroundColor = "hsl(183, 100%, 15%)"
    btn.style.backgroundColor = "rgb(38, 192, 171)"
}

function percentButtons(percentage) {
    if (bill.value > 0 && numberOfPeople.value > 0) {
        tipPerPerson.textContent = `$${tip(percentage).toFixed(2)}`
        totalValue.textContent = `$${totalBill(tip(percentage)).toFixed(2)}`
    } else if (!numberOfPeople.value || numberOfPeople.value <= 0) {
        inputZero()
    } else {
        tipTextContent()
    }

    resetOpacity()
    
    bill.addEventListener("input", function() {
        if (numberOfPeople.value > 0) {
            tipPerPerson.textContent = `$${tip(percentage).toFixed(2)}`
            totalValue.textContent = `$${totalBill(tip(percentage)).toFixed(2)}`
        } else {
            tipTextContent()
        }
        resetOpacity()
    })

    numberOfPeople.addEventListener("input", function() {
        if (bill.value > 0 && numberOfPeople.value > 0) {
            inputZeroNone()
            tipPerPerson.textContent = `$${tip(percentage).toFixed(2)}`
            totalValue.textContent = `$${totalBill(tip(percentage)).toFixed(2)}`
        } else if (numberOfPeople.value <= 0) {
            tipTextContent()
            inputZero()
        } else {
            inputZeroNone()
            tipTextContent()
        }
        resetOpacity()
    })
}

function btnColorTipValue(btnColor, percentButton) {
    buttonColor(btnColor)
    percentButtons(percentButton)
    buttonValue()
}

function customFocusBlur() {
    custom.addEventListener("focus", function() {
        tipTextContent()
    })

    custom.addEventListener("blur", function() {
        customAlign("center")
    })
}


bill.addEventListener("focus", function() {
    tipTextContent()
    resetOpacity()
    bill.style.outlineColor = "hsl(172, 67%, 45%)"

    bill.addEventListener("focusout", function() {
        bill.style.outlineColor = "transparent"
    })
    
})

numberOfPeople.addEventListener("focus", function() {
    inputZero()
    tipTextContent()
    resetOpacity()
})

numberOfPeople.addEventListener("input", function() {
    if (numberOfPeople.value <= 0) {
        inputZero()
    } else {
        inputZeroNone()

        numberOfPeople.addEventListener("focusout", function() {
            if (numberOfPeople.value > 0) {
                numberOfPeople.style.outlineColor = "transparent"
            }
        })
    }
    resetOpacity()
})

five.addEventListener("click", function(){
    btnColorTipValue(five, 0.05)
})

ten.addEventListener("click", function(){
    btnColorTipValue(ten, 0.1)
})

fifteen.addEventListener("click", function(){
    btnColorTipValue(fifteen, 0.15)
})

twentyFive.addEventListener("click", function(){
    btnColorTipValue(twentyFive, 0.25)
})

fifty.addEventListener("click", function fiftyClick(){
    btnColorTipValue(fifty, 0.5)
})

custom.addEventListener("focus", function() {
    percentButtons(0)
    buttonColor(five)
    five.style.backgroundColor = "hsl(183, 100%, 15%)"
    tipTextContent()
    resetOpacity()
    
    custom.style.outlineColor = "hsl(172, 67%, 45%)"
    custom.addEventListener("input", function() {
        let customPercent = custom.value / 100
        customAlign("right")
        percentButtons(customPercent)
        customFocusBlur()
        five.style.backgroundColor = "hsl(183, 100%, 15%)"
    })
    custom.addEventListener("focusout", function() {
        resetOpacity()
        custom.style.outlineColor = "transparent"
    })

    // Changing opacity of reset button after custom input is focused
    // and values are entered in bill and people input
    bill.addEventListener("input", function() {
        if (!custom.value) {
            // tipTextContent()
            resetOpacity()
        }
    })
    numberOfPeople.addEventListener("input", function() {
        if (!custom.value) {
            // tipTextContent()
            resetOpacity()
        }
    })
})

reset.addEventListener("click", function() {
    if (reset.style.opacity === "1") {
        bill.value = ''
        numberOfPeople.value = ''
        buttonValue()
        zeroError.style.display = "none"
        numberOfPeople.style.outlineColor = "transparent"
        btnColorTipValue(fifty, 0)
        fifty.style.backgroundColor = "hsl(183, 100%, 15%)"
        zeroError.style.display = "none"
        numberOfPeople.style.outlineColor = "transparent"
        tipTextContent()
    }
    reset.style.opacity = "0.1"
})



