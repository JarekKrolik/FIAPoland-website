const backGroundSwap = document.querySelector(".gallerySwapper img");

const photoChanger = setInterval(() => {
  backGroundSwap.src = `/dist/img/mobileNavBgc/${randomPicture(
    numberOfPhotos
  )}.jpg`;
}, 4000);
