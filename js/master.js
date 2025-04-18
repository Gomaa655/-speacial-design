//  start box setting
const gearIcon = document.querySelector(".toggle-settings .fa-gear");
const settingsBox = document.querySelector(".setting-box");

let state = {
  isOpen: false,
};

function toggleSettings() {
  state.isOpen = !state.isOpen;
  gearIcon.classList.toggle("fa-spin", state.isOpen);
  settingsBox.classList.toggle("open", state.isOpen);
}
function closeOnOutsideClick(event) {
  if (
    state.isOpen &&
    !settingsBox.contains(event.target) &&
    gearIcon !== event.target
  ) {
    toggleSettings();
  }
}
gearIcon.addEventListener("click", toggleSettings);
document.addEventListener("click", closeOnOutsideClick);
// end box setting
let mainColors = localStorage.getItem("color-option");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);
  document.querySelectorAll(".color-list li").forEach((elemnt) => {
    elemnt.classList.remove("active");
    if (elemnt.dataset.color === mainColors) {
      elemnt.classList.add("active");
    }
  });
}
//switch colors
const colorsLi = document.querySelectorAll(".color-list li");
//loop on all list items
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    let color = e.target.dataset.color;
    document.documentElement.style.setProperty("--main-color", color);
    localStorage.setItem("color-option", color);
    handelActive(e);
  });
});
// end switch color
let backgroundOption = true;
let clearTimeoutBack;

let backgroundLocalItem = localStorage.getItem("background-option");
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  document.querySelectorAll(".random-background span").forEach((elemnt) => {
    elemnt.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    document.querySelector(".random-background .no").classList.add("active");
  }
}
// random background
const backgroundRandom = document.querySelectorAll(".random-background span");
backgroundRandom.forEach((span) => {
  span.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((e) => {
      e.classList.remove("active");
    });
    e.target.classList.add("active");
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearTimeout(clearTimeoutBack);
      localStorage.setItem("background-option", false);
    }
  });
});

//get landing page
let landingPage = document.querySelector(".landing-page");
if (landingPage) {
  let imageArray = [
    "01.jpg",
    "02.png",
    "03.jpg",
    "04.jpg",
    "05.jpg",
    "06.jpg",
    "07.jpg",
    "08.jpg",
    "09.jpg",
    "09.png",
    "010.png",
  ];

  let lastIndex = -1;

  function randomizeImgs() {
    if (backgroundOption === true) {
      function changeBackground() {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * imageArray.length);
        } while (randomIndex === lastIndex);
        lastIndex = randomIndex;
        landingPage.style.backgroundImage = `url(../image/${imageArray[lastIndex]})`;
        clearTimeoutBack = setTimeout(changeBackground, 4000);
      }
      changeBackground();
    }
  }
}

randomizeImgs();

//select selectro skillls
let ourSkill = document.querySelector(".skill-box");

window.onscroll = function () {
  //skills offeset top
  let skillsOffsetTop = ourSkill.offsetTop;
  //skills outer height
  let skillsOuterHeight = ourSkill.offsetHeight;

  let windowHeight = this.innerHeight;

  let windowScroolTop = this.pageYOffset;

  if (windowScroolTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let skills = document.querySelectorAll(".skill-box .skill-progress span");
    skills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

//creat pop with image
let ourGallery = document.querySelectorAll(".image-box img");

ourGallery.forEach((image) => {
  image.addEventListener("click", (el) => {
    //creat overlay
    let overlayPopup = document.createElement("div");
    //add class in overlayImage
    overlayPopup.className = "popup-overlay";
    // append overlaypopup body
    document.body.appendChild(overlayPopup);
    //creat popup box
    let popupBox = document.createElement("div");
    //add class in popupbox
    popupBox.className = "popup-box";

    if (image.alt !== null) {
      //creat the haeding
      let headingImage = document.createElement("h3");
      let headingText = document.createTextNode(image.alt);
      headingImage.appendChild(headingText);
      popupBox.appendChild(headingImage);
    }
    //creat image pupup
    let popupImage = document.createElement("img");
    popupImage.src = image.src;
    popupBox.appendChild(popupImage);
    //add popupbox in body
    document.body.appendChild(popupBox);

    //creat close button
    let closeButton = document.createElement("span");
    //creat the text in close button
    let textColseButton = document.createTextNode("x");

    //apppend text in close button
    closeButton.appendChild(textColseButton);
    closeButton.className = "close-Button";
    popupBox.appendChild(closeButton);
  });
});

//close popup

document.addEventListener("click", function (e) {
  if (e.target.className == "close-Button") {
    //remove the current popup
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

//Sellect elments
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
//select all links
const allLinks = document.querySelectorAll(".links a");

function scroolToSection(elements) {
  elements.forEach((elemnt) => {
    elemnt.addEventListener("click", (e) => [
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      }),
    ]);
  });
}
scroolToSection(allBullets);
scroolToSection(allLinks);

// handel active state

function handelActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });
  ev.target.classList.add("active");
}

/// show bullets
let allBulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletCounter = document.querySelector(".nav-bullets");
let bulletLocalstorage = localStorage.getItem("bullets-option");

if (bulletLocalstorage !== null) {
  allBulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalstorage === "block") {
    bulletCounter.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletCounter.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}
allBulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletCounter.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      bulletCounter.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }
    handelActive(e);
  });
});

//reset option
document.querySelector(".reset-option").onclick = function () {
  localStorage.removeItem("bullets-option");
  localStorage.removeItem("background-option");
  localStorage.removeItem("color-option");

  //reload window
  window.location.reload();
};

let BtnToggle = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

BtnToggle.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
};

document.addEventListener("click", (e) => {
  if (e.target !== BtnToggle && e.target !== tLinks) {
    if (tLinks.classList.contains("open")) {
      BtnToggle.classList.toggle("menu-active");
      tLinks.classList.toggle("open");
    }
  }
});
tLinks.onclick = function (e) {
  e.stopPropagation();
};

//button dark mode
//save localstorage

let btn = document.querySelector(".dark-toggle");
let icon = document.querySelector(".toggle-icon");

btn.onclick = function (e) {
  document.body.classList.toggle("dark-mode");
  icon.style.transform = "rotate(360deg) scale(1.2)";

  setTimeout(() => {
    icon.style.transform = "rotate(0deg) scale(1)";
  }, 300);
  if (document.body.classList.contains("dark-mode")) {
    icon.textContent = "🌙";
    localStorage.setItem("them", "dark");
  } else {
    icon.textContent = "☀";
    localStorage.setItem("them", "Light");
  }
};

window.onload = function () {
  let saveMode = localStorage.getItem("them");
  if (saveMode === "dark") {
    document.body.classList.add("dark-mode");

    icon.textContent = "🌙";

    icon.style.transform = "scale(1.1)";
    setTimeout(() => {
      icon.style.transform = "scale(1)";
    }, 300);
  } else {
    icon.textContent = "☀";
  }
};
