const welcomeHeading = document.getElementById("welcomeHeading");
const sliderContainer = document.getElementById("sliderContainer");
const prevButton = document.getElementById("prevBtn");
const nextButton = document.getElementById("nextBtn");
const empName = document.getElementById("empName");
const empDesignation = document.getElementById("empDesignation");
const empExperience = document.getElementById("empExperience");
const empProject = document.getElementById("empProject");

let slides = [];
let employees = [];
let counter = 0;

const checkAuth = () => {
    const currentUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!currentUser) {
        window.location.href = ROUTES.LOGIN;
        return;
    }
    welcomeHeading.textContent = `Welcome, ${currentUser}`;
};

const loadSlides = async () => {
    const response = await fetch(DATA_FILE);
    employees = await response.json();
    employees.forEach((employee) => {
        const imageElement = document.createElement("img");
        imageElement.src = employee.image;
        imageElement.classList.add("slide");
        sliderContainer.appendChild(imageElement);
    });
    slides = document.querySelectorAll(".slide");
    slides.forEach((slide, index) => {
        slide.style.left = `${index * 100}%`;
    });
    updateEmployeeDetails();
    updateButtons();
};

const slideImage = () => {
    slides.forEach((slide) => {
        slide.style.transform = `translateX(-${counter * 100}%)`;
    });
    updateEmployeeDetails();
    updateButtons();
};

const updateEmployeeDetails = () => {
    const currentEmployee = employees[counter];
    empName.textContent = currentEmployee.name;
    empDesignation.textContent = currentEmployee.designation;
    empExperience.textContent = currentEmployee.experience;
    empProject.textContent = currentEmployee.project;
};

const updateButtons = () => {
    prevButton.disabled = counter === 0;
    nextButton.disabled = counter === slides.length - 1;
};

const goNext = () => {
    if (counter < slides.length - 1) {
        counter++;
        slideImage();
    }
};

const goPrev = () => {
    if (counter > 0) {
        counter--;
        slideImage();
    }
};

nextButton.addEventListener("click", goNext);
prevButton.addEventListener("click", goPrev);
checkAuth();
loadSlides();