
let list = document.querySelectorAll('li');
let infoPage = document.querySelector('.hide');
let container = document.querySelector('.container');

let navAnimation = () => {
  anime({
    targets: list,
    translateX: -(container.offsetWidth / 2) / 2,
    delay: anime.stagger(200)
  })
}

list.forEach(c => {
  c.addEventListener('click', (e) => {
    console.log((container.offsetWidth / 2) / 2)
    navAnimation()
    setTimeout(() => {
      infoPage.className = 'stage bounce-7'
    }, 2000)
  })
})
