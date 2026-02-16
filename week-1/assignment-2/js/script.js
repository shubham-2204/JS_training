const mainHeading = document.getElementById("mainHeading");

const changeTextButton = document.getElementById("changeTextButton");
const changeColorButton = document.getElementById("changeColorButton");
const resetColorButton = document.getElementById("resetColorButton");

const itemInputField = document.getElementById("itemInputField");
const addItemButton = document.getElementById("addItemButton");
const removeLastButton = document.getElementById("removeLastButton");
const itemList = document.getElementById("itemList");

const createBoxButton = document.getElementById("createBoxButton");
const boxContainer = document.getElementById("boxContainer");

const handleChangeHeadingText = () => {
    mainHeading.textContent = "Heading Changed Successfully";
};

const handleChangeBackground = () => {
    document.body.classList.add("active-background");
};

const handleResetBackground = () => {
    document.body.classList.remove("active-background");
};

const handleAddItem = () => {

    const newItemText = itemInputField.value.trim();

    if (!newItemText) return;

    const newListItem = document.createElement("li");
    newListItem.textContent = newItemText;

    itemList.appendChild(newListItem);

    itemInputField.value = "";
};

const handleRemoveLastItem = () => {
    if (itemList.lastElementChild) {
        itemList.removeChild(itemList.lastElementChild);
    }
};

const handleCreateNewBox = () => {

    const newBoxElement = document.createElement("div");
    newBoxElement.classList.add("box");

    boxContainer.appendChild(newBoxElement);
};

changeTextButton.addEventListener("click", handleChangeHeadingText);
changeColorButton.addEventListener("click", handleChangeBackground);
resetColorButton.addEventListener("click", handleResetBackground);

addItemButton.addEventListener("click", handleAddItem);
removeLastButton.addEventListener("click", handleRemoveLastItem);

createBoxButton.addEventListener("click", handleCreateNewBox);