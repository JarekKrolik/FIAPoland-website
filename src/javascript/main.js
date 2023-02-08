const burgerBtn = document.querySelector(".navigation__mobile-burger-icon");
const navMobile = document.querySelector(".navigation__mobile-linkbox");
const navMobileCloseBtn = document.querySelector(
  ".navigation__mobile-close-icon"
);
const navLink = document.querySelectorAll(".navigation__mobile-link");
const currentYearSpan = document.querySelector(".currentYear");
const navMobileBox = document.querySelector(".navigation__mobile-linkbox");
const randomVideos = document.querySelectorAll(".randomVideo");
const backgroundImage = document.querySelector(".aboutus");
const membersDescriptions = document.querySelectorAll(".member-button--on");
let membersDescriptionsOff = document.querySelectorAll(".member-button--off");
const menuElementDropboxDesktop = document.querySelectorAll(".drop_menu");

const numberOfPhotos = 112;
const numberOfVideos = 6;

console.log(menuElementDropboxDesktop, "sialal");

const membersDescriptionFunction = (e) => {
  membersDescriptionsOff = document.querySelectorAll(".member-button--off");
  e.target.parentElement.parentElement
    .querySelector(".member-description")
    .classList.toggle("on");
};

const descriptionOff = (e) => {
  e.target.parentElement.classList.toggle("on");
};
const randomPicture = (picturesNumber) => {
  if (!picturesNumber % 2 === 0) {
    picturesNumber--;
  }
  const picturesNumberDivide = picturesNumber / 2;

  let randomNumberOne = Math.round(
    Math.random() * (picturesNumberDivide - 1) + 1
  );
  let randomNumberTwo = Math.round(
    Math.random() * (picturesNumberDivide - 1) + 1
  );
  const randomNumber = randomNumberOne + randomNumberTwo;

  return randomNumber;
};
const mobileNavOff = () => {
  navMobile.classList.toggle("navMobileOn");
  navMobileCloseBtn.style.display = "none";
  burgerBtn.style.display = "block";
};
const currentYear = () => {
  const year = new Date().getFullYear();
  currentYearSpan.textContent = `${year} `;
};

const randomVideoNumber = randomPicture(numberOfVideos);

document.addEventListener("DOMContentLoaded", () => {
  randomVideos.forEach(
    (video) => (video.src = `/video/${randomVideoNumber}.mp4`)
  );
});

const BackgroundChanger = () => {
  backgroundImage.style.backgroundImage = `url(/dist/img/mobileNavBgc/${randomPicture(
    numberOfPhotos
  )}.jpg)`;
};

membersDescriptions.forEach((member) => {
  member.addEventListener("click", membersDescriptionFunction);
});

membersDescriptionsOff.forEach((element) => {
  element.addEventListener("click", descriptionOff);
});
currentYear();

navMobileCloseBtn.addEventListener("click", mobileNavOff);

burgerBtn.addEventListener("click", () => {
  navMobile.classList.toggle("navMobileOn");
  burgerBtn.style.display = "none";
  navMobileCloseBtn.style.display = "block";
  navMobile.style.backgroundImage = `url(/dist/img/mobileNavBgc/${randomPicture(
    numberOfPhotos
  )}.jpg)`;
});
navMobileBox.addEventListener("click", (e) => {
  if (e.target.matches(".drop")) {
    const ul = e.target.children[0];

    const allLI = ul.querySelectorAll("li");

    allLI.forEach((element) => {
      element.classList.toggle("on");
    });
  } else {
    return;
  }
});

menuElementDropboxDesktop.forEach((element) => {
  element.addEventListener("click", (e) => {
    if (e.target.children.length === 3) {
      const menuElements2 = e.target.children[2].querySelectorAll(".right-ul");
      menuElements2.forEach((element) => element.classList.toggle("on"));
    }
    if (e.target.children.length === 1) {
      const menuElements = e.target.children[0].querySelectorAll(".right-ul");
      menuElements.forEach((element) => element.classList.toggle("on"));
    }
  });
});

// console.log(membersDescriptionsOff);

BackgroundChanger();
