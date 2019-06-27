
let list = document.querySelectorAll('li');
let infoPage = document.querySelector('.hide');

let navAnimation = () => {
  anime({
    targets: list,
    translateX: -570,
    delay: anime.stagger(200)
  })
}

list.forEach(c => {
  c.addEventListener('click', (e) => {
    navAnimation()
    setTimeout(() => {
      infoPage.className = 'stage'
    }, 2000)
  })
})
