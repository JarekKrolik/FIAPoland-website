const pictures = document.querySelectorAll('.gallery__box-item');
const blurr = document.querySelector('.blurr');


const largePicture = (e) => {

    e.target.parentElement.classList.toggle('big-picture');
    blurr.classList.toggle('on')


}



pictures.forEach(picture => {
    picture.addEventListener('click', largePicture)
})