const clickButton = document.getElementById("clickButton");
const clickMessageElement = document.getElementById("clickMessage");
const hoverBox = document.getElementById("hoverBox");
const nameInputField = document.getElementById("nameInputField");
const nameMessage = document.getElementById("nameMessage");
const doubleClickButton = document.getElementById("doubleClickButton");
const doubleClickMessage = document.getElementById("doubleClickMessage");
const outerBubbleBox = document.getElementById("outerBubbleBox");
const innerBubbleBox = document.getElementById("innerBubbleBox");
const outerCaptureBox = document.getElementById("outerCaptureBox");
const innerCaptureBox = document.getElementById("innerCaptureBox");
const itemList = document.getElementById("itemList");
const listOutput = document.getElementById("listOutput");

const handleClick = () => {
    clickMessageElement.textContent = "Button clicked successfully";
};

const handleHoverEnter = () => {
    hoverBox.classList.add("active");
    hoverBox.textContent = "Mouse is over me";
};

const handleHoverLeave = () => {
    hoverBox.classList.remove("active");
    hoverBox.textContent = "Hover Over Me";
};

const handleNameChange = () => {
    const trimmedName = nameInputField.value.trim();
    nameMessage.textContent = trimmedName
        ? `Hello ${trimmedName}`
        : "";
};

const handleDoubleClick = () => {
    doubleClickMessage.textContent = "Double click detected";
};

const handleOuterBubble = () => {
    alert("Outer Div Clicked (Bubbling)");
};

const handleInnerBubble = () => {
    alert("Inner Div Clicked (Bubbling)");
};

const handleOuterCapture = () => {
    alert("Outer Div Clicked (Capturing)");
};

const handleInnerCapture = () => {
    alert("Inner Div Clicked (Capturing)");
};

const handleListClick = (event) => {
    if (event.target.tagName === "LI") {
        listOutput.textContent =
            `You selected: ${event.target.textContent}`;
    }
};

clickButton.addEventListener("click", handleClick);
hoverBox.addEventListener("mouseenter", handleHoverEnter);
hoverBox.addEventListener("mouseleave", handleHoverLeave);
nameInputField.addEventListener("change", handleNameChange);
doubleClickButton.addEventListener("dblclick", handleDoubleClick);
outerBubbleBox.addEventListener("click", handleOuterBubble);
innerBubbleBox.addEventListener("click", handleInnerBubble);
outerCaptureBox.addEventListener("click", handleOuterCapture, true);
innerCaptureBox.addEventListener("click", handleInnerCapture, true);
itemList.addEventListener("click", handleListClick);