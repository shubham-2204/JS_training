const displayInput = document.getElementById("displayInput");
const allButtons = document.querySelectorAll(".buttons button");
const clearButton = document.getElementById("clearButton");
const equalButton = document.getElementById("equalButton");
const backspaceButton = document.getElementById("backspaceButton");

const appendToDisplay = (value) => {
    displayInput.value += value;
};

const clearDisplay = () => {
    displayInput.value = "";
};

const removeLastCharacter = () => {
    displayInput.value = displayInput.value.slice(0, -1);
};

const calculateResult = () => {
    try {
        const result = Function(`"use strict"; return (${displayInput.value})`)();
        displayInput.value = result;
    } catch {
        displayInput.value = "Error";
    }
};

allButtons.forEach(button => {

    const buttonValue = button.dataset.value;

    if (buttonValue) {
        button.addEventListener("click", () => {
            appendToDisplay(buttonValue);
        });
    }
});

clearButton.addEventListener("click", clearDisplay);
backspaceButton.addEventListener("click", removeLastCharacter);
equalButton.addEventListener("click", calculateResult);