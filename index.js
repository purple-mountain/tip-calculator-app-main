// const dollar = document.querySelector("body")
// dollar.innerHTML += 
// `
// <svg xmlns="http://www.w3.org/2000/svg" width="11" height="17"><path fill="#9EBBBD" d="M6.016 16.328v-1.464c1.232-.08 2.22-.444 2.964-1.092.744-.648 1.116-1.508 1.116-2.58v-.144c0-.992-.348-1.772-1.044-2.34-.696-.568-1.708-.932-3.036-1.092V4.184c.56.144 1.012.4 1.356.768.344.368.516.816.516 1.344v.288h1.824v-.432c0-.448-.088-.876-.264-1.284a3.783 3.783 0 00-.744-1.116A4.251 4.251 0 007.54 2.9a5.324 5.324 0 00-1.524-.492V.872H4.288V2.36a5.532 5.532 0 00-1.416.324c-.448.168-.84.392-1.176.672-.336.28-.604.616-.804 1.008-.2.392-.3.844-.3 1.356v.144c0 .96.316 1.708.948 2.244.632.536 1.548.884 2.748 1.044v3.912c-.704-.16-1.248-.472-1.632-.936-.384-.464-.576-1.08-.576-1.848v-.288H.256v.576c0 .464.08.924.24 1.38.16.456.404.88.732 1.272.328.392.744.728 1.248 1.008s1.108.476 1.812.588v1.512h1.728zM4.288 7.424c-.688-.128-1.164-.332-1.428-.612-.264-.28-.396-.644-.396-1.092 0-.464.176-.832.528-1.104.352-.272.784-.448 1.296-.528v3.336zm1.728 5.712V9.344c.768.128 1.328.328 1.68.6.352.272.528.688.528 1.248 0 .544-.196.984-.588 1.32-.392.336-.932.544-1.62.624z"/></svg>
// `

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
let tipAmount = 0
let total = 0

window.onload = function clearingInput() {
    bill.value = ''
    numberOfPeople.value = ''
    custom.value = ''
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
    
    bill.addEventListener("input", function() {
        if (numberOfPeople.value > 0) {
            tipPerPerson.textContent = `$${tip(percentage).toFixed(2)}`
            totalValue.textContent = `$${totalBill(tip(percentage)).toFixed(2)}`
        } else {
            tipTextContent()
        }
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
    bill.style.outlineColor = "hsl(172, 67%, 45%)"

    bill.addEventListener("focusout", function() {
        bill.style.outlineColor = "transparent"
    })
})



numberOfPeople.addEventListener("focus", function() {
    inputZero()
    tipTextContent()
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
})

custom.addEventListener("focus", function() {
    custom.style.outlineColor = "hsl(172, 67%, 45%)"

    custom.addEventListener("focusout", function() {
        custom.style.outlineColor = "transparent"
    })
})

// When the percentage buttons are clicked



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
    custom.addEventListener("input", function() {
        let customPercent = custom.value / 100
        customAlign("right")
        percentButtons(customPercent)
        customFocusBlur()
        buttonColor(five)
        five.style.backgroundColor = "hsl(183, 100%, 15%)"
    })
})

reset.addEventListener("click", function() {
    bill.value = ''
    numberOfPeople.value = ''
    buttonValue()
    tipTextContent()
    zeroError.style.display = "none"
    numberOfPeople.style.outlineColor = "transparent"
    btnColorTipValue(fifty, 0)
    fifty.style.backgroundColor = "hsl(183, 100%, 15%)"
    zeroError.style.display = "none"
    numberOfPeople.style.outlineColor = "transparent"
})
