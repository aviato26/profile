
let articles = {
  nodes: [...document.querySelectorAll('article')],
  clientY: 0,
  clientX: 0,
  rotate: 0,
  switchCard(int){
    if(this.clientY < -30){
      this.nodes.filter((c, i) => {
        if(int === i){
          c.className = 'card flipback'

          // setting y position to 0 or else position remains the same
          //c.style.transform = 'translateY(0px)'
          c.style.setProperty('--posY', this.clientY)
          c.style.setProperty('--rotX', this.rotate)
        } else {
          c.className = 'card currentCard';
        }
      })
    }
  },
  flipCard(){
    /*
      if the client swipes over the articles element the card will start to flip
      and the velocity (adding 5 for velocity) will be added to the flip speed
    */
    return (this.clientY < 0) ? this.rotate+=5 : this.rotate = 0
  }
}

articles.nodes.map((c, i) => {
  c.addEventListener('touchstart', (e) => {
    articles.clientY = e.changedTouches[0].clientY - e.changedTouches[0].screenY - 400;
  })

  c.addEventListener('touchmove', (e) => {
    articles.clientY = e.changedTouches[0].clientY - e.changedTouches[0].screenY - 100;
    articles.clientX = e.changedTouches[0].clientX - window.innerWidth / 2;

    /*
      as the client moves up the y axis we will update the activated article node
      with the events current position
    */
    articles.nodes[i].style.transform = `translateY(${articles.clientY}px) rotateX(${articles.rotate}deg)`
    articles.flipCard()
  })

  c.addEventListener('touchend', (e) => {

    // as the event ends we will switch the z-index of the current and next article nodes
    articles.switchCard(i)
  })

  c.addEventListener('animationend', (e) => {

    //after animation ends resetting position
    c.style.transform = 'translateY(0px) rotateX(0deg)'
  })
})

// events for hover in desktop mode

let navbar = document.querySelector('nav');
let selectedPage = document.querySelector('.infoContainer');

navbar.addEventListener('mousemove', (e) => {
    if(e.path[0].textContent === 'Projects' && selectedPage.childNodes[5].style.display !== 'block'){
      selectedPage.childNodes[1].style.display = 'block';
      selectedPage.childNodes[1].className = 'projects transition'
    } else if(e.path[0].textContent === 'About' && selectedPage.childNodes[7].style.display !== 'block'){
      selectedPage.childNodes[3].style.display = 'block'
      selectedPage.childNodes[3].className = 'about transition'
    } else {
      selectedPage.childNodes[1].style.display = 'none';
      selectedPage.childNodes[3].style.display = 'none'
    }
})

navbar.addEventListener('click', (e) => {
  let path = e.path[0].textContent;
  
 /*
 checks if the projects or about buttons are hovered over or clicked
 and reassigns the transition class
 */

  if(path === 'Projects'){
    selectedPage.childNodes[7].style.display = 'none';
    selectedPage.childNodes[1].style.display = 'none';
    selectedPage.childNodes[5].style.display = 'block';
    selectedPage.childNodes[5].className = 'transition';
  } else if(path === 'About'){
    selectedPage.childNodes[5].style.display = 'none';
    selectedPage.childNodes[3].style.display = 'none';
    selectedPage.childNodes[7].style.display = 'block';
    selectedPage.childNodes[7].className = 'transition';
  }
})
