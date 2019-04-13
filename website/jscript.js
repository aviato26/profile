
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
      mobile touchmove events seem to have a lag
      so i increased the rotate velocity to 50 instead of 3
    */
    return (this.clientY < 10) ? this.rotate+=50 : this.rotate = 0
  }
}

let section = document.querySelector('.dude');

articles.nodes.map((c, i) => {
  c.addEventListener('touchstart', (e) => {
    articles.clientY = e.changedTouches[0].clientY - e.changedTouches[0].screenY - 400;
  })

  c.addEventListener('touchmove', (e) => {
    articles.clientY = e.changedTouches[0].clientY - e.changedTouches[0].screenY - 400;
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
